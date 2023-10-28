import React from "react";

const MovieCard = ({ movie, selectedMovie }) => {
   const IMG_PATH = "https://image.tmdb.org/t/p/w500";

   const handler_movie_card = () => {
      selectedMovie(movie);
      window.scrollTo({
         top: 0,
         behavior: 'smooth'
      });
   }

   return (
      <div className="poster" onClick={handler_movie_card}>
         {movie.poster_path ? 
         (
            <img src={`${IMG_PATH}${movie.poster_path}`} alt="photo" />
         ) : (
            <div className="no-image">No Image</div>
         )
         }
         <h4 className="poster_title">{movie.title}</h4>
      </div>
   );
};

export default MovieCard;
