import React, { useState } from "react";
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
                    className="bg-slate-200/25 outline-none p-3 w-full"
                    variants={childVariants}
                />
                <motion.textarea
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-slate-200/25 rounded-md outline-none p-3 text-xl h-auto w-full"
                    placeholder="Title"
                    variants={childVariants}
                ></motion.textarea>
                <motion.textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="flex h-80 bg-slate-200/25 rounded-md outline-none p-3 w-full"
                    placeholder="Write about your day, ideas, or dreams..."
                    variants={childVariants}
                ></motion.textarea>
                <motion.button
                    className="text-white w-2/5 md:1/5 lg:1/5 text-sm bg-orange-600/55 hover:bg-orange-600/45 p-2 hover:shadow-orange-400/60 duration-300 rounded-md font-bold justify-center"
                    onClick={handleSaveJournal}
                    disabled={loading} // Disable the button when loading
                >
                    {loading ? "Saving..." : "Save Journal"}
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
