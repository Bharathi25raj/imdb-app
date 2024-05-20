import React, { useContext, useState } from "react"
import { MovieContext } from "./MovieContext"


export default function Pagination(){  
    
    const {pageNo, handleNext, handlePrev} = useContext(MovieContext);

    return (
        <div className="flex gap-10 h-12 justify-center items-center bg-slate-400 m-2 p-4 cursor-pointer">
            <div onClick={handlePrev}><i className="fa-sharp fa-solid fa-arrow-left"></i></div>
            <div className="font-bold">{pageNo}</div>
            <div onClick={handleNext}><i className="fa-sharp fa-solid fa-arrow-right"></i></div>
        </div>
    )
}