import { useContext, useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import axios from "axios";
import { MovieContext } from "./MovieContext";


export default function TrendingMovies(){

    const {pageNo} = useContext(MovieContext);

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=ac6850ce8cd45dfbe8bbbcd7e094d1b2&page=${pageNo}`)
         .then((response) => {
            setMovies(response.data.results);
        })
    }, [pageNo])

    // console.log(movies);
    if(movies.length === 0){
        return <>Loading...</>
    }

    return (
        <>
            <div className="font-bold text-2xl text-center pt-5 mt-5">Trending Movies</div>
            <div className="flex justify-around flex-wrap gap-6 p-5">
                {
                    movies.map((movieObj) => {
                        return (<MovieCard 
                                    key={movieObj.id}
                                    movieObj={movieObj}
                                    poster={movieObj.poster_path} 
                                    title={movieObj.title}
                                />)
                    })
                }
            </div>

            <Pagination /> 
        </>
    )
}