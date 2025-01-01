import React from 'react';
import load from '../assets/images/loading-screen.gif'
import logo from '../assets/images/sun-favicon.png'

const Loading = () => {
  return (
    <div className='flex h-lvh w-full justify-center items-center bg-white'>
<div class="flex flex-row gap-2">
  <div class="w-4 h-4 rounded-full bg-orange-600/55 animate-bounce"></div>
  <div
    class="w-4 h-4 rounded-full bg-orange-600/55 animate-bounce [animation-delay:-.3s]"
  ></div>
  <div
    class="w-4 h-4 rounded-full bg-orange-600/55 animate-bounce [animation-delay:-.5s]"
  ></div>
</div>

    </div>
  );
};

export default Loading;