export default class Recipe {
  constructor(id) {
    this.id = id
    this.aborter = null
  }

  async getRecipe() {
    // make the aborter accessible
    // cancel pending request if any
    if (this.aborter) this.aborter.abort()

    const edamam_ID = 'e7849e8e'
    const edamam_KEY = 'd2c3e26378ca90e6c49ee71233f93871'
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/',
      targetUrl = `https://api.edamam.com/search?r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_${
        this.id
      }&app_id=${edamam_ID}&app_key=${edamam_KEY}`

    // make our request cancellable
    this.aborter = new AbortController()
    const signal = this.aborter.signal

    try {
      const recipe = await fetch(proxyUrl + targetUrl, { signal })
        .then(res => res.json())
        .then(r => {
          this.aborter = null
          return r
        })
      this.servings = recipe[0].yield
      this.label = recipe[0].label
      this.image = recipe[0].image
      this.ingredientLines = recipe[0].ingredientLines
      this.ingredients = recipe[0].ingredients.map(ing => {
        const weight = Math.round(ing.weight / this.servings)
        return { ...ing, weight }
      })
      this.url = recipe[0].url
      this.cookingTime = this._getCookingTime(this.ingredients.length)
      this.servings = 1
    } catch (e) {
      // alert('Hold on, you are clicking around too often! Take it easy :)')
      console.log(e.message)
    }
  }

  _getCookingTime(ingNum) {
    return Math.round((ingNum / 3) * 15)
  }

  updateServings(type) {
    const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1
    this.ingredients.forEach(ing => {
      ing.weight = Math.round((ing.weight * newServings) / this.servings)
    })

    this.servings = newServings
  }
}
