// import SlimSelect from "slim-select";
// import Notiflix from 'notiflix';
// import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

// const breedSelect = document.querySelector(".breed-select");
// const loader = document.querySelector(".loader");
// const catInfo = document.querySelector(".cat-info");
// const error = document.querySelector(".error");

// fetchBreeds()
//   .then(breeds => {
//     breeds.forEach(breed => {
//       const option = document.createElement("option");
//       option.value = breed.id;
//       option.textContent = breed.name;
//       breedSelect.appendChild(option);
//     });

//     // SlimSelect
//     new SlimSelect(".breed-select", {
//       placeholder: "Select a breed",
    
//     });
    

//     loader.style.display = "none";
//     breedSelect.style.display = "block";
//   })
//   .catch(err => {
//      loader.style.display = "none";
//      Notiflix.Report.failure(
//      "Error",
//      "Oops! Something went wrong. Please try again later.",
//      "OK"
//   );
// });
 
// breedSelect.addEventListener("change", () => {
//   loader.style.display = "block";
//   catInfo.style.display = "none";
//   const selectedBreedId = breedSelect.value;
//   fetchCatByBreed(selectedBreedId)
//     .then(catData => {
//       const cat = catData[0];
//       const imageUrl = cat.url;
//       const breedName = cat.breeds[0].name;
//       const description = cat.breeds[0].description;
//       const temperament = cat.breeds[0].temperament;

//       catInfo.innerHTML = `
//         <img class="pic" src="${imageUrl}" alt="${breedName}" />
//         <div class="info">
//         <h2>${breedName}</h2>
//         <p>${description}</p>
//         <p><strong>Temperament:</strong> ${temperament}</p>
//         </div>
//       `;

//       loader.style.display = "none";
//       catInfo.style.display = "flex";
//     })
//    .catch(err => {
//      loader.style.display = "none";
//      Notiflix.Report.failure(
//      "Error",
//      "Oops! Something went wrong. Please try again later.",
//      "OK"
//   );
// });
// });

import SlimSelect from "slim-select";
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

const breedSelect = document.querySelector(".breed-select");
const catInfo = document.querySelector(".cat-info");
const loader = document.querySelector(".loader");

function showLoader() {
  loader.style.display = "block";
  catInfo.style.display = "none";
  breedSelect.style.display = "none";
}

function hideLoader() {
  loader.style.display = "none";
  breedSelect.style.display = "block";
}

fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });

    // Ініціалізуємо SlimSelect
    new SlimSelect(".breed-select", {
      placeholder: "Select a breed", 
    });

    hideLoader(); // Приховуємо завантажувач після завантаження порід
  })
  .catch(err => {
    hideLoader(); // Приховуємо завантажувач у разі помилки
    Notiflix.Report.failure(
      "Error",
      "Oops! Something went wrong. Please try again later.",
      "OK"
    );
  });

breedSelect.addEventListener("change", () => {
  showLoader(); // Показуємо завантажувач при виборі породи
  catInfo.style.display = "none";
  const selectedBreedId = breedSelect.value;
  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      const cat = catData[0];
      const imageUrl = cat.url;
      const breedName = cat.breeds[0].name;
      const description = cat.breeds[0].description;
      const temperament = cat.breeds[0].temperament;

      catInfo.innerHTML = `
        <img class="pic" src="${imageUrl}" alt="${breedName}" />
        <div class="info">
        <h2>${breedName}</h2>
        <p>${description}</p>
        <p><strong>Temperament:</strong> ${temperament}</p>
        </div>
      `;

      hideLoader(); // Приховуємо завантажувач після отримання інформації про кота
      catInfo.style.display = "flex";
    })
    .catch(err => {
      hideLoader(); // Приховуємо завантажувач у разі помилки
      Notiflix.Report.failure(
        "Error",
        "Oops! Something went wrong. Please try again later.",
        "OK"
      );
    });
});
