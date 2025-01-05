import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase'; // Import Firebase config and auth
import { collection, getDocs } from 'firebase/firestore';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faBoxArchive } from '@fortawesome/free-solid-svg-icons/faBoxArchive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Snackbar, Alert } from '@mui/material'; // Import Snackbar and Alert

const ArchivedJournals = () => {
  const [archivedJournals, setArchivedJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this journal?')) {
      try {
        const user = auth.currentUser;
        if (user) {
          // Reference to the specific journal document
          const journalDocRef = doc(db, 'users', user.uid, 'archivedJournals', id);
          await deleteDoc(journalDocRef);

          // Remove the deleted journal from state
          setArchivedJournals(archivedJournals.filter((journal) => journal.id !== id));

          // Show success Snackbar
          setSnackbarMessage('Journal deleted successfully!');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
        }
      } catch (error) {
        console.error('Error deleting journal:', error);
        setSnackbarMessage('Failed to delete journal. Please try again.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const fetchArchivedJournals = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          // Query archived journals for the authenticated user
          const archivedJournalsRef = collection(db, 'users', user.uid, 'archivedJournals');
          const data = await getDocs(archivedJournalsRef);
          setArchivedJournals(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
      } catch (error) {
        console.error("Error fetching archived journals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArchivedJournals();
  }, []);

  if (loading) {
    return (
      <div className="h-auto w-full flex justify-center p-9 pt-24 md:pt-16 lg:pt-16 items-center">
        <div role="status" className="flex items-center">
                 <svg
                     aria-hidden="true"
                     className="w-8 h-8 text-gray-100 animate-spin dark:text-slate-100 fill-[#FFA52F]"
                     viewBox="0 0 100 101"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                 >
                     <path
                         d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                         fill="currentColor"
                     />
                     <path
                         d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                         fill="currentFill"
                     />
                 </svg>
                 <span className="sr-only">Loading...</span>
             </div>
      </div>
    );
  }

  return (
    <div className="h-auto w-full md:w-full lg:w-4/5 ml-auto p-9 pt-24 md:pt-16 lg:pt-16">
      <h1 className="text-xl font-medium mb-4">Archived Journals</h1>
      {archivedJournals.length === 0 ? (
        <p>No archived journals found.</p>
      ) : (
        <ul>
          {archivedJournals.map((journal) => (
            <li key={journal.id} className="mb-4 cursor-pointer">
               <div className="p-4 bg-slate-100 rounded-md">
                <p className='p-1 ml-auto flex px-2 rounded-xl  w-fit font-bold text-[10px] text-slate-300 border-slate-300 border-[2px] bg-slate-200/40'>{formatDate(journal.date)}</p>
                <p className='font-bold mb-1'>{journal.title}</p>
                <p className='text-[14px]'>{journal.content}</p>
                <div className="mt-3 flex gap-2 items-end justify-end">
                <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDelete(journal.id)} className='flex text-white bg-slate-300 p-2 rounded-md hover:bg-black duration-300' />
                </div>
                </div>
                </li>
          ))}
        </ul>
      )}

<Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

    </div>
  );
};

export default ArchivedJournals;
