export default class Search {
  constructor(query) {
    this.query = query
    this.proxy = `https://cors-anywhere.herokuapp.com/`
    this.url = `${
      this.proxy
    }https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?number=30&offset=0&query=${
      this.query
    }`
    this.headers = {
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.API_KEY
    }
  }

  async getRecipes() {
    try {
      const { results = [] } = await fetch(this.url, {
        headers: this.headers
      }).then(res => res.json())

      this.results = results.map(recipe => {
        let image = `https://spoonacular.com/recipeImages/${recipe.image}`
        if (!image.includes('.jpg')) {
          image += '.jpg'
        }
        return { ...recipe, image }
      })
    } catch (e) {
      console.log(e.message)
    }
  }
}
