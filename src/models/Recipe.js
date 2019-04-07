export default class Recipe {
  constructor(id) {
    this.id = id
  }

  async getRecipe() {
    const proxy = 'http://cors-anywhere.herokuapp.com/'
    const edamam_ID = 'e7849e8e'
    const edamam_KEY = 'd2c3e26378ca90e6c49ee71233f93871'

    const url = `${proxy}https://api.edamam.com/search?r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_${
      this.id
    }&app_id=${edamam_ID}&app_key=${edamam_KEY}`

    try {
      const [recipe = {}] = await fetch(url).then(res => res.json())
      this.label = recipe.label
      this.image = recipe.image
      this.ingredientLines = recipe.ingredientLines
      this.ingredients = recipe.ingredients
      this.url = recipe.url
      this.servings = recipe.yield

      this.cookingTime = this.getCookingTime(this.ingredients.length)
    } catch (e) {
      console.log(e)
      alert('Something went wrong :(')
    }
  }

  getCookingTime(ingNum) {
    return Math.round((ingNum / 3) * 15)
  }
}
