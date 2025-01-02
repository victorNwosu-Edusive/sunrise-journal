import React from "react";
import logo from '../assets/images/sun-favicon.png'

function Loginmodal({ onClose }) {
    return (
        <div
            className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-orange-100/35 z-50"
            onClick={onClose} // Close modal when clicking outside
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-96 mx-10"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                <div className='flex flex-col gap-5'>
                </div>
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full p-2 border-none bg-orange-100/35 border-[1px] duration-300 rounded-md outline-none focus:ring-2 focus:ring-orange-100 text-sm"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full p-2 border-none bg-orange-100/35 border-[1px] duration-300 rounded-md outline-none focus:ring-2 focus:ring-orange-100 text-sm"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-600/55 text-white font-bold p-2 rounded-lg hover:bg-orange-700 transition duration-300"
                    >
                        Login
                    </button>
                </form>
                <button
                    onClick={onClose}
                    className="mt-4 w-full text-center text-gray-500 hover:text-gray-700"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default Loginmodal;