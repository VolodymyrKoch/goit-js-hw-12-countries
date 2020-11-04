export default function fetchCountries(searchQuery) { 
  return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then((data) => {
      console.dir(data);
      if (data.status===404) {throw new Error }
      return data.json()
    })
   

}