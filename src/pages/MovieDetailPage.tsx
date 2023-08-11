// MovieDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';
import axios from 'axios';
import styled from '@emotion/styled';

const StyledMovieDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #111;
  color: #fff;
`;

const StyledMovieImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
`;

const StyledMovieInfo = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const StyledMovieTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const StyledMovieText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

const StyledButton = styled.button`
  background-color: #e50914;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
    margin-top:20px;
  &:hover {
    background-color: #b50710;
  }
`;

const StyledBackLink = styled(Link)`
  color: #e50914;
  text-decoration: none;

  margin-left:20px;
`;
const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { movies, myList, setMyList } = useMovieContext();
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    const selectedMovie = movies.find((m) => m.imdbID === id);
    if (selectedMovie) {
      setMovie(selectedMovie);
    } else {
      // Fetch movie details from API if not available in the context
      const fetchData = async () => {
        const apiKey = 'f6ad01a4';
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`
        );
        setMovie(response.data);
      };
      fetchData();
    }
  }, [movies, id]);

  const isMovieInMyList = myList.some((m) => m.imdbID === id);

  const addToMyList = () => {
    if (movie && !isMovieInMyList) {
      setMyList([...myList, movie]);
    }
  };

  const removeFromMyList = () => {
    if (movie && isMovieInMyList) {
      const updatedList = myList.filter((m) => m.imdbID !== id);
      setMyList(updatedList);
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <StyledMovieDetail>
      <StyledMovieImage src={movie.Poster} alt={movie.Title} />
      <StyledMovieInfo>
        <StyledMovieTitle>{movie.Title}</StyledMovieTitle>
        <StyledMovieText>Type: {movie.Type}</StyledMovieText>
        <StyledMovieText>Year: {movie.Year}</StyledMovieText>
        {/* Display other important information */}
        {isMovieInMyList ? (
          <StyledButton onClick={removeFromMyList}>Remove from My List</StyledButton>
        ) : (
          <StyledButton onClick={addToMyList}>Add to My List</StyledButton>
        )}
         <StyledBackLink to="/">Back to Movie List</StyledBackLink>
      </StyledMovieInfo>
    </StyledMovieDetail>
  );
};

export default MovieDetailPage;
