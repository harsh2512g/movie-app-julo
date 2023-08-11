// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';
import MovieListPage from './pages/MovieListPage';
import MovieDetailPage from './pages/MovieDetailPage';
import MyListPage from './pages/MyListPage';
import GlobalStyles from './GlobalStyles';

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyles/>
      <MovieProvider>
        <Routes>
      
          <Route path="/" element={<MovieListPage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/my-list" element={<MyListPage />} />
        </Routes>
      </MovieProvider>
    </Router>
  );
};

export default App;
