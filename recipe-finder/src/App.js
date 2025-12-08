import { useState } from 'react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const API_KEY = process.env.REACT_APP_API_KEY;

  const fetchRecipes = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&apiKey=${API_KEY}`
      );
      const data = await response.json();
      setRecipes(data.results);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      alert("Failed to fetch recipes. Please try again later.");
    }
  }

  const fetchRandomRecipes = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/random?number=12&apiKey=${API_KEY}`
      );
      const data = await response.json();
      setRecipes(data.recipes);
    } catch (error) {
      console.error("Error fetching random recipes:", error);
      alert("Failed to fetch random recipes. Please try again later.");
    }
  }

  const fetchRecipeDetails = async (id) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      );
      const data = await response.json();
      setSelectedRecipe(data);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
      alert("Failed to fetch recipe details. Please try again later.");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchTerm);
    if (searchTerm) {
      fetchRecipes();
    }
  };

  const handleRecipeClick = (id) => {
    fetchRecipeDetails(id);
  };

  const closeModal = () => {
    setSelectedRecipe(null);
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
        <button type="button" onClick={fetchRandomRecipes}>Get Random Recipes</button>
      </form>

      <div className="recipes">
        {recipes.length === 0 ? (
          <p>No recipes found. Try searching for something!</p>
        ) : (
          recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card" onClick={() => handleRecipeClick(recipe.id)}>
              <img src={recipe.image} alt={recipe.title} />
              <h2>{recipe.title}</h2>
            </div>
          ))
        )}
      </div>
      {selectedRecipe && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>×</button>
            <h2>{selectedRecipe.title}</h2>
            <img src={selectedRecipe.image} alt={selectedRecipe.title} />
            
            <div className="recipe-details">
              <h3>Ingredients:</h3>
              <ul>
                {selectedRecipe.extendedIngredients.map((ingredient, index) => (
                  <li key={index}>{ingredient.original}</li>
                ))}
              </ul>

              {selectedRecipe.instructions && (
                <div>
                  <h3>Instructions:</h3>
                  <div dangerouslySetInnerHTML={{__html: selectedRecipe.instructions}} />
                </div>
              )}

              <div className="recipe-info">
                <p><strong>Ready in:</strong> {selectedRecipe.readyInMinutes} minutes</p>
                <p><strong>Servings:</strong> {selectedRecipe.servings}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
