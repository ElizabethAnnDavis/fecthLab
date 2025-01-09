import * as Carousel from "./Carousel.js";
//import axios from "axios";

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access.
const API_KEY = "live_ipqpJMz4I1iQlfVsrlqqW9dPyt2v9Xe50rcpUrY1Xh2kAxfHb9b4HkAmFPuTbrcX";

let options = [];

/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */
async function initialLoad() {
  try {
    const response = await fetch("https://api.thecatapi.com/v1/breeds", {
      headers: {
        "x-api-key": API_KEY,
      },
    });
    const data = await response.json();
    //console.log(data[0].description);

    for (let i = 0; i < data.length; i++) {
      //console.log(data[i].name + " " + data[i].id);
      const nextObj = {
        value: data[i].id,
        name: data[i].name,
        description: data[i].description,
      };
      options.push(nextObj);
    }
    //console.log("done");

    for (let i = 0; i < options.length; i++) {
      const option = document.createElement("option");

      option.value = options[i].value;
      option.textContent = options[i].name;
      //console.log(options[i].name + " " + options[i].value);

      breedSelect.appendChild(option);
    }
    //console.log("done");
  } catch (err) {
    console.log(err);
  }
}

initialLoad();

/**
 * 2. Create an event handler for breedSelect that does the following:
 * - Retrieve information on the selected breed from the cat API using fetch().
 *  - Make sure your request is receiving multiple array items!
 *  - Check the API documentation if you're only getting a single object.
 * - For each object in the response array, create a new element for the carousel.
 *  - Append each of these new elements to the carousel.
 * - Use the other data you have been given to create an informational section within the infoDump element.
 *  - Be creative with how you create DOM elements and HTML.
 *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
 *  - Remember that functionality comes first, but user experience and design are important.
 * - Each new selection should clear, re-populate, and restart the Carousel.
 * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
 */

breedSelect.addEventListener("change", retrieveBreedInformation);

async function retrieveBreedInformation() {
  try {
    Carousel.clear();

    let thisBreed = breedSelect.value;
    //console.log("Selected value:", thisBreed);

    let breedDesciption = "";
    for (let i = 0; i < options.length; i++) {
      //console.log("Selected value:", thisBreed);
      //console.log("Option value:", options[i].value);
      if (options[i].value === thisBreed) {
        breedDesciption = options[i].description;
        break;
      }
    }

    let breedURL = "https://api.thecatapi.com/v1/breeds/" + thisBreed;
    //console.log("Breed url:", breedURL);
    const response = await fetch(breedURL, {
      headers: {
        "x-api-key": API_KEY,
      },
    });
    const data = await response.json();

    let breedImageURLs = [];
    for (let i = 0; i < 10; i++) {
      let breedImageURL =
        "https://api.thecatapi.com/v1/images/search?breed_ids=" + thisBreed;
      //console.log("Image url:", breedImageURL);
      const imageResponse = await fetch(breedImageURL, {
        headers: {
          "x-api-key": API_KEY,
        },
      });
      const imageData = await imageResponse.json();
      const url = imageData[0].url;
      //console.log(url);

      const imageItem = Carousel.createCarouselItem(
        url,
        breedSelect.name,
        thisBreed
      );
      Carousel.appendCarousel(imageItem);
    }
    //console.log(breedDesciption);
    infoDump.innerHTML = breedDesciption;

    Carousel.start();
  } catch (err) {
    console.log(err);
  }
}

/**
 * 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
 */
/**
 * 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */
/**
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */

/**
 * 6. Next, we'll create a progress bar to indicate the request is in progress.
 * - The progressBar element has already been created for you.
 *  - You need only to modify its "width" style property to align with the request progress.
 * - In your request interceptor, set the width of the progressBar element to 0%.
 *  - This is to reset the progress with each request.
 * - Research the axios onDownloadProgress config option.
 * - Create a function "updateProgress" that receives a ProgressEvent object.
 *  - Pass this function to the axios onDownloadProgress config option in your event handler.
 * - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
 *  - Update the progress of the request using the properties you are given.
 * - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
 *   once or twice per request to this API. This is still a concept worth familiarizing yourself
 *   with for future projects.
 */

/**
 * 7. As a final element of progress indication, add the following to your axios interceptors:
 * - In your request interceptor, set the body element's cursor style to "progress."
 * - In your response interceptor, remove the progress cursor style from the body element.
 */
/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */
export async function favourite(imgId) {
  // your code here
}

/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */

/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */
