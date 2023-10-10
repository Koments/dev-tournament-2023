import { listOfCrimes } from '../data/events.js';
import { namesOfCrimes } from '../data/names.js';
import cites from "../data/cites.js"

const result = {};
const affectedTypeCountsByCity = {};

for (const city in listOfCrimes) {
  const cityData = listOfCrimes[city];

  const eventGroups = {};
  const affectedTypeCounts = {};

  cityData.forEach(event => {
    if (event.hasOwnProperty('event') && event.hasOwnProperty('lon') && event.hasOwnProperty('lat')) {
      const eventId = event.event;
      const affectedTypeId = event.affected_type;
      const affectedTypeDescription = namesOfCrimes.affected_type[affectedTypeId] === undefined ? 'Other types of crimes' : namesOfCrimes.affected_type[affectedTypeId];

      if (!affectedTypeCounts[affectedTypeDescription]) {
        affectedTypeCounts[affectedTypeDescription] = {
          count: 0,
          color: affectedTypeDescription === 'Violation of other rights' ? 'blue' :
            affectedTypeDescription === 'Those wounded or whose health was otherwise damaged' ? 'yellow' :
              affectedTypeDescription === 'Rape' ? 'red' :
                affectedTypeDescription === 'Disappearance of an individual' ? 'orange' :
                  affectedTypeDescription === 'Death of an individual' ? 'black' : 'purple',
          lon: 0,
          lat: 0
        };
      }

      if (affectedTypeDescription === undefined)
      affectedTypeDescription == 'Without name'

      affectedTypeCounts[affectedTypeDescription] = {
        count: affectedTypeCounts[affectedTypeDescription].count + 1,
        lon: affectedTypeCounts[affectedTypeDescription].lon + event?.lon,
        lat: affectedTypeCounts[affectedTypeDescription].lat + event?.lat,
        color: affectedTypeCounts[affectedTypeDescription].color
      };

      if (!eventGroups[eventId]) {
        eventGroups[eventId] = [];
      }
      eventGroups[eventId].push(event);
    }
  });

  result[city] = eventGroups;
  affectedTypeCountsByCity[city] = affectedTypeCounts;
}

const crimeInfo = cites.map(city => {
  const cityName = city.searchName;
  const affectedTypeCounts = affectedTypeCountsByCity[cityName] || {};

  return {
    ...city,
    affectedTypeCounts
  };
});

export default crimeInfo;