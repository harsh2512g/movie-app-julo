import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useMovieContext } from '../context/MovieContext';
import styled from '@emotion/styled';
import { css } from '@emotion/css'
import _ from 'lodash';
import Skeleton from '../components/Skeleton';

const StyledMovieApp = styled.div`
  background-color: #111;
  color: #fff;

  font-family: 'Helvetica Neue', sans-serif;
`;

const StyledMovieListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  
`;

const StyledMovieCard = styled.div`
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const StyledMoviePoster = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
`;

const StyledMyListLink = styled(Link)`
  color: #fff;
  background-color: #e50914;
  padding: 10px 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  display: inline-block;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease-in-out;
  text-align:right;
  &:hover {
    background-color: #b50710;
  }
`;

const StyledMovieLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
const StyledHeading = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  color: #e50914;
  font-family: 'Helvetica Neue', sans-serif;
  font-weight: bold;
  text-align:center;
  margin-top:0px ;
`;

const StyledSubtitle = styled.h2`
  font-size: 1.5rem;
  text-align:center;
 
  font-weight: bold;
  margin-bottom: 40px;
`;
const MovieListPage: React.FC = () => {
  const { movies, setMovies } = useMovieContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages,setTotalPages]=useState(1);
  
console.log({totalPages,isLoading,currentPage})
  console.log(window.innerHeight,window.scrollY,document.body.offsetHeight)
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 && !isLoading &&
      currentPage < totalPages
    ) {
      
      setCurrentPage(prevPage => prevPage + 1);
      setIsLoading(true);
    }
  };

  
  const debouncedScrollHandler = _.debounce(handleScroll, 200);

useEffect(() => {
  window.addEventListener('scroll', debouncedScrollHandler);
  return () => {
    window.removeEventListener('scroll', debouncedScrollHandler);
  };
}, [isLoading, currentPage, totalPages]);


  const apiPageCalled:any =[];
  const fetchData = async (page:number) => {

    setIsLoading(true);
    if(!apiPageCalled.includes(page)){
        apiPageCalled.push(page);
        const apiKey = 'f6ad01a4';
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=${apiKey}&s=avengers&page=${page}`
        );
        
            setMovies(prevMovies => [...prevMovies, ...response.data.Search]);
            setTotalPages(response.data.totalResults/10)
    }
   
      
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData(currentPage); 
  }, [currentPage]);


const renderMovieCards = () => {
    if (isLoading) {

      return Array.from({ length: 10 }).map((_, index) => (
        <div className={css`width:262px;height:494px`} key={index}>
          <Skeleton />
        </div>
      ));
    }

    return movies.map((movie) => (
  
      
        <StyledMovieLink to={`/movie/${movie.imdbID}`} key={movie.imdbID}>
          <StyledMovieCard>
            <StyledMoviePoster src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <p>{movie.Type}</p>
            <p>{movie.Year}</p>
          </StyledMovieCard>
        </StyledMovieLink>

    ));
  };
  
  return (
    <>
    <StyledMovieApp>
          <StyledHeading>Movie App</StyledHeading>
      <StyledSubtitle>Discover and Enjoy Movies</StyledSubtitle>
      <div className={css`text-align:right; margin-right:20px`}>
    <StyledMyListLink to={`/my-list`}>My List</StyledMyListLink>
    </div>
    <StyledMovieListContainer>
      
    {renderMovieCards()}
      
    </StyledMovieListContainer>
    
    </StyledMovieApp>
    </>
  );
};

export default MovieListPage;
