import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { auth } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Firestore instance
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function Loginmodal({ onClose }) {
    const [isSignUp, setIsSignUp] = useState(false); // Toggles between login and sign-up
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        setError(''); // Clear previous errors
    
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            setLoading(false);
            return;
        }
    
        try {
            if (isSignUp) {
                // Handle Sign Up
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await setDoc(doc(db, "users", userCredential.user.uid), {
                    email,
                    username,
                });
    
                setSnackbarMessage("Sign up successful!");
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
                
                // Delay the navigation to allow Snackbar to show
                setTimeout(() => {
                    navigate("/saved-journal");
                    onClose(); // Close modal after the redirect
                }, 2000); // 2 seconds delay
            } else {
                // Handle Login
                const usersSnapshot = await getDoc(doc(db, "usernames", username));
                if (!usersSnapshot.exists()) {
                    throw new Error("Username not found");
                }
                const userEmail = usersSnapshot.data().email;
    
                await signInWithEmailAndPassword(auth, userEmail, password);
                setSnackbarMessage("Login successful!");
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
                
                // Delay the navigation to allow Snackbar to show
                setTimeout(() => {
                    navigate("/saved-journal");
                    onClose(); // Close modal after the redirect
                }, 2000); // 2 seconds delay
            }
        } catch (err) {
            setSnackbarMessage(err.code === 'auth/wrong-password'
                ? "Incorrect password."
                : err.code === 'auth/user-not-found'
                    ? "User not found."
                    : err.message);
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        } finally {
            setLoading(false); // Stop loading
        }
    };
    

    return (
        <div
            className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-orange-600/25 z-50"
            onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-96 mx-10"
                onClick={(e) => e.stopPropagation()}
            >

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

            <button
                onClick={onClose}
                className="float-right"
            >
                <FontAwesomeIcon icon={faXmarkCircle} className='text-amber-600 text-2xl' />
            </button>
            <h2 className="text-2xl font-bold mb-4">
                {isSignUp ? "Sign Up" : "Login"}
            </h2>
            <form onSubmit={handleAuth}>
                {isSignUp && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border-none bg-slate-200/50 border-[1px] duration-300 rounded-md outline-none focus:ring-2 focus:ring-orange-100 text-sm"
                            required
                        />
                    </div>
                )}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border-none bg-slate-200/50 border-[1px] duration-300 rounded-md outline-none focus:ring-2 focus:ring-orange-100 text-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border-none bg-slate-200/50 border-[1px] duration-300 rounded-md outline-none focus:ring-2 focus:ring-orange-100 text-sm"
                        required
                    />
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-orange-600/55 text-white font-bold p-2 rounded-lg hover:bg-orange-700 transition duration-300"
                    disabled={loading}
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
                    ) : (isSignUp ? "Sign Up" : "Login")}
                </button>
            </form>
            <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="mt-4 text-[12px] w-full text-center text-gray-500 hover:text-gray-700"
            >
                {isSignUp
                    ? "Already have an account? Login"
                    : "Don't have an account? Sign Up"}
            </button>
        </div>
    </div>
);
}

export default Loginmodal;
