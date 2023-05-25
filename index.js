const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Import of the model Recipe from './models/Recipe.model.js'
//const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },

  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
  },

  ingredients: { type: [String] },

  cuisine: { type: String, required: true },

  dishType: {
    type: String,
    enum: [
      "breakfast",
      "main_course",
      "soup",
      "snack",
      "drink",
      "dessert",
      "other",
    ],
  },

  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg",
  },

  duration: { type: Number, min: 0 },

  creator: { type: String },

  created: { type: Date, default: Date.now },
});

// ...

mongoose.connect(MONGODB_URI).then((x) => {
  console.log(`Connected to the database: "${x.connection.name}"`);
  // Before adding any recipes to the database, let's remove all existing ones
  return Recipe.deleteMany();
});
// ...

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;

const firstRecipe = {
  title: "Tijuana Street Fries",
  level: "Easy Peasy",
  ingredients: [
    "chips",
    "tomatoes",
    "avocado",
    "sour cream",
    "garlic",
    "lime",
    "red onion",
  ],
  cuisine: "mexican",
};

Recipe.create(firstRecipe)
  .then((savedRecipe) =>
    console.log("The recipe is saved and its value is: ", savedRecipe)
  )
  .catch((error) =>
    console.log("An error happened while saving a new recipe:", error)
  );

const manyRecipes = require("./data.json");
const recipesToInsert = manyRecipes;

Recipe.insertMany(recipesToInsert)
  .then((insertedRecipes) => {
    console.log("Inserted recipes:", insertedRecipes);
  })
  .catch((error) => {
    console.error("Error inserting recipes:", error);
  });

Recipe.updateOne({ title: " Rigatoni alla Genovese" }, { duration: 100 })
  .then((Recipe) => console.log("The recipe has been updated:", Recipe))
  .catch((error) =>
    console.log("An error occured while updating the recipe:", error)
  );

Recipe.deleteOne({ title: "Carrot Cake" })
  .then((Recipe) => console.log("The recipe has been deleted:", Recipe))
  .catch((error) =>
    console.log("An error occured while deleting the recipe:", error)
  );

mongoose.connection.close()
  .then(() => {
    console.log('Database connection closed');
  })
  .catch((error) => {
    console.error('Error closing database connection:', error);
  }); 
