// MovieContext.tsx
import React, { useEffect,createContext, useState, useContext, ReactNode } from 'react';

interface Movie {
  imdbID: string;
  Title: string;
  Type: string;
  Year: string;
  Poster: string;
}

interface MovieContextType {
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
  myList: Movie[];
  setMyList: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [myList, setMyList] = useState<Movie[]>([]);
  useEffect(() => {
    // Load data from local storage on context initialization
    const storedList = localStorage.getItem('myList');
    if (storedList) {
      setMyList(JSON.parse(storedList));
    }
  }, []);
  useEffect(() => {
    // Store data in local storage whenever myList changes
    if(myList.length>0){
    localStorage.setItem('myList', JSON.stringify(myList));
    }
  }, [myList]);
console.log({myList})
  return (
    <MovieContext.Provider value={{ movies, setMovies, myList, setMyList }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = (): MovieContextType => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
};
