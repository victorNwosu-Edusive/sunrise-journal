import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive, faBookJournalWhills, faPlus, faRightToBracket, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faBookmark, faHeart, faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { Outlet, NavLink } from 'react-router-dom';
import logo from '../assets/images/sun-favicon.png';
import Loginmodal from './loginmodal';
import { auth } from '../firebase'; // Import Firebase authentication
import { signOut } from 'firebase/auth'; // Firebase signOut function
import '../App.css';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faJournalWhills } from '@fortawesome/free-solid-svg-icons/faJournalWhills';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';

function Journalnav() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState(null); // State to store the logged-in user

    // Toggle modal visibility
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // Handle menu toggling for mobile view
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    // Listen for user authentication state changes
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser); // Set user when logged in, or null if not logged in
        });

        // Cleanup the listener when the component unmounts
        return () => unsubscribe();
    }, []);

    // Handle logout functionality
    const handleLogout = async () => {
        try {
            await signOut(auth); // Sign the user out
            setUser(null); // Reset user state
        } catch (error) {
            console.error("Error logging out: ", error);
        }
    };

    return (
        <>
            {/* Desktop Navigation */}
            <nav className="h-screen fixed z-20 hidden md:hidden lg:w-1/5 bg-orange-100 p-7 lg:flex flex-col">
                <div className="flex flex-col gap-3">
                    <div className="flex">
                        <img src={logo} alt="" className="h-11 w-11" />
                        <p className="text-sm font-bold text-orange-950 leading-3 pt-2 mb-9">Sunrise <br />Journal</p>
                    </div>

                    {/* Conditionally render navigation items based on login status */}
                    {user ? (
                        <>
                            <NavLink to="/new-journal" className="text-orange-950 hover:bg-orange-600/45 hover:shadow-orange-400/60 p-2 duration-300 text-[13px] rounded-md font-medium w-full flex gap-4 items-center">
                                <FontAwesomeIcon icon={faPlus} className="text-amber-600 text-xl" /> Add New Journal
                            </NavLink>
                            <NavLink to="/saved-journal" className="text-orange-950 hover:bg-orange-600/45 hover:shadow-orange-400/60 p-2 duration-300 text-[13px] rounded-md font-medium w-full flex gap-4 items-center">
                                <FontAwesomeIcon icon={faBookmark} className="text-amber-600 text-xl" /> Saved Journals
                            </NavLink>
                            <NavLink to="" className="text-orange-950 hover:bg-orange-600/45 hover:shadow-orange-400/60 p-2 duration-300 text-[13px] rounded-md font-medium w-full flex gap-4 items-center">
                                <FontAwesomeIcon icon={faHeart} className="text-amber-600 text-xl" /> Favourite Journals
                            </NavLink>
                            <NavLink to="/archived-journal" className="text-orange-950 hover:bg-orange-600/45 hover:shadow-orange-400/60 p-2 duration-300 text-[13px] rounded-md font-medium w-full flex gap-4 mb-11 items-center">
                                <FontAwesomeIcon icon={faArchive} className="text-amber-600 text-xl" /> Archived
                            </NavLink>

                            {/* Show user name and logout button */}
                            <span className="text-orange-950 font-medium text-sm">{user.displayName || user.email}</span>
                            <NavLink onClick={handleLogout} className="text-white text-sm bg-orange-600/55 hover:bg-orange-600/45 p-2 hover:shadow-orange-400/60 duration-300 rounded-md font-bold w-full flex gap-4 items-center justify-center">
                                Logout
                            </NavLink>
                        </>
                    ) : (
                        <NavLink onClick={toggleModal} className="text-white text-sm bg-orange-600/55 hover:bg-orange-600/45 p-2 hover:shadow-orange-400/60 duration-300 rounded-md font-bold w-full flex gap-4 items-center justify-center">
                            Login to save
                        </NavLink>
                    )}

                    {isModalOpen && <Loginmodal onClose={toggleModal} />}
                </div>
            </nav>

            {/* Mobile Menu */}
            <nav className="fixed bottom-0 z-40 rounded-t-3xl w-full md:w-full md:hidden lg:hidden bg-white/80 backdrop-blur-md p-1 grid grid-cols-4 justify-evenly items-center">
               <button className='p-2 hover:bg-orange-400/25 rounded-lg w-full'> <FontAwesomeIcon icon={faHome} className="text-amber-600 text-xl" /> <p className='text-[9px] text-amber-600'>Home</p> </button>
               <button className='p-2 hover:bg-orange-400/25 rounded-lg w-full'> <FontAwesomeIcon icon={faPlusCircle} className="text-amber-600 text-xl" /> <p className='text-[9px] text-amber-600'>New Journal</p> </button>
               <button className='p-2 hover:bg-orange-400/25 rounded-lg w-full'> <FontAwesomeIcon icon={faJournalWhills} className="text-amber-600 text-xl" /> <p className='text-[9px] text-amber-600'>My Journals</p> </button>
               <button className='p-2 hover:bg-orange-400/25 rounded-lg w-full'> <FontAwesomeIcon icon={faUserCircle} className="text-amber-600 text-xl" /> <p className='text-[9px] text-amber-600'>You</p> </button>
            </nav>

            {/* Mobile Menu Extended: On-click */}
            <nav className={`${isOpen ? "left-0" : "-left-full"} h-screen fixed z-50 duration-300 lg:w-1/5 bg-orange-100 p-7 lg:flex flex-col border-r-2 border-r-orange-950/25`}>
                <div className="mb-6 md:mb-6">
                    <button className="text-orange-950 md:block lg:block focus:outline-none relative w-6 h-6 left-[90%]" onClick={closeMenu}>
                        <span className="block absolute w-6 h-0.5 rotate-45 bg-orange-950 -translate-y-1.5"></span>
                        <span className="block absolute w-6 h-0.5 -rotate-45 bg-orange-950 -translate-y-1.5"></span>
                    </button>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="flex">
                        <img src={logo} alt="" className="h-11 w-11" />
                        <p className="text-sm font-bold text-orange-950 leading-3 pt-2 mb-9">Sunrise <br />Journal</p>
                    </div>

                    {user ? (
                        <>
                            <NavLink to="/new-journal" className="text-orange-950 hover:bg-orange-600/45 hover:shadow-orange-400/60 p-2 duration-300 text-[13px] rounded-md font-medium w-full flex gap-4 items-center" onClick={closeMenu}>
                                <FontAwesomeIcon icon={faPlus} className="text-amber-600 text-xl" /> Add New Journal
                            </NavLink>
                            <NavLink to="/saved-journal" className="text-orange-950 hover:bg-orange-600/45 hover:shadow-orange-400/60 p-2 duration-300 text-[13px] rounded-md font-medium w-full flex gap-4 items-center" onClick={closeMenu}>
                                <FontAwesomeIcon icon={faBookmark} className="text-amber-600 text-xl" /> Saved Journals
                            </NavLink>
                            <NavLink to="" className="text-orange-950 hover:bg-orange-600/45 hover:shadow-orange-400/60 p-2 duration-300 text-[13px] rounded-md font-medium w-full flex gap-4 items-center" onClick={closeMenu}>
                                <FontAwesomeIcon icon={faHeart} className="text-amber-600 text-xl" /> Favourite Journals
                            </NavLink>
                            <NavLink to="/archived-journal" className="text-orange-950 hover:bg-orange-600/45 hover:shadow-orange-400/60 p-2 duration-300 text-[13px] rounded-md font-medium w-full flex gap-4 mb-11 items-center" onClick={closeMenu}>
                                <FontAwesomeIcon icon={faArchive} className="text-amber-600 text-xl" /> Archived
                            </NavLink>
                            <NavLink onClick={handleLogout} className="text-white text-sm bg-orange-600/55 hover:bg-orange-600/45 p-2 hover:shadow-orange-400/60 duration-300 rounded-md font-bold w-full flex gap-4 items-center justify-center">
                                Logout
                            </NavLink>
                        </>
                    ) : (
                        <NavLink onClick={toggleModal} className="text-white text-sm bg-orange-600/55 hover:bg-orange-600/45 p-2 px-10 hover:shadow-orange-400/60 duration-300 rounded-md font-bold w-full flex gap-4 items-center justify-center">
                            Login to save
                        </NavLink>
                    )}
                    {isModalOpen && <Loginmodal onClose={toggleModal} />}
                </div>
            </nav>

            <Outlet />
        </>
    );
}

export default Journalnav;
