import '../public/style.css';

// eslint-disable-next-line @typescript-eslint/no-inferrable-types
const endpoint: any = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

// eslint-disable-next-line prefer-const
const cities: any = [];

// eslint-disable-next-line no-inner-declarations
function findMatches(wordToMatch, cities) {
    // eslint-disable-next-line array-callback-return
    return cities.filter(place => {
        // here we need to figure out if the city or state matches what was searched
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex)
      })
  }
  
try {
    fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data))
  .then(() => findMatches('bos', cities))
} catch (error) {
    console.log(error)
}
  console.log(cities)

const searchInput = document.querySelector('.search') as HTMLInputElement
const suggestions = document.querySelector('.suggestions') as HTMLInputElement

/**
 * Replace all non-digit characters (except the first one) with a comma.
 * @param x - The number you want to format.
 * @returns the value of x with commas inserted in the appropriate places.
 */
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  // this will be called whenever someone changes the values in the input
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function displayMatches(this: any): any {
    const matchArray = findMatches(this.value, cities)
   
    const html = matchArray.map(place => {
         // highlight text that matches & inject the regex below
    const regex = new RegExp(this.value, 'gi')
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`)
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`)

    return `<li>
                <span>${cityName}, ${stateName}</span>
                <span class="population">${numberWithCommas(place.population)}</span>
            </li>
            ` 
})

        suggestions.innerHTML = html.join('')
  }

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);