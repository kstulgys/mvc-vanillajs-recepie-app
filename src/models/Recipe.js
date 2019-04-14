export default class Recipe {
  constructor(id) {
    this.id = id
    this.proxy = 'https://cors-anywhere.herokuapp.com/'
    this.url = `${
      this.proxy
    }https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${
      this.id
    }/information`
    this.headers = {
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.API_KEY
    }
  }

  async getRecipe() {
    try {
      const recipe = await fetch(this.url, {
        headers: this.headers
      }).then(res => res.json())
      this.servings = recipe.servings
      this.image = recipe.image
      this.id = recipe.id
      this.instructions = recipe.instructions
      this.readyInMinutes = recipe.readyInMinutes
      this.title = recipe.title
      this.ingredients = recipe.extendedIngredients

      // console.log('recipe class recipe', this.recipe)
    } catch (e) {
      console.log('recipe class error', e.message)
    }
  }

  // _formatIngredients(list, servings) {
  //   return list.map(ing => {
  //     return {
  //       id: ing.id,
  //       amount: Math.round(ing.amount / servings),
  //       name: ing.originalName,
  //       unit: ing.unit
  //     }
  //   })
  // }

  // updateServings(type) {
  //   const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1
  //   this.ingredients.forEach(ing => {
  //     console.log('before', ing.amount)
  //     ing.amount = Math.round((ing.amount * newServings) / this.servings)
  //     console.log('after', ing.amount)

  //     this.servings = newServings
  //   })
  // }

  updateServings(type) {
    const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1
    this.ingredients = this.ingredients.map(ing => {
      const amount = Math.round((ing.amount * newServings) / this.servings)
      return { ...ing, amount }
    })

    this.servings = newServings
  }
}
