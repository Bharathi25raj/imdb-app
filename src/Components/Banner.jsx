import React, { useEffect, useState } from "react";
import axios from "axios";

function Banner(){

    const [movieObj, setMovieObj] = useState({});

    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=ac6850ce8cd45dfbe8bbbcd7e094d1b2')
        .then((response) => {
            const randomNumber = Math.floor(Math.random() * 20);
            
            let movies = response.data.results;
            // console.log(movies);
    
            setMovieObj(movies[randomNumber]);
        }) 

    }, []);

    if(movieObj.backdrop_path === undefined){
        return <>Loading...</>
    }

    return (
        <div className="flex justify-center items-end h-[72vh] bg-cover bg-no-repeat" 
                style={{backgroundImage:`url(https://image.tmdb.org/t/p/original${movieObj.backdrop_path})`}}>
            <div className="text-2xl text-white py-2 bg-zinc-900/50 w-full text-center">
                {movieObj.original_title}
            </div>
        </div>
    )
}


export default Banner;