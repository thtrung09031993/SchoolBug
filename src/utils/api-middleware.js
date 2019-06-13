export const API_REQUEST = 'API_REQUEST';
export const TYPE = {
  success: "SUCCESS",
  failure: "FAILURE",
  error: "ERROR"
};

const SUCCESS_CODE = 200;
const FAILURE_CODE = 400;

const isValidRequest = action => {
  return typeof action === 'object' && action.hasOwnProperty(API_REQUEST);
};

const isValidResponse = status => {
  return status >= SUCCESS_CODE && status < FAILURE_CODE;
};

// This is good middleware to add api response to reducer, however, in this project, we might not need it
export default function apiMiddleware() {
  return next => async (action) => {
    if (!isValidRequest(action)) {
      return next(action);
    }
    const request = action[API_REQUEST];

    let additional = request.additional;

    try {
      const response = await fetch(request.url, {
        method: request.method || 'GET',
        headers: request.headers || {},
        body: request.body ? JSON.stringify(request.body) : undefined
      });

      let data = await response.json();

      if (!isValidResponse(response.status)) {
        return next({
          type: request.action && request.action.failure ? request.action.failure : TYPE.failure,
          payload: data,
          additional,
          error: true
        });
      }

      return next({
        type: request.action && request.action.success ? request.action.success : TYPE.success,
        payload: data,
        additional,
        error: false
      });
    } catch (e) {
      return next({
        type: request.action && request.action.error ? request.action.error : TYPE.error,
        payload: e,
        additional,
        error: true
      });
    }
  };
}
