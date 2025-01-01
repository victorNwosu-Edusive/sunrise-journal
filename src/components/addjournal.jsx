import React from "react";
import { motion } from "framer-motion";

function Addjournal() {

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

    return (
        <motion.div
            className="h-auto md:h-auto lg:h-auto w-full md:w-full lg:w-4/5 ml-auto pt-20 md:pt-20 lg:pt-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div
                className="flex flex-col gap-2 bg-white rounded-md p-4 md:p-14 lg:p-14"
            >
                <motion.input
                    type="date"
                    className="bg-slate-200/25 outline-none p-3 w-full"
                    variants={childVariants}
                />
                <motion.textarea
                    name=""
                    id=""
                    className="bg-slate-200/25 rounded-md outline-none p-3 text-xl h-auto w-full"
                    placeholder="Title"
                    variants={childVariants}
                ></motion.textarea>
                <motion.textarea
                    name=""
                    id=""
                    className="flex h-80 bg-slate-200/25 rounded-md outline-none p-3 w-full"
                    placeholder="Write about your day, ideas, or dreams..."
                    variants={childVariants}
                ></motion.textarea>
                <motion.button
                    className="text-white w-2/5 md:1/5 lg:1/5 text-sm bg-orange-600/55 hover:bg-orange-600/45 p-2 hover:shadow-orange-400/60 duration-300 rounded-md font-bold justify-center"
                    
                >
                    Save Journal
                </motion.button>
            </div>
        </motion.div>
    );
}

export default Addjournal;
