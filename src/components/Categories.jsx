import React from 'react';
import Category from './Category';
import '../styles/nav.css';


export default function Categories({ categories, onCategoryClick }) {
    return (
      <nav className='nav-container'>
        {
          categories.map(({ category, count }) => (
            <Category 
              category={category} 
              count={count} 
              key={category}
              onClick={() => onCategoryClick(category)}
            />
          ))
        }
      </nav>
    );
  }