// App.tsx
import React ,{lazy,Suspense} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';

import GlobalStyles from './GlobalStyles';

const MovieListPage = lazy(() => import('./pages/MovieListPage'));
const MovieDetailPage = lazy(() => import('./pages/MovieDetailPage'));
const MyListPage = lazy(() => import('./pages/MyListPage'));

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyles/>
      <MovieProvider>
        <Suspense fallback={<div>Loading...</div>}>
        <Routes>
      
          <Route path="/" element={<MovieListPage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/my-list" element={<MyListPage />} />
        </Routes>
        </Suspense>
      </MovieProvider>
    </Router>
  );
};

export default App;
