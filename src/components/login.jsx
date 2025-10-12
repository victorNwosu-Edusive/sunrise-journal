import { useEffect, useState } from 'react';
import logimage from '../assets/images/login-image.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket, faLock } from '@fortawesome/free-solid-svg-icons';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase"; // Firestore instance
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';



const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
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

        if (password.length > 1 && password.length < 6) {
            setError('Password must be at least 6 characters long.');
            setLoading(false);
            return;
        }

        if (password == "") {
            setError('Username and Password is required.');
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
                await signInWithEmailAndPassword(auth, email, password);
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

    useEffect(() => {
                document.title = 'Login - Sunrise Journal';
            }, [])
            
  return (
    <div className='flex gap-6 flex-col p-10 items-center'>
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
                    className="font-['Poppins'] "
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>

        <img src={logimage} className='h-60 w-auto' alt="" />
        <form onSubmit={handleAuth} className='flex-col flex gap-5 w-full lg:w-auto items-center'>
        <div className='px-4 overflow-hidden bg-orange-100 duration-200 outline-none  focus:border-orange-400 w-full   border-orange-700 rounded-full flex items-center justify-center gap-4'> <FontAwesomeIcon icon={faUserCircle} className='text-orange-700' /> <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className='bg-transparent placeholder-orange-700/35 w-full p-3 text-sm outline-none '  placeholder='Username' /></div>
        <div className='px-4 overflow-hidden bg-orange-100 duration-200 outline-none  focus:border-orange-400 w-full text-sm border-orange-700 rounded-full flex items-center justify-center gap-4'> <FontAwesomeIcon icon={faLock} className='text-orange-700' /> <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='bg-transparent placeholder-orange-700/35 w-full p-3 text-sm outline-none '  placeholder='Password' /></div>
        {error && <p className="text-red-500 text-[11px]">{error}</p>}
        <button type="submit" className='bg-orange-700 hover:bg-orange-950 flex items-center justify-center  p-3 w-full font-bold text-[13px] text-white tracking-widest rounded-full duration-300'>
           {loading ? (
          <div class="p-1 flex flex-row gap-2">
  <div class="w-3 h-3 rounded-full bg-white animate-bounce"></div>
  <div
    class="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:-.3s]"
  ></div>
  <div
    class="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:-.5s]"
  ></div>
</div>
) : (isSignUp ? "LOGIN" : "LOGIN")}
          
          </button>
        <p className='text-sm'>Don't have an account? <a href="" className='text-orange-700'>Sign up</a></p>
        </form>
    </div>
  );
};

export default Login;