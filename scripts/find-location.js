import crimeCountByCity from './filter.js';

const map = document.querySelector('.ukraine-map');
const mapContainer = document.querySelector('.markers-container');
const resultOfSearch = document.querySelector('.result-of-search');
const selectElement = document.getElementById('region-list-select');
const crimeCatagoriesContainer = document.querySelector('.crime-name');
const allOptions = document.querySelectorAll('.option-filter-list .count');

let countOfCrimes
let resultCount = 0;

let renderSetting = {
    crimes: ['allCrimes'],
    city: selectElement.value === '' ? 'all' : selectElement.value
}

const UKRAINE_RECT = {
    top: 52.379251,
    right: 42.620469,
    bottom: 44.086416,
    left: 22.137157,
}

let crimesCounts = {}

UKRAINE_RECT.width = UKRAINE_RECT.right - UKRAINE_RECT.left;
UKRAINE_RECT.height = UKRAINE_RECT.top - UKRAINE_RECT.bottom;

function renderMarkers(renderSetting, status) {
    mapContainer.innerHTML = '';
    crimesCounts = {}
    console.log(renderSetting)
    const keys = Object.keys(crimeCountByCity);
    renderSetting.crimes.forEach((crime) => {
        keys.forEach((cityName) => {
            const cityData = crimeCountByCity[cityName];
            if (cityData) {
                const city = crimeCountByCity[cityName];
                if (city.searchName === renderSetting.city || renderSetting.city === 'all') {
                    Object.keys(city.affectedTypeCounts).forEach((crimeType) => {
                        if (crimeType.includes(crime) || crime === 'allCrimes') {
                            const count = city.affectedTypeCounts[crimeType].count;

                            const x = ((city.affectedTypeCounts[crimeType].lon / city.affectedTypeCounts[crimeType].count) - UKRAINE_RECT.left) / (UKRAINE_RECT.right - UKRAINE_RECT.left) * map.width;
                            const y = (UKRAINE_RECT.top - (city.affectedTypeCounts[crimeType].lat / city.affectedTypeCounts[crimeType].count)) / (UKRAINE_RECT.top - UKRAINE_RECT.bottom) * map.height;
                            const marker = document.createElement('div');
                            const size = city.affectedTypeCounts[crimeType].count > 1000 ? 100 :
                                city.affectedTypeCounts[crimeType].count > 700 ? 85 :
                                    city.affectedTypeCounts[crimeType].count > 500 ? 75 :
                                        city.affectedTypeCounts[crimeType].count > 250 ? 65 : 35;

                            const zIndex = city.affectedTypeCounts[crimeType].count > 1000 ? 1 :
                                city.affectedTypeCounts[crimeType].count > 700 ? 2 :
                                    city.affectedTypeCounts[crimeType].count > 500 ? 3 :
                                        city.affectedTypeCounts[crimeType].count > 250 ? 4 : 5;

                            const optionSize = `width: ${size}px; height: ${size}px; color: white; font-size: 13px; display: flex; justify-content: center; align-items: center; position: absolute; z-index: ${zIndex};`;

                            marker.classList.add('city-marker');
                            marker.classList.add(`${cityData.name}`);
                            marker.classList.add(`${city.affectedTypeCounts[crimeType].color}`);
                            marker.style.cssText = optionSize;
                            marker.textContent = `${city.affectedTypeCounts[crimeType].count}`


                            if (crimesCounts[crimeType]) {
                                crimesCounts[crimeType] += count;
                            } else {
                                crimesCounts[crimeType] = count;
                            }

                            marker.style.left = `${x}px`;
                            marker.style.top = `${y}px`;
                            resultCount += city.affectedTypeCounts[crimeType].count

                            crimesCounts['allCrimes'] = resultCount;

                            countOfCrimes = city.affectedTypeCounts
                            resultOfSearch.innerHTML = `
                                <div class="result-count">Result: ${resultCount}</div>
                            `
                            mapContainer.appendChild(marker);
                        }
                    });
                }
            }
        })

        allOptions.forEach((option) => {
            option.innerHTML = `0`
            Object.keys(crimesCounts).forEach((name, index) => {
                if (option.getAttribute('name') == `${name.split(' ')[0]}`) {
                    option.innerHTML = crimesCounts[name]
                }
            })
        })
    })
}

let marker = 'city'

export function updateMarkers(crimes) {
    renderSetting.crimes = crimes;

    crimeCatagoriesContainer.innerHTML = ``;
    crimes.forEach((city) => {
        crimeCatagoriesContainer.innerHTML += `<div class="type-${city} category-result-container">${city}</div>`;
    })
    console.log('1')
    resultCount = 0;
    console.log(marker)
    renderMarkers(renderSetting, marker);
    marker = 'options'
}

export function updateCites(city) {
    renderSetting.city = city;
    console.log('2')
    resultCount = 0;
    renderMarkers(renderSetting, 'city');
}

renderMarkers(renderSetting);

export default countOfCrimes;