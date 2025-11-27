import { useState } from 'react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchTerm);
  };

  return (
    <div className="App">
      <h1>Recipe Finder</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="recipes">
        {recipes.length === 0 ? (
          <p>No recipes found. Try searching for something!</p>
        ) : (
          recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <h2>{recipe.title}</h2>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
