import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {

  const APP_ID = '1af8516d';
  const APP_KEY='b0cb1029f21aa265263b0ea62f6826ca';
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');



  useEffect(() => {
    getRecipes();
  }, [query]);

  
  
  
  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  }




  const updateSearch = e => {
    setSearch(e.target.value);
  }


  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input type="text" className="search-bar" value={search} onChange={updateSearch}/>
        <button type="submit" className='search-button'>Search</button>
      </form>
      <div className="recipes">
            {recipes.map(recipe => (
              <Recipe
                key={recipe.recipe.label}
                title={recipe.recipe.label}
                ingredients={recipe.recipe.ingredients}
                calories={recipe.recipe.calories}
                image={recipe.recipe.image}  />
            ))}
      </div>
    </div>
    );
}

export default App;