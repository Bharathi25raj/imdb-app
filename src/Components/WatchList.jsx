import { useContext, useEffect, useState } from "react";
import { MovieContext } from "./MovieContext";


export default function WatchList(){

    const {watchList, setWatchList, handleRemoveWatchList} = useContext(MovieContext);

    const [genres, setGenres] = useState(["All Genres"]);
    const [search, setSearch] = useState("");
    const [filteredMovies, setFilterMovies] = useState("All Genres");


    function handleFilter(e){
        // console.log(e.target.innerText);
        setFilterMovies(e.target.innerText);

    }
    

    const GENRE_NAME = {
        28: "Action",
        12: "Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        99: "Documentary",
        18: "Drama",
        10751: "Family",
        14: "Fantasy",
        36: "History",
        27: "Horror",
        10402: "Music",
        9648: "Mystery",
        10749: "Romance",
        878: "Sci-Fi",
        10770: "TV",
        53: "Thriller",
        10752: "War",
        37: "Western",
    };

    useEffect(() => {
        let temp = watchList.map((movie) => {
            return GENRE_NAME[movie.genre_ids[0]];
        })

        temp = new Set(temp);
        setGenres(["All Genres", ...temp]);
    }, [watchList]);

    function handleSearch(e){
        setSearch(e.target.value);
    }

    function handleIncrease(){
        const sorted =  watchList.sort((movieA, movieB) => {
            return movieA.vote_average - movieB.vote_average;
        })

        setWatchList([...sorted]);
    }

    function handleDecrease(){
        const sorted = watchList.sort((movieA, movieB) => {
            return movieB.vote_average - movieA.vote_average;
        })

        setWatchList([...sorted]);
    }

    function handleIncPopularity(){
        const sorted =  watchList.sort((movieA, movieB) => {
            return movieA.popularity - movieB.popularity;
        })

        setWatchList([...sorted]);
    }

    function handleDecPopularity(){
        const sorted = watchList.sort((movieA, movieB) => {
            return movieB.popularity - movieA.popularity;
        })

        setWatchList([...sorted]);
    }

    return (
        <>
            <div className="flex flex-wrap mx-24 justify-around items-center justify-between mt-11">

                {
                    genres.map((genre) => {
                        return <div onClick={handleFilter} className={`p-3 hover:cursor-pointer px-9 rounded-xl text-white ${filteredMovies === genre ? 'bg-blue-400' : 'bg-gray-400'}`}>{genre}</div>
                    })

                }
            </div>

            <div className="flex justify-center items-center mt-9">
                <div>
                    <input onChange={handleSearch} value={search} className="bg-gray-200 text-lg outline-none p-4 w-[18rem] py-2.5" type="text" placeholder="Search for Movies"></input>
                </div>
            </div>

            <div className="border shadow-md rounded-lg m-8 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 text-gray-900 text-center border-b-2">
                        <tr>
                            <th>Name</th>
                            <th>
                                <div className="p-2">
                                    <i onClick={handleIncrease} className="fa-solid fa-up-long text-xl hover:cursor-pointer"></i>
                                    <span className="mx-2">Ratings</span>
                                    <i onClick={handleDecrease} className="fa-solid fa-down-long text-xl hover:cursor-pointer"></i>
                                </div>
                            </th>
                            <th>
                                <div className="p-2">
                                    <i onClick={handleIncPopularity} className="fa-solid fa-up-long text-xl hover:cursor-pointer"></i>
                                    <span className="mx-2">Popularity</span>
                                    <i onClick={handleDecPopularity} className="fa-solid fa-down-long text-xl hover:cursor-pointer"></i>
                                </div>
                            </th>
                            <th>Genre</th>
                            <th className="text-red-500">Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {                        
                            watchList.filter((movieObj) => {
                                if(GENRE_NAME[movieObj.genre_ids[0]].includes(filteredMovies)){
                                    return movieObj;
                                } else if(filteredMovies === 'All Genres') {
                                    return movieObj;
                                }
                            })
                            .filter((movieObj) => {
                                return movieObj.title.toLowerCase().includes(search.toLowerCase())
                            })
                            .map((movieObj) => {
                                return <tr className="border-b-2 text-center">
                                            <td>
                                                <div className="flex items-center p-4">
                                                    <img className="h-28 w-36 px-3" src={"https://image.tmdb.org/t/p/original" + movieObj.poster_path} alt="movie-poster" />
                                                    <span>{movieObj.title}</span>
                                                </div>
                                            </td>

                                            <td>{movieObj.vote_average}</td>
                                            <td>{movieObj.popularity}</td>
                                            <td>{GENRE_NAME[movieObj.genre_ids[0]]}</td>
                                            <td>
                                            <i onClick={() => {handleRemoveWatchList(movieObj)}} className="fa-solid fa-trash text-lg text-red-800 hover:cursor-pointer"></i>
                                            </td>
                                        </tr>
                                
                            })
                        }
                    </tbody>
                </table>
            </div>
        
        </>
    )
}