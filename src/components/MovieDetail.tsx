// MovieDetail.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';

interface Movie {
  imdbID: string;
  Title: string;
  Type: string;
  Year: string;
  Poster: string;
}

interface MovieDetailProps {
  movie: Movie;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movie }) => {
  const { myList, setMyList } = useMovieContext();
  const [isInMyList, setIsInMyList] = useState(myList.some(item => item.imdbID === movie.imdbID));

  const handleAddToMyList = () => {
    if (!isInMyList) {
      setMyList([...myList, movie]);
      setIsInMyList(true);
    }
  };

  const handleRemoveFromMyList = () => {
    const updatedList = myList.filter(item => item.imdbID !== movie.imdbID);
    setMyList(updatedList);
    setIsInMyList(false);
  };

  return (
    <div className="movie-detail">
      <img src={movie.Poster} alt={movie.Title} />
      <h2>{movie.Title}</h2>
      <p>{movie.Type}</p>
      <p>{movie.Year}</p>
      {isInMyList ? (
        <button onClick={handleRemoveFromMyList}>Remove from My List</button>
      ) : (
        <button onClick={handleAddToMyList}>Add to My List</button>
      )}
      <Link to="/">Back to Movie List</Link>
    </div>
  );
};

export default MovieDetail;
