import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BartenderPage from './pages/bartender/BartenderPage';
import IngredientsPage from './pages/ingredients/IngredientsPage';
import SavedRecipes from './pages/SavedRecipes';
import PopularRecipes from './pages/popular-recipes/PopularRecipes';
import Nav from './components/Nav';

const root = document.getElementById('root');
if (!root) throw new Error('No root element found');

createRoot(root).render(
  <React.StrictMode>
    <Router basename='/SmartSip/'>
      <div className='app-container'>
        <Nav />
        <div className='content-container'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/bartender' element={<BartenderPage />} />
            <Route path='/ingredients' element={<IngredientsPage />} />
            <Route path='/saved-recipes' element={<SavedRecipes />} />
            <Route path='/popular-recipes' element={<PopularRecipes />} />
          </Routes>
        </div>
      </div>
    </Router>
  </React.StrictMode>
);
