import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Think from '../assets/images/why-journal.png';
import productive from '../assets/images/productive-journal.png';
import track from '../assets/images/track-journal.png';
import documenting from '../assets/images/document-journal.png';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/sunrise-logs.png';
import { faArrowRight, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import Loading from './loading';
import { faSquareCaretDown } from '@fortawesome/free-solid-svg-icons/faSquareCaretDown';


function Journalscreen(){

const words = [
    "Productivity.",
    "Self-Discovery.",
    "Peace of Mind.",
    "Clarity.",
    "Growth.",
    "Happiness.",
  ];


  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000); // changes every 2 seconds
    return () => clearInterval(interval);
  }, [words.length]);


    const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);

    // Show loading screen for 2 seconds, then go to login page
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  

    useEffect(() => {
                document.title = 'Sunrise Journal — Every moment deserves a page';
            }, [])

            if (loading) {
    return <Loading />; // Show your loading component
  }

    return(
        <>
        {/*
        <div className='grid md:grid-cols-3 lg:grid-cols-3'>
        <div className='bg-hero-pattern p-2 px-7 md:px-10 lg:px-10 font-medium text-white bg-cover bg-center h-40 md:h-[100%] lg:h-[100%]'></div>
        <div className="md:col-span-2 lg:col-span-2 ml-auto">
        <div className=' p-9 bg-white pb-24'>
            <div className="flex">
        <img src={logo} alt="" className="h-11 w-11 md:h-9 md:w-9 lg:h-9 lg:w-9" />
            </div>
        <h1 className='font-bold text-orange-950 text-[18px] mt-9 md:mt-6 lg:mt-6 -mb-1'>Welcome to</h1>
         <h1 className='font-bold text-orange-950 text-2xl md:text-4xl lg:text-4xl mb-2'>Sunrise Journal</h1>
         <h1 className='font-bold text-orange-950 text-[15px] mb-5'> Write . <span className='text-orange-500'>Reflect</span> . <span className='text-orange-900'>Grow</span></h1>
         <h1 className='text-[14px] md:text-[15px] lg:text-[15px] text-slate-600 bg-slate-200/30 rounded-xl p-6 pb-16'>Sunrise Journal is a sleek and intuitive journaling app designed to help you capture your thoughts, 
            ideas, and memories effortlessly. With its elegant design and user-friendly interface, Sunrise Journal 
            makes it easy to log daily reflections, set goals, and track your personal growth. Start your day with 
            clarity and end it with gratitude</h1>
        </div>
        <div className='rounded-xl p-5 m-6 md:m-16 lg:m-16 -mt-32 md:-mt-32 lg:-mt-40 shadow-sm flex z-10 flex-col items-center justify-center'>
            <img src={heroImage} alt="" className='mb-5 h-40 w-auto flex items-center justify-center' />
        <div className='flex gap-3 md:gap-3 lg:gap-3'>
        <NavLink onClick={toggleModal} className="text-white text-[12px] md:text-sm lg:text-sm bg-orange-600/65 hover:bg-orange-600/45 p-2 px-7 md:px-10 lg:px-10 font-medium duration-300 rounded-md items-center justify-center"> Sign in</NavLink>
        <NavLink onClick={toggleModal} className="text-slate-600 text-[12px] md:text-sm lg:text-sm bg-gradient-to-b from-slate-100 to-slate-200 p-2 px-7 md:px-10 lg:px-10 font-medium hover:bg-slate-300 duration-300 rounded-md items-center justify-center"> Sign up</NavLink>
        </div>    
            {isModalOpen && <Loginmodal onClose={toggleModal} />}

        </div>
         </div>
         </div>
         */}

         <div className='rounded-2xl m-2 lg:m-5 h-full lg:h-screen md:h-auto bg-hero-pattern bg-orange-700/40 bg-blend-overlay bg-cover bg-no-repeat bg-center p-7 lg:p-10'>
         <div className=''>
          <img src={logo} className='h-10 w-auto' alt="" />
         </div>
         <div className='pt-72 lg:pt-44'>
            <p className='text-white text-4xl lg:text-5xl md:3xl font-global font-thin drop-shadow-[0_0_3px_rgba(255,255,255,0.8)] '>Capture your <span className='font-global text-4xl lg:text-5xl md:text-3xl drop-shadow-[0_0_3px_rgba(255,255,255,0.8)]'>thoughts, ideas and memories -</span> <br className='hidden lg:block ' /> all in one peaceful space designed to <span className='font-global text-4xl md:text-3xl lg:text-5xl drop-shadow-[0_0_3px_rgba(255,255,255,0.8)]'>help you grow.</span> </p>
            <p className='text-white font-bold mt-4 text-sm md:text-3xl lg:text-3xl drop-shadow-[0_0_1px_rgba(255,255,255,0.8)]'>Your Journey to <span className='text-2xl lg:text-5xl md:text-5xl font-global font-thin' >{words[index]}</span></p>
          <div className='flex items-center mt-8 gap-4'>
            <button onClick={handleLogin} className='px-5 p-2 bg-orange-700 hover:bg-orange-950 duration-300 font-bold text-[11px] text-white tracking-widest rounded-md'> SIGN IN <FontAwesomeIcon icon={faArrowRightToBracket} /></button>
            <button onClick={handleLogin} className='px-5 p-2 bg-white/20 backdrop-blur-md hover:bg-white/50 duration-300 text-[11px] border-[1px] border-white font-bold text-white tracking-widest rounded-md'>GET STARTED <FontAwesomeIcon icon={faArrowRight} /> </button>
          </div>  
          </div>

         </div>

         <div className='rounded-2xl lg:h-screen md:h-auto w-screen p-7 pt-20 lg:pt-20 lg:p-10'>
          <p className='font-global text-center lg:text-5xl mb-7 md:text-4xl text-4xl text-orange-950'>Why Journal?</p>
          <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-9 p-16 '>

            <div>
               <div className='bg-orange-300 p-11 absolute rounded-full'></div>
                           
            <div className='relative bg-orange-50/75 items-center justify-center border-[1px] border-slate-100 p-6 rounded-xl backdrop-blur-md '>
             <img src={Think} className='w-auto h-24 m-auto' alt="Why Journal" />

            <p className='text-[12px] text-center text-orange-900 mt-2 font-thin'>Gain Mental Clarity</p>
          </div>
          </div>

          <div>
               <div className='bg-orange-300 p-11 absolute rounded-full'></div>

          <div className='flex-row border-[1px] border-slate-100 bg-orange-50/75 items-center justify-center p-6 rounded-xl backdrop-blur-md '>
            <img src={productive} className='w-auto h-24 m-auto' alt="Why Journal" />

            <p className='text-[12px] text-center text-orange-900 mt-2 font-thin'>Boosts Productivity</p>
          </div>
          </div>

          <div>
               <div className='bg-orange-300 p-11 absolute rounded-full'></div>

          <div className='flex-row border-[1px] border-slate-100 bg-orange-50/75 items-center justify-center p-6 rounded-xl backdrop-blur-md '>
            <img src={track} className='w-auto h-24 m-auto' alt="Why Journal" />

            <p className='text-[12px] text-center text-orange-900 mt-2 font-thin'>Track emotional growth.</p>
          </div>
          </div>

          <div>
               <div className='bg-orange-300 border-[1px] border-slate-100 p-11 absolute rounded-full'></div>

          <div className='flex-row border-[1px] border-slate-100 bg-orange-50/75 items-center justify-center p-6 rounded-xl backdrop-blur-md '>
            <img src={documenting} className='w-auto h-24 m-auto' alt="Why Journal" />

            <p className='text-[12px] text-orange-900 text-center mt-2 font-thin'>Preserve your memories.</p>
          </div>
          </div>

          </div>
         </div>
        </>
    )
}

export default Journalscreen