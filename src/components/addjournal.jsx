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
            className="h-lvh w-full pl-[5rem] lg:pl-[28rem] rounded-xl bg-amber-950 p-4 text-white"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div
                className="flex flex-col gap-2 *:w-full"
            >
                <motion.input
                    type="date"
                    className="bg-orange-800/25 outline-none p-3"
                    variants={childVariants}
                />
                <motion.textarea
                    name=""
                    id=""
                    className="bg-orange-800/25 rounded-md outline-none p-3 text-xl h-auto"
                    placeholder="Title"
                    variants={childVariants}
                ></motion.textarea>
                <motion.textarea
                    name=""
                    id=""
                    className="flex h-80 bg-orange-800/25 rounded-md outline-none p-3"
                    placeholder="Write about your day, ideas, or dreams..."
                    variants={childVariants}
                ></motion.textarea>
                <motion.button
                    className="font-groteskbold text-center bg-orange-600/15 hover:bg-orange-600/45 shadow-inner shadow-orange-400/40 hover:shadow-orange-400/60 duration-300 text-sm rounded-md p-2 w-full text-white"
                    
                >
                    Save Journal
                </motion.button>
            </div>
        </motion.div>
    );
}

export default Addjournal;
