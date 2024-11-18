import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive, faPlus, faRightToBracket, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faBookmark, faHeart } from '@fortawesome/free-regular-svg-icons';
import { Outlet, NavLink } from 'react-router-dom'
import logo from '../assets/images/sun-favicon.png'
import Loginmodal from './loginmodal';

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
        <nav className="h-screen fixed z-20 hidden md:hidden lg:w-1/3 bg-orange-900 p-4 lg:flex flex-col">
         
         <div className='flex flex-col gap-5'>
         <div className='flex'>
         <img src={logo} alt="" className='h-11 w-11'  />
         <p className='font-groteskbold text-sm text-white leading-3 pt-2'>Sunrise <br />Journal</p>
         </div>

         <div className='bg-orange-950 flex w-full relative py-2 px-3 rounded-3xl text-white text-sm gap-3'>
         <FontAwesomeIcon icon={faSearch} className='text-xl' />
        <input type="text" className='bg-orange-950 w-full outline-none' placeholder='Search for Journal entries' />
        <button type='search'>Search</button>
        </div>

            <NavLink to="/new-journal" className="bg-orange-600/15 hover:bg-orange-600/45 shadow-inner shadow-orange-400/40 hover:shadow-orange-400/60 duration-300 text-sm rounded-md p-2 w-full flex gap-5 text-white"> <FontAwesomeIcon icon={faPlus} className='text-xl' /> Add New Journal</NavLink>
            <NavLink to="" className="bg-orange-600/15 hover:bg-orange-600/45 shadow-inner shadow-orange-400/40 hover:shadow-orange-400/60 duration-300 text-sm rounded-md p-2 w-full flex gap-5 text-white"><FontAwesomeIcon icon={faBookmark} className='text-xl' /> Saved Journals</NavLink>
            <NavLink to="" className="bg-orange-600/15 hover:bg-orange-600/45 shadow-inner shadow-orange-400/40 hover:shadow-orange-400/60 duration-300 text-sm rounded-md p-2 w-full flex gap-5 text-white"><FontAwesomeIcon icon={faHeart} className='text-xl' /> Favourite Journals</NavLink>
            <NavLink to="" className="bg-orange-600/15 hover:bg-orange-600/45 shadow-inner shadow-orange-400/40 hover:shadow-orange-400/60 duration-300 text-sm rounded-md p-2 w-full flex gap-5 mb-11 text-white"><FontAwesomeIcon icon={faArchive} className='text-xl' /> Archived</NavLink>
            <NavLink onClick={toggleModal} className="bg-amber-600/55 hover:bg-orange-600/45 shadow-inner shadow-orange-400/40 hover:shadow-orange-400/60 duration-300 rounded-md p-2 w-full flex gap-5 text-white"> <FontAwesomeIcon icon={faRightToBracket} className='text-xl' /> Login to save</NavLink>
            
            {isModalOpen && <Loginmodal onClose={toggleModal} />}
            </div>

           
            
        </nav>

        {/*the mobile menu*/}
        <nav className="h-screen fixed z-40 w-auto md:w-auto overflow-y-auto md:flex lg:hidden bg-orange-900 p-4 flex flex-col">
         <div className='mb-6 md:mb-6 '>
         <button className='text-white block md:block lg:hidden focus:outline-none relative w-6 h-6' onClick={toggleMenu}>
            <span className='block absolute w-6 h-0.5 bg-white -translate-y-1.5'></span>
            <span className='block absolute w-6 h-0.5 bg-white '></span>
            <span className='block absolute w-6 h-0.5 bg-white translate-y-1.5'></span>
         </button>
         </div>
         <div className='flex flex-col gap-5'>
         <div className='flex'>
         <img src={logo} alt="" className='h-8 w-8'  />
         <p className=' hidden font-groteskbold text-sm text-white leading-3 pt-2'>Sunrise <br />Journal</p>
         </div>

         <div className='bg-orange-950 hidden md:hidden lg:flex w-full relative py-2 px-3 rounded-3xl text-white text-sm gap-3'>
         <FontAwesomeIcon icon={faSearch} className='text-xl' />
        <input type="text" className='bg-orange-950 w-full outline-none' placeholder='Search for Journal entries' />
        <button type='search'>Search</button>
        </div>

            <NavLink to="/new-journal" className="bg-orange-600/15 hover:bg-orange-600/45 shadow-inner shadow-orange-400/40 hover:shadow-orange-400/60 duration-300 text-sm rounded-md p-2 w-full flex gap-5 text-white"> <FontAwesomeIcon icon={faPlus} className='text-xl' /></NavLink>
            <NavLink to="" className="bg-orange-600/15 hover:bg-orange-600/45 shadow-inner shadow-orange-400/40 hover:shadow-orange-400/60 duration-300 text-sm rounded-md p-2 w-full flex gap-5 text-white"><FontAwesomeIcon icon={faBookmark} className='text-xl' /></NavLink>
            <NavLink to="" className="bg-orange-600/15 hover:bg-orange-600/45 shadow-inner shadow-orange-400/40 hover:shadow-orange-400/60 duration-300 text-sm rounded-md p-2 w-full flex gap-5 text-white"><FontAwesomeIcon icon={faHeart} className='text-xl' /></NavLink>
            <NavLink to="" className="bg-orange-600/15 hover:bg-orange-600/45 shadow-inner shadow-orange-400/40 hover:shadow-orange-400/60 duration-300 text-sm rounded-md p-2 w-full flex gap-5 mb-11 text-white"><FontAwesomeIcon icon={faArchive} className='text-xl' /></NavLink>
            <NavLink onClick={toggleModal} className="bg-amber-600/55 hover:bg-orange-600/45 shadow-inner shadow-orange-400/40 hover:shadow-orange-400/60 duration-300 rounded-md p-2 w-full flex gap-5 text-white"> <FontAwesomeIcon icon={faRightToBracket} className='text-xl' /></NavLink>
            
            {isModalOpen && <Loginmodal onClose={toggleModal} />}
            </div>
        </nav>


        {/*the mobile menu extended: on-click*/}
        <nav className={`${
          isOpen ? "left-0" : "-left-full"
        } h-screen fixed z-50 w-auto md:w-auto md:flex lg:left-0 lg:hidden duration-300 overflow-y-auto bg-orange-900 p-4 flex flex-col `}>
         <div className='mb-6 md:mb-6 '>
         <button className='text-white md:block lg:block focus:outline-none relative w-6 h-6 left-[90%]' onClick={closeMenu}>
            <span className='block absolute w-6 h-0.5 rotate-45 bg-white -translate-y-1.5'></span>
            <span className='block absolute w-6 h-0.5 -rotate-45 bg-white -translate-y-1.5'></span>
         </button>
         </div>
         <div className='flex flex-col gap-5'>
         <div className='flex'>
         <img src={logo} alt="" className='h-9 w-9'  />
         <p className='font-groteskbold text-sm text-white leading-3 pt-2'>Sunrise <br />Journal</p>
         </div>

         <div className='bg-orange-950 hidden md:hidden lg:flex w-full relative py-2 px-3 rounded-3xl text-white text-sm gap-3'>
         <FontAwesomeIcon icon={faSearch} className='text-xl' />
        <input type="text" className='bg-orange-950 w-full outline-none' placeholder='Search for Journal entries' />
        <button type='search'>Search</button>
        </div>

            <NavLink to="/new-journal" className="bg-orange-600/15 hover:bg-orange-600/45 shadow-inner shadow-orange-400/40 hover:shadow-orange-400/60 duration-300 text-sm rounded-md p-2 w-full flex gap-5 text-white" onClick={closeMenu}> <FontAwesomeIcon icon={faPlus} className='text-xl' /> Add New Journal</NavLink>
            <NavLink to="" className="bg-orange-600/15 hover:bg-orange-600/45 shadow-inner shadow-orange-400/40 hover:shadow-orange-400/60 duration-300 text-sm rounded-md p-2 w-full flex gap-5 text-white" onClick={closeMenu}><FontAwesomeIcon icon={faBookmark} className='text-xl' /> Saved Journals</NavLink>
            <NavLink to="" className="bg-orange-600/15 hover:bg-orange-600/45 shadow-inner shadow-orange-400/40 hover:shadow-orange-400/60 duration-300 text-sm rounded-md p-2 w-full flex gap-5 text-white" onClick={closeMenu}><FontAwesomeIcon icon={faHeart} className='text-xl' />Favourite Journals</NavLink>
            <NavLink to="" className="bg-orange-600/15 hover:bg-orange-600/45 shadow-inner shadow-orange-400/40 hover:shadow-orange-400/60 duration-300 text-sm rounded-md p-2 w-full flex gap-5 mb-11 text-white" onClick={closeMenu}><FontAwesomeIcon icon={faArchive} className='text-xl' />Archived</NavLink>
            <NavLink onClick={toggleModal} className="bg-amber-600/55 hover:bg-orange-600/45 shadow-inner shadow-orange-400/40 hover:shadow-orange-400/60 duration-300 text-sm rounded-md p-2 w-full flex gap-5 text-white" > <FontAwesomeIcon icon={faRightToBracket} className='text-xl' />Login to save</NavLink>
            
            {isModalOpen && <Loginmodal onClose={toggleModal} />}
            </div>
        </nav>

        
        <Outlet />
        </>
    )
}

export default Journalnav