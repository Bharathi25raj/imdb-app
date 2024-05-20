import { useContext } from "react";
import { MovieContext } from "./MovieContext";


export default function MovieCard(props){

    const {watchList, handleAddWatchList, handleRemoveWatchList} = useContext(MovieContext);

    const {movieObj, poster, title} = props;

    function isContain(movieObj){
        for(let i = 0; i < watchList.length; i++){
            if(movieObj.id === watchList[i].id){
                return true;
            }
        }

        return false;
    }

    return (
        <>
            <div className="flex flex-col justify-between hover:scale-110 transition-transform items-end rounded-xl h-72 w-52 mb-3.5 mx-px bg-cover bg-no-repeat"
                      style={{backgroundImage:`url(https://image.tmdb.org/t/p/original${poster})`}}>

                        {
                            isContain(movieObj) ? <div onClick={() => {handleRemoveWatchList(movieObj)}} className="text-xl bg-zinc-900/50 p-0.5 m-1 rounded-lg cursor-pointer">&#10060;</div> : 
                            <div onClick={() => {handleAddWatchList(movieObj)}} className="text-xl bg-zinc-900/50 p-0.5 m-1 rounded-lg cursor-pointer">&#128525;</div>
                        }
            
                <div className="text-xl text-white rounded-bl-xl rounded-br-xl py-2 bg-zinc-900/50 w-full text-center">{title}</div>
            </div>
        </>
    )
}