export default class Search {
  constructor(query) {
    this.query = query
    // this.controller = new AbortController()
    // this.signal = this.controller.signal
    this.aborter = null
  }

  // aborter = null; // make the aborter accessible
  // function getData(param) {
  //   // cancel pending request if any
  //   if(aborter) aborter.abort();
  //   // make our request cancellable
  //   aborter = new AbortController();
  //   const signal = aborter.signal;
  //   const url = 'https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png?rand=' + param;
  //   return fetch(url, {signal})
  //   // clean up, not really needed but may help to know if there is a pending request
  //   .then(r => {aborter = null; return r;})
  // }
  // // first request will get aborted
  // getData("foo")
  //   .then(r => console.log('foo done'))
  //   .catch(e => console.error('foo failed', e.name, e.message));
  // // will abort the previous one
  // getData("bar")
  //   .then(r =>  console.log('bar done'))
  //   .catch(e => console.error('bar failed', e.name, e.message))

  async getRecipes() {
    // make the aborter accessible
    // cancel pending request if any
    if (this.aborter) this.aborter.abort()

    const edamam_ID = 'e7849e8e'
    const edamam_KEY = 'd2c3e26378ca90e6c49ee71233f93871'
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/',
      targetUrl = `https://api.edamam.com/search?q=${
        this.query
      }&app_id=${edamam_ID}&app_key=${edamam_KEY}&from=0&to=30&calories=500-1000&health=alcohol-free`

    // make our request cancellable
    this.aborter = new AbortController()
    const signal = this.aborter.signal

    try {
      const res = await fetch(proxyUrl + targetUrl, { signal })
        .then(res => res.json())
        .then(r => {
          this.aborter = null
          console.log(`${this.query}`, 'succeeded :)')
          return r
        })
      // console.log(res)
      this.results = res.hits

      // clean up, not really needed but may help to know if there is a pending request
    } catch (e) {
      console.error(
        `${this.query} from Search Class has Failed`,
        e.name,
        e.message
      )
      // alert('Hold on, you are clicking around too often! Take it easy :)')
    }
  }
}

// has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled
