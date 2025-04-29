import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { db, auth } from "../firebase"; // Firebase Firestore and Auth instance
import { collection, addDoc } from "firebase/firestore"; // Firestore methods
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function Addjournal() {
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false); // Loading state for the submit button
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                staggerChildren: 0.2,
            },
        },
    };

    const childVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };

    const handleSaveJournal = async (e) => {
        e.preventDefault();

        // Check if the user is logged in
        const user = auth.currentUser;
        if (!user) {
            setSnackbarMessage("You must be logged in to add a journal.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return;
        }

        // Ensure all fields are filled
        if (!date || !title || !content) {
            setSnackbarMessage("Please fill in all fields!");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return;
        }

        setLoading(true); // Set loading state to true when saving

        try {
            // Add the new journal entry to Firestore under the user's "journals" subcollection
            await addDoc(collection(db, "users", user.uid, "journals"), {
                date,
                title,
                content,
                createdAt: new Date(), // Timestamp of when the journal was created
            });
            setSnackbarMessage("Journal saved successfully!");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
            setDate("");
            setTitle("");
            setContent("");
        } catch (error) {
            console.error("Error saving journal: ", error);
            setSnackbarMessage("Error saving journal. Please try again later.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    useEffect(() => {
        document.title = 'New Journal';
    }, [])

    return (
        <motion.div
            className="h-auto md:h-auto lg:h-auto w-full md:w-full lg:w-4/5 ml-auto pt-20 md:pt-20 lg:pt-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="flex flex-col gap-2 bg-white rounded-md p-4 md:p-14 lg:p-14">
                <motion.input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-slate-200/25 border-orange-300 border-b-[1.5px] outline-none p-3 w-full"
                    variants={childVariants}
                />
                <motion.textarea
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-slate-200/25 rounded-b-none border-orange-300 border-b-[1.5px] rounded-md outline-none p-3 h-auto w-full"
                    placeholder="Title"
                    variants={childVariants}
                ></motion.textarea>
                <motion.textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="flex h-80 border-orange-300 border-b-[1.5px] rounded-b-none bg-slate-200/25 rounded-md outline-none p-3 w-full"
                    placeholder="Write about your day, ideas, or dreams..."
                    variants={childVariants}
                ></motion.textarea>
                <motion.button
                    className="text-white w-2/5 md:1/5 lg:1/5 text-sm bg-orange-600/55 hover:bg-orange-600/45 p-2 hover:shadow-orange-400/60 duration-300 rounded-md font-bold justify-center"
                    onClick={handleSaveJournal}
                    disabled={loading} // Disable the button when loading
                >
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
                    ) : "Save Journal"}
                </motion.button>
            </div>

            {/* Snackbar for success and error messages */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </motion.div>
    );
}

export default Addjournal;
