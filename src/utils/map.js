import { Location, Permissions } from 'expo';
import Polyline from '@mapbox/polyline';

import store from 'common/store';

import { ARRAY_FIRST, ARRAY_SECOND } from 'constants/common-data';
import { FINISH_LOADING, START_LOADING } from 'constants/action';
import { MAP_API_KEY, DIRECTION_API, PLACE_SEARCH_API, PLACE_PHOTO_API } from 'constants/api';
import {formatLanguage} from 'common/language';

/**
 * Get location using device's GPS
 * @return {Promise}     Promise to resolve location or { errorMessage }
 */
export const getLocationAsync = async () => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);

  if (status !== 'granted') {
    return { errorMessage: formatLanguage('LOCATION_PERMISSION') };
  }

  const enabled = await Location.hasServicesEnabledAsync();

  if (!enabled) {
    return { errorMessage: formatLanguage('GPS_ON') };
  }

  const location = await Location.getCurrentPositionAsync({});

  return location;
};

/**
 * Watch location using device's GPS
 * @param {function} callback     Callback to process when having new update
 * @return {Promise}              Promise to subscription object
 */
export const watchLocationAsync = async callback => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);

  if (status !== 'granted') {
    return { errorMessage: formatLanguage('LOCATION_PERMISSION') };
  }

  const enabled = await Location.hasServicesEnabledAsync();

  if (!enabled) {
    return { errorMessage: formatLanguage('GPS_ON') };
  }

  const subscription = await Location.watchPositionAsync({ timeInterval: 1000 }, callback);

  return subscription;
};

/**
 * Get direction using Google Map API
 * @param {string|Object} origin          The origin, can be string or { latitude, longitude }
 * @param {string|Object} destination     The destination, can be string or { latitude, longitude }
 * @return {Promise}                      Promise to resolve direction
 */
export const getDirection = async (origin, destination) => {
  try {
    store.store.dispatch({ type: START_LOADING });

    const originStr = origin.latitude === undefined
      ? origin
      : `${origin.latitude},${origin.longitude}`;
    const destinationStr = destination.latitude === undefined
      ? destination
      : `${destination.latitude},${destination.longitude}`;

    const url = `${DIRECTION_API}?origin=${originStr}&destination=${destinationStr}&key=${MAP_API_KEY}`;
    const res = await fetch(url);

    const resJson = await res.json();

    const points = Polyline.decode(resJson.routes[ARRAY_FIRST].overview_polyline.points);
    const coords = points.map(point => ({
      latitude: point[ARRAY_FIRST],
      longitude: point[ARRAY_SECOND]
    }));

    store.store.dispatch({ type: FINISH_LOADING });

    return coords;
  } catch (error) {
    store.store.dispatch({ type: FINISH_LOADING });

    return error;
  }
};

/**
 * Get directions visiting multiple waypoints using Google Map API
 * @param {string|Object} origin          The origin, can be string or { latitude, longitude }
 * @param {string|Object} destination     The destination, can be string or { latitude, longitude }
 * @param {Array} waypoints               List of waypoints { latitude, longitude }
 * @return {Promise}                      Promise to resolve directions
 */
export const getWayPointsDirections = async (origin, destination, waypoints = []) => {
  try {
    store.store.dispatch({ type: START_LOADING });

    const originStr = origin.latitude
      ? `${origin.latitude},${origin.longitude}`
      : origin;
    const destinationStr = destination.latitude
      ? `${destination.latitude},${destination.longitude}`
      : destination;

    const waypointsStr = waypoints.length
      ? `&waypoints=optimize:true|${waypoints.map(({ latitude, longitude }) => `${latitude},${longitude}`).join('|')}`
      : '';
    const url = `${DIRECTION_API}?origin=${originStr}&destination=${destinationStr}${waypointsStr}&key=${MAP_API_KEY}`;
    const res = await fetch(url);

    const resJson = await res.json();

    const legs = resJson.routes[ARRAY_FIRST].legs;

    const directions = legs.map(leg => {
      const direction = [];

      leg.steps.forEach(step => {
        direction.concat(Polyline.decode(step.polyline.points).map(point => ({
          latitude: point[ARRAY_FIRST],
          longitude: point[ARRAY_SECOND]
        })));
      });

      return direction;
    });

    store.store.dispatch({ type: FINISH_LOADING });

    return directions;
  } catch (error) {
    store.store.dispatch({ type: FINISH_LOADING });

    return error;
  }
};

/**
 * Get Image Url for a place
 * @param {string} place     The place to find image
 * @return {Promise}         Promise to resolve image url
 */
export const getPlaceImage = async (place) => {
  const url = `${PLACE_SEARCH_API}?input=${encodeURI(place)}&inputtype=textquery&key=${MAP_API_KEY}&fields=photos`;
  const res = await fetch(url);
  const resJson = await res.json();

  const searchedPlace = resJson.candidates[ARRAY_FIRST] || {};
  const photo = searchedPlace.photos ? (searchedPlace.photos[ARRAY_FIRST] || {}) : {};
  const photoReference = photo.photo_reference || null;

  return photoReference && `${PLACE_PHOTO_API}?maxheight=250&photoreference=${photoReference}&key=${MAP_API_KEY}`;
};
