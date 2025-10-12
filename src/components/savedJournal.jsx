import React, { useEffect, useState } from 'react';
import { db, auth } from "../firebase"; // Firestore and auth instance
import { collection, query, getDocs, doc, deleteDoc, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive, faPlus, faRightToBracket, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Snackbar } from "@mui/material";
import { faEdit, faFileArchive, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faBoxArchive } from '@fortawesome/free-solid-svg-icons/faBoxArchive';


function savedJournal() {
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
      };

      useEffect(() => {
        const fetchJournals = async () => {
            const user = auth.currentUser;

            if (user) {
                // Query the user's journals from Firestore
                const q = query(collection(db, "users", user.uid, "journals"));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const fetchedJournals = querySnapshot.docs.map(doc => ({
                        id: doc.id, // Include the document ID
                        ...doc.data()
                    }));
                    setJournals(fetchedJournals);
                } else {
                    setJournals([]);
                }
            }
            setLoading(false);
        };

        fetchJournals();
    }, []);

    const handleAddJournal = () => {
        navigate("/new-journal"); // Navigate to the page where the user can add a new journal
    };

    const handleArchive = async (journalId) => {
        try {
            const user = auth.currentUser;
            if (!user) throw new Error("User not authenticated");

            // Find the journal to archive
            const journalToArchive = journals.find((journal) => journal.id === journalId);

            if (!journalToArchive) throw new Error("Journal not found");

            // Add the journal to the archived collection
            await addDoc(collection(db, "users", user.uid, "archivedJournals"), journalToArchive);

            // Remove the journal from the saved journals collection
            await deleteDoc(doc(db, "users", user.uid, "journals", journalId));

            // Update local state
            setJournals((prev) => prev.filter((journal) => journal.id !== journalId));

            // Show snackbar notification
            setSnackbarMessage("Journal archived successfully");
            setSnackbarOpen(true);
        } catch (error) {
            console.error("Error archiving journal:", error);
            setSnackbarMessage("Failed to archive journal");
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => setSnackbarOpen(false);

    useEffect(() => {
            document.title = 'Saved Journals';
        }, [])

    return (
        <div className="h-auto w-full md:w-full lg:w-4/5 ml-auto p-9 pt-24 md:pt-16 lg:pt-16">
            {loading ? (
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
            ) : (
                <>
                    {journals.length === 0 ? (
                        <div className="">
                            <p>No saved journals yet.</p>
                            <button
                                onClick={handleAddJournal}
                                className="mt-4 border-solid border-[2px] border-orange-600/50 text-orange-600/50 text-sm p-1 px-6 rounded-md"
                            >
                                <FontAwesomeIcon icon={faPlus}  /> Add New Journal
                            </button>
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-xl font-medium mb-1">Your journals</h2>
                            <button
                                onClick={handleAddJournal}
                                className="my-4 border-solid border-[2px] border-orange-600/50 text-orange-600/50 font-medium text-[11px] p-1 px-4 rounded-md"
                            >
                                <FontAwesomeIcon icon={faPlus}  /> Add New Journal
                            </button>
                            <ul>
                                {journals.map((journal, index) => (
                                    <li key={index} className="mb-4 cursor-pointer">
                                        <div>
                                                                 
                                            <div className='relative bg-orange-50/75 items-center justify-center border-[1px] border-slate-100 p-6 rounded-2xl backdrop-blur-md '>
                                            <p className='p-1 ml-auto flex px-2 mb-5 rounded-xl  w-fit font-bold text-[10px] text-orange-300 border-orange-300 border-[1px] bg-orange-200/20'>{formatDate(journal.date)}</p>
                                            <p className='font-bold text-[16px] mb-3'>{journal.title}</p>
                                            <p className='text-[14px]'>{journal.content}</p>
                                            <div className="mt-3 flex gap-2 items-end justify-end">
                                            <FontAwesomeIcon icon={faEdit} className='flex text-white bg-orange-300 p-2 rounded-md hover:bg-black duration-300' />
                                            <FontAwesomeIcon icon={faBoxArchive} onClick={() => handleArchive(journal.id)} className='flex text-white bg-orange-300 p-2 rounded-md hover:bg-black duration-300' />
                                            </div>
                                        </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            
                        </div>

                        
                    )}
                </>
                
            )}

                <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />

        
        </div>
    );
}

export default savedJournal;
