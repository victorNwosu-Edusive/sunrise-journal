import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive, faPlus, faRightToBracket, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faBookmark, faHeart } from '@fortawesome/free-regular-svg-icons';
import { Outlet, NavLink } from 'react-router-dom'
import logo from '../assets/images/sun-favicon.png'
import Loginmodal from './loginmodal';
import '../App.css';


function Journalnav(){

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to toggle modal visibility
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const [isOpen, setIsOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
      };

    return(
        <>

        {/*the desktop navigation */}
        <nav className="h-screen fixed z-20 hidden md:hidden lg:w-1/5 bg-orange-100 p-7 lg:flex flex-col">
         
         <div className='flex flex-col gap-3'>
         <div className='flex'>
         <img src={logo} alt="" className='h-11 w-11'  />
         <p className='text-sm font-bold text-orange-950 leading-3 pt-2 mb-9'>Sunrise <br />Journal</p>
         </div>

         

            <NavLink to="/new-journal" className="text-orange-950 hover:bg-orange-600/45 hover:shadow-orange-400/60 p-2 duration-300 text-[13px] rounded-md font-medium w-full flex gap-4 items-center "> <FontAwesomeIcon icon={faPlus} className='text-amber-600 text-xl'  /> Add New Journal</NavLink>
            <NavLink to="/saved-journal" className="text-orange-950  hover:bg-orange-600/45 hover:shadow-orange-400/60 p-2 duration-300 text-[13px] rounded-md font-medium w-full flex gap-4 items-center  "><FontAwesomeIcon icon={faBookmark} className='text-amber-600 text-xl' /> Saved Journals</NavLink>
            <NavLink to="" className="text-orange-950  hover:bg-orange-600/45 hover:shadow-orange-400/60 p-2 duration-300 text-[13px] rounded-md font-medium w-full flex gap-4 items-center "><FontAwesomeIcon icon={faHeart} className='text-amber-600 text-xl' /> Favourite Journals</NavLink>
            <NavLink to="" className="text-orange-950  hover:bg-orange-600/45 hover:shadow-orange-400/60 p-2 duration-300 text-[13px] rounded-md font-medium w-full flex gap-4 mb-11 items-center  "><FontAwesomeIcon icon={faArchive} className='text-amber-600 text-xl' /> Archived</NavLink>
            <NavLink onClick={toggleModal} className="text-white text-sm bg-orange-600/55 hover:bg-orange-600/45 p-2 hover:shadow-orange-400/60 duration-300 rounded-md font-bold w-full flex gap-4 items-center justify-center"> Login to save</NavLink>
            
            {isModalOpen && <Loginmodal onClose={toggleModal} />}
            </div>

           
            
        </nav>

        {/*the mobile menu*/}
        <nav className="h-auto fixed z-40 w-full md:w-full lg:hidden bg-orange-100 p-4 flex flex-wrap justify-between items-center">
         <div className='flex'>
         <img src={logo} alt="" className='h-8 w-8'  />
         <p className='text-[12px] font-bold text-orange-950 leading-3 pt-1'>Sunrise <br />Journal</p>
         </div>

         <div className=''>
         <button className='text-white block md:block lg:hidden focus:outline-none relative scale-x-[-1] w-6 h-6' onClick={toggleMenu}>
               <span
                className={`block absolute w-6 h-0.5 bg-orange-950 transition-transform duration-300 -translate-y-1.5 ${
                  isOpen ? 'bg-orange-950 transition-all' : '-translate-y-1.5 duration-300'
                }`}
              ></span>
              <span
                className={`block absolute w-4 h-0.5 bg-orange-950 transition-transform duration-300 ${
                  isOpen ? 'bg-orange-950 transition-all' : 'w-7 transition-all duration-300'
                }`}
              ></span>
              <span
                className={`block absolute w-6 h-0.5 bg-black transition-transform duration-300 translate-y-1.5 ${
                  isOpen ? 'bg-orange-950 transition-all' : 'translate-y-1.5 duration-300'
                }`}
              ></span>
         </button>
         </div>
        </nav>


        {/*the mobile menu extended: on-click*/}
        <nav className={`${
          isOpen ? "left-0" : "-left-full"
        } h-screen fixed z-50 duration-300 lg:w-1/5 bg-orange-100 p-7 lg:flex flex-col border-r-2 border-r-orange-950/25`}>
         <div className='mb-6 md:mb-6'>
         <button className='text-orange-950 md:block lg:block focus:outline-none relative w-6 h-6 left-[90%]' onClick={closeMenu}>
            <span className='block absolute w-6 h-0.5 rotate-45 bg-orange-950 -translate-y-1.5'></span>
            <span className='block absolute w-6 h-0.5 -rotate-45 bg-orange-950 -translate-y-1.5'></span>
         </button>
         </div>

        <div className='flex flex-col gap-3'>
         <div className='flex'>
         <img src={logo} alt="" className='h-11 w-11'  />
         <p className='text-sm font-bold text-orange-950 leading-3 pt-2 mb-9'>Sunrise <br />Journal</p>
         </div>

            <NavLink to="/new-journal" className="text-orange-950 hover:bg-orange-600/45 hover:shadow-orange-400/60 p-2 duration-300 text-[13px] rounded-md font-medium w-full flex gap-4 items-center " onClick={closeMenu}> <FontAwesomeIcon icon={faPlus} className='text-amber-600 text-xl'  /> Add New Journal</NavLink>
            <NavLink to="/saved-journal" className="text-orange-950  hover:bg-orange-600/45 hover:shadow-orange-400/60 p-2 duration-300 text-[13px] rounded-md font-medium w-full flex gap-4 items-center  " onClick={closeMenu}><FontAwesomeIcon icon={faBookmark} className='text-amber-600 text-xl' /> Saved Journals</NavLink>
            <NavLink to="" className="text-orange-950  hover:bg-orange-600/45 hover:shadow-orange-400/60 p-2 duration-300 text-[13px] rounded-md font-medium w-full flex gap-4 items-center " onClick={closeMenu}><FontAwesomeIcon icon={faHeart} className='text-amber-600 text-xl' /> Favourite Journals</NavLink>
            <NavLink to="" className="text-orange-950  hover:bg-orange-600/45 hover:shadow-orange-400/60 p-2 duration-300 text-[13px] rounded-md font-medium w-full flex gap-4 mb-11 items-center  " onClick={closeMenu}><FontAwesomeIcon icon={faArchive} className='text-amber-600 text-xl' /> Archived</NavLink>
            <NavLink onClick={toggleModal} className="text-white text-sm bg-orange-600/55 hover:bg-orange-600/45 p-2 hover:shadow-orange-400/60 duration-300 rounded-md font-bold w-full flex gap-4 items-center justify-center"> Login to save</NavLink>
            
            {isModalOpen && <Loginmodal onClose={toggleModal} />}
            
            </div>
            

           
            
        </nav>

        
        <Outlet />
        </>
    )
}

export default Journalnav