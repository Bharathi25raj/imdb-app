import Banner from "./Banner";
import React from "react";
import TrendingMovies from "./TrendingMovies";


export default function Home(){
    return (
       <>
        {/* <NavBar /> */}
        <Banner />
        <TrendingMovies/>
       </>
    )
}