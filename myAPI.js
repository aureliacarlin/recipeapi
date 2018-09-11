const baseURL = 'https://api.edamam.com/search';
// const key = '3982091366ee6f54086ce01c9364e199';
// const myID = '0dfb0fad';
const key = 'c372739e756b2fb81dbacb91dbde99ac';
const myID = '440d5910';
let url; 
//search form
const searchTerm = document.querySelector('.search');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');

//Results navigation
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const nav = document.querySelector('nav');

const section = document.querySelector('section');

//initial style to none
nav.style.display = 'none';
let pageNumber = 0;
console.log('PageNumber: ', pageNumber);
let displayNav = false;

//Event listener 
searchForm.addEventListener('submit', fetchResults);
nextBtn.addEventListener('click', nextPage);
previousBtn.addEventListener('click', previousPage);

function fetchResults(e) {
    e.preventDefault();
    // url = baseURL + '?app_id=' + myID + '&app_key=' + key + '&q' + searchTerm.value;
    url = `${baseURL}?q=${searchTerm.value}&app_id=${myID}&app_key=${key}&page=${pageNumber}&to=20`
    console.log(url);

    fetch(url) 
        .then(function(result) {
            console.log(result)
            return result.json();
        }).then(function(json){
            displayResults(json);
            // console.log(json);
        });
        
        function displayResults(json) {
            while (section.firstChild) {
                section.removeChild(section.firstChild);
            }
             console.log('DisplayResults', json);
             let recipes = json.hits;
             console.log(recipes);

             if(recipes.length === 10) {
                 nav.style.display = 'block';
             } else {
                 nextBtn.style.display = 'none';
             }
            
             if(recipes.length === 0) {
                 console.log("No results");
             } else {
                 for(let i = 0; i < recipes.length; i++) {
                     let recipess = document.createElement('article');
                     let heading = document.createElement('h2');
                     let link = document.createElement('a');
                     let img = document.createElement('img');

                     let current = recipes[i]; //hold current data as we iterate through recipes
                    //  console.log("Current: ", current);
                    // console.log("just current:", current);
                     console.log("current.recipe", current.recipe);
                     let currentRecipe = current.recipe;

                          if(currentRecipe.image.length > 0) {
                        //         img.src = 'https://api.edamam.com' + currentRecipe.image.url;
                                 img.src = currentRecipe.image;
                          

                                 img.alt = currentRecipe.label;
                          }

                      link.href = currentRecipe.url;
                      link.textContent = currentRecipe.label;

                      recipess.appendChild(heading);
                      heading.appendChild(link);
                      section.appendChild(recipess);
                      recipess.appendChild(img);

                      recipess.setAttribute('class', 'border');
                 }
             }
        };
    }


function nextPage (e) {
    pageNumber++;
    fetchResults(e);
    console.log("Page number:", pageNumber);
}

function previousPage(e) {
    if(pageNumber > 0) {
        pageNumber--;
    } else {
        return;
    }
    fetchResults(e);
    console.log("Page:", pageNumber);
}

