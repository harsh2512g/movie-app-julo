import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';
import styled from '@emotion/styled';

const StyledMyList = styled.div`
  background-color: #000;
  color: #fff;
  min-height: 100vh;
  padding: 20px;
  font-family: 'Helvetica Neue', sans-serif;
`;

const StyledEmptyList = styled.p`
  font-size: 1.5rem;
  text-align: center;
`;

const StyledMovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
`;

const StyledMovieCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const StyledMoviePoster = styled.img`
  max-width: 200px;
  height: auto;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
`;

const StyledMovieTitle = styled.h3`
  font-size: 1.5rem;
  margin-top: 10px;
  margin-bottom: 5px;
`;

const StyledMovieInfo = styled.p`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

const StyledRemoveButton = styled.button`
  background-color: #e50914;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #b50710;
  }
`;
const StyledHeading = styled.h1`
  font-size: 3rem;
  margin-bottom: 60px;

  color: #e50914;
  font-family: 'Helvetica Neue', sans-serif;
  font-weight: bold;
  text-align:center;
`;

const MyListPage: React.FC = () => {
  const { myList, setMyList } = useMovieContext();

  const removeFromMyList = (id: string) => {
    const updatedList = myList.filter(movie => movie.imdbID !== id);
    setMyList(updatedList);
  };

  return (
    <StyledMyList>
      {myList.length === 0 ? (
        <StyledEmptyList>Your list is empty.</StyledEmptyList>
      ) : (
        <> <StyledHeading>My List</StyledHeading>
        <StyledMovieGrid>
           
          {myList.map(movie => (
            <StyledMovieCard key={movie.imdbID}>
              <Link to={`/movie/${movie.imdbID}`}>
                <StyledMoviePoster src={movie.Poster} alt={movie.Title} />
                <StyledMovieTitle>{movie.Title}</StyledMovieTitle>
                <StyledMovieInfo>Type: {movie.Type}</StyledMovieInfo>
                <StyledMovieInfo>Year: {movie.Year}</StyledMovieInfo>
              </Link>
              <StyledRemoveButton onClick={() => removeFromMyList(movie.imdbID)}>
                Remove from My List
              </StyledRemoveButton>
            </StyledMovieCard>
          ))}
        </StyledMovieGrid>
        </>
      )}
    </StyledMyList>
  );
};

export default MyListPage;
