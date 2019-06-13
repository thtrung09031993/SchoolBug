import { SET_USER_PROFILE, SET_CAR, RESET_USER_STORE } from "constants/action";
import { USER, ADDRESS, CAR, FEEDBACK } from 'constants/api';


/**
 * Set user profile to store
 * @param {string} profile    User profile to add to store
 * @return {Action}           Action to dispatch store
 */
export const setUserProfile = profile => ({
  type: SET_USER_PROFILE,
  payload: {
    profile: {
      address: profile[ADDRESS.ADDRESS],
      email: profile[USER.EMAIL],
      idCard: profile[USER.ID_CARD],
      avatar: profile[USER.IMAGE],
      name: profile[USER.NAME],
      id: profile[USER.USER_ID],
      username: profile[USER.USERNAME],
      score: profile[FEEDBACK.AVG_SCORE],
      isActive: profile[USER.IS_ACTIVE]
    }
  }
});

export const setCar = car => ({
  type: SET_CAR,
  payload: {
    car: {
      plateNo: car[CAR.PLATE_NUMBER],
      brand: car[CAR.BRAND],
      model: car[CAR.MODEL],
      color: car[CAR.COLOR],
      capacity: car[CAR.CAPACITY]
    }
  }
});

export const resetUserStore = () => ({
  type: RESET_USER_STORE,
  payload: {
    car: {},
    profile: {}
  }
});
