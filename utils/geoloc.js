import Qs from 'qs';


export const getMapDeltas = (lat, lon, distance) => {
  const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
  const latitudeDelta =distance / oneDegreeOfLatitudeInMeters;
  const longitudeDelta = distance / (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)));

  return result = {
    latitude: lat,
    longitude: lon,
    latitudeDelta,
    longitudeDelta,
  }
}

export const deg2rad = deg => deg * (Math.PI / 180);
export const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);  // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c; // Distance in km
  return d;
}

export const googleMapsPlaceDetails = ({
  key,
  placeid,
  language,
  region
}) => {
  return new Promise(function(resolve, reject) {
    const uri = 'https://maps.googleapis.com/maps/api/place/details/json?' + Qs.stringify({
      key,
      placeid,
      language,
      region
    });

    let result, ok = false;

    fetch(uri)
      .then(async response => (ok = response.ok, response.json()))
      .then(data => {
        console.log(ok, data)
        if(ok) {
          result = { ok, data }
        } else {
          result = { ok }
        }
      })
      .catch(error => {
        result = { ok: false, error }
      })
      .finally(() => resolve(result));
  });
}

export const googleMapsGeocode = ({
  key,
  latlng,
  address,
  result_type, // https://developers.google.com/maps/documentation/geocoding/intro#ComponentFiltering
  language
}) => {
  return new Promise(function(resolve, reject) {
    const uri = 'https://maps.googleapis.com/maps/api/geocode/json?' + Qs.stringify({
      key,
      latlng,
      address,
      result_type,
      language
    });

    let result, ok = false;

    fetch(uri)
      .then(response => (ok = response.ok, response.json()))
      .then(data => {
        if(ok) {
          result = { ok, data }
        } else {
          result = { ok }
        }
      })
      .catch(error => {
        result = { ok: false, error }
      })
      .finally(() => resolve(result));
  });
}

export const googleMapsFindPlaceFromText = ({
  key,
  input,
  inputtype = 'textquery',
  language,
  region
}) => {
  return new Promise(function(resolve, reject) {
    const uri = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?' + Qs.stringify({
      key,
      input,
      inputtype,
      language,
      region
    });

    let result, ok = false;

    fetch(uri)
      .then(response => (ok = response.ok, response.json()))
      .then(data => {
        if(ok) {
          result = { ok, data }
        } else {
          result = { ok }
        }
      })
      .catch(error => {
        result = { ok: false, error }
      })
      .finally(() => resolve(result));
  });
}

// function latLng2World({lat, lng}) {
//   const sin = Math.sin(lat * Math.PI / 180);
//   const x = (lng / 360 + 0.5);
//   let y = (0.5 - 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI);

//   y = y < -1 // eslint-disable-line
//     ? -1
//     : y > 1
//       ? 1
//       : y;
//   return {x, y};
// }

// function world2LatLng({x, y}) {
//   const n = Math.PI - 2 * Math.PI * y;

//   return {
//     lat: (180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)))),
//     lng: x * 360 - 180,
//   };
// }

// function world2Screen({x, y}, zoom) {
//   const scale = Math.pow(2, zoom);
//   return {
//      x: x * scale * TILE_SIZE, // TILE_SIZE = 256,
//      y: y * scale * TILE_SIZE
//   }
// }
