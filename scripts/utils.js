import { updateMarkers } from './find-location.js';

const clearButton = document.querySelector('.clear-container');
const affectedTypeList = document.querySelectorAll('.option-filter-list li');
const square = document.querySelector('.square');
const wrapper = document.querySelector('.wrapper');
const resultCategories = document.querySelector('.result-categories');

// square.addEventListener('click', function () {
//     wrapper.style.display = 'none';
// })

let categoryCrime = [];
let allCrimeSelected = true;

clearButton.addEventListener('click', function () {
    categoryCrime = [];
    allCrimeSelected = false;
    // resultCategories.innerHTML = ``
    affectedTypeList.forEach((item) => {
        item.classList.remove('selected-input');
    });


    updateMarkers(categoryCrime);
});

document.addEventListener('DOMContentLoaded', () => {
    const allCrimes = document.getElementById('allCrimes');
   

    affectedTypeList.forEach((element) => {
        element.addEventListener('click', () => {
            const elementId = element.id;

            if (elementId === 'allCrimes') {
                allCrimeSelected = !allCrimeSelected;
                if (allCrimeSelected) {
                    categoryCrime = [elementId];
                    affectedTypeList.forEach((item) => {
                        item.classList.add('selected-input');
                    });

                } else {
                    affectedTypeList.forEach((item) => {
                        item.classList.remove('selected-input');
                    });
                    categoryCrime = []
                }
            } else {
                console.log(element)
                if(categoryCrime[0] != 'allCrimes'){
                    element.classList.toggle('selected-input');
                }
           
                const index = categoryCrime.indexOf(elementId);

                if (index === -1) {
                    categoryCrime.push(elementId);
                } else {
                    categoryCrime.splice(index, 1);
                }

                const allOtherElementsSelected = Array.from(affectedTypeList)
                    .filter((item) => item !== element)
                    .every((item) => item.classList.contains('selected-input'));

                if (allOtherElementsSelected) {
                    affectedTypeList.forEach((item) => {
                        if (item !== element) {
                            item.classList.remove('selected-input');
                            const index = categoryCrime.indexOf(item.id);
                            if (index !== -1) {
                                categoryCrime.splice(index, 1);
                            }
                        }
                    });
                }

                if (categoryCrime.length === 6) {
                    allCrimes.classList.add('selected-input');
                    allCrimeSelected = true;
                } else {
                    allCrimes.classList.remove('selected-input');
                    allCrimeSelected = false;
                }
            }

            updateMarkers(categoryCrime);
            
        });
    });
});

export default categoryCrime;