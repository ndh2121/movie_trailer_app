import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import YouTube from "react-youtube";
import logo from '../src/assets/images/unnamed.png'

import MovieCard from "./components/MovieCard/MovieCard";

function App() {
   const IMAGE_PATH_w500 = "https://image.tmdb.org/t/p/w500/";
   const IMAGE_PATH_original = "https://image.tmdb.org/t/p/original/";
   const API_KEY = "https://api.themoviedb.org/3";
   const REACT_APP_MOVIE_API_KEY = "447298da4624b605981fcafd21119aca";

   const [movies, setMovies] = useState([]);
   const [inputSearch, setInputSearch] = useState("");
   const [selectedMovie, setSelectedMovie] = useState({});
   const [playTrailer, setPlayTrailer] = useState(false);

   const fetchMovies = async (inputSearch) => {
      const type = inputSearch ? "search" : "discover";
      const { data } = await axios.get(`${API_KEY}/${type}/movie`, {
         params: {
            api_key: REACT_APP_MOVIE_API_KEY,
            query: inputSearch,
         },
      });
      setMovies(data.results);
      await selectMovie(data.results[0]);
   };
   const fetchMovie = async (id) => {
      const { data } = await axios.get(`${API_KEY}/movie/${id}`, 
      {
         params: {
            api_key: REACT_APP_MOVIE_API_KEY,
            append_to_response: "videos",
         },
      });
      return data;
   };

   useEffect(() => {
      fetchMovies();
   }, []);

   const selectMovie = async (movie) => {
      const data = await fetchMovie(movie.id);
      setSelectedMovie(data);
      setPlayTrailer(false);
   };
   const renderMovies = () => {
      return movies.map((movie) => (
         <MovieCard key={movie.id} movie={movie} selectedMovie={selectMovie}></MovieCard>
      ));
   };
   const searchMovies = (e) => {
      e.preventDefault();
      fetchMovies(inputSearch);
   };
   
   const renderTrailer = () => {
      const trailer = selectedMovie.videos.results.find((video) => {
         return video.name === "Official Trailer" || video.name === "Teaser Trailer" || video.name.includes("Official");
      });
      return (
         <YouTube
            videoId={trailer.key}
            className={"youtube_container"}
            opts={{
               width: "100%",
               height: "100%",
               playerVars: {
                  autoplay: 1,
               },
            }}
         />
      );
   };

   //window scroll
   window.addEventListener("scroll", function () {
      let header = document.querySelector(".header");
      header.classList.toggle("sticky", window.scrollY > 250);
   });

   document.addEventListener('keydown', (e) => {if (e.key === 'Escape') {
      setPlayTrailer(false)
   }});

   return (
      <div className="App">
         <header className="header">
            <div className="logo">
               <img src={logo} alt="photo" />
            </div>
            {/* Input search Movie */}
            <form className="search" onSubmit={searchMovies}>
               <input
                  type="text"
                  placeholder="Search..."
                  onChange={(e) => setInputSearch(e.target.value)}
               />
               <button>Search</button>
            </form>
         </header>

         <section
            className="hero"
            style={
               {
               backgroundImage: `linear-gradient(0deg,rgba(0,0,0,0.4),rgba(0,0,0,0.4)),
                                 url(${IMAGE_PATH_original}${selectedMovie.backdrop_path ? selectedMovie.backdrop_path: selectedMovie.poster_path})`,
            }}
         >
            <div className="hero_content max_center">
               {playTrailer ? 
               <button className="btn_primary btn_close" onClick={()=>{setPlayTrailer(false)}}>
                  <i className="fa-solid fa-xmark btn_play"></i>
                  Close</button> : null}
               {selectedMovie.videos && playTrailer ? renderTrailer() : null}
               <button
                  className="btn_primary "
                  onClick={() => {
                     setPlayTrailer(true);
                  }}
               >
                  <i className="fa-solid fa-play btn_play"></i>
                  Play Trailer
               </button>
               <h1 className="hero_title">{selectedMovie.title}</h1>
               <p className="hero_desc">{selectedMovie.overview ? selectedMovie.overview : null}</p>
            </div>
         </section>
         <div className="container_poster">
            <div>
               <div className="wrapper_poster">
                  {renderMovies()}
               </div>
            </div>
         </div>
      </div>
   );
}

export default App;
