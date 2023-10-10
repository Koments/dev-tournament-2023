import { updateCites } from './find-location.js';
import cites from '../data/cites.js';

const regionList = document.querySelector('.region-list');
const resultOfCategories = document.querySelector('.city-name');

regionList.innerHTML = `<option value="all" onclick="updateCites('allCities')">All States</option>`

cites.forEach((city) => {
    regionList.innerHTML += `
        <option value="${city.searchName}" onclick="updateCites(${city.searchName})">${city.name}</option>
    `;
})

regionList.addEventListener('change', function () {
    const value = regionList.value.charAt(0).toUpperCase() + regionList.value.slice(1).toLowerCase();
    resultOfCategories.textContent = regionList.value === 'all' ? `All States` : `${value}`
    updateCites(regionList.value)
});