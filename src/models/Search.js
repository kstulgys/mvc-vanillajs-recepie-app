export default class Search {
  constructor(query) {
    this.query = query
    this.proxy = 'https://cors-anywhere.herokuapp.com/'
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
      // console.log(this.results)
      // const promisses = results.map(({ id }) => {
      //   return fetch(
      //     `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`,
      //     { headers: this.headers }
      //   ).then(res => res.json())
      // })
      // await Promise.all(promisses).then(recipes => {
      //   this.results = recipes.map(recipe => {
      //     return {
      //       image: recipe.image,
      //       id: recipe.id,
      //       instructions: recipe.instructions,
      //       readyInMinutes: recipe.readyInMinutes,
      //       servings: recipe.servings,
      //       title: recipe.title,
      //       extendedIngredients: recipe.extendedIngredients
      //     }
      //   })
      // })
      // clean up, not really needed but may help to know if there is a pending request
    } catch (e) {
      console.log(e.message, 'something is wrong :(')
    }
  }
}

// make the aborter accessible
// cancel pending request if any
// if (this.aborter) this.aborter.abort()

// const edamam_ID = 'e7849e8e'
// const edamam_KEY = 'd2c3e26378ca90e6c49ee71233f93871'
// const proxyUrl = 'https://cors-anywhere.herokuapp.com/',
//   targetUrl = `https://api.edamam.com/search?q=${
//     this.query

//     async getRecipes() {
//     //   }&app_id=${edamam_ID}&app_key=${edamam_KEY}&from=0&to=30&calories=500-1000&health=alcohol-free`
// const SPURL =
//     // make our request cancellable
//     // this.aborter = new AbortController()
//     // const signal = this.aborter.signal

//     try {
//       const res = await fetch(proxyUrl + targetUrl, { signal })
//         .then(res => res.json())
//         .then(r => {
//           this.aborter = null
//           console.log(`${this.query}`, 'succeeded :)')
//           return r
//         })
//       // console.log(res)
//       this.results = res.hits
// console.log()
//       // clean up, not really needed but may help to know if there is a pending request
//     } catch (e) {
//       console.error(
//         `${this.query} from Search Class has Failed`,
//         e.name,
//         e.message
//       )
//       // alert('Hold on, you are clicking around too often! Take it easy :)')
//     }
//   }
// }

// has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled
