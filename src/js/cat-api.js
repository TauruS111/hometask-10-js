  import axios from "axios";
   axios.defaults.headers.common["x-api-key"] = "live_0vHywqTPVEiLixESAMQlBeY08replIjNA0SxQTK0Tjf50Qm7T5DgM1fCQ580hoF5";

export function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds")
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}