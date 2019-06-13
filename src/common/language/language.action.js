import { CHOOSE_LANGUAGE } from "constants/action";

/**
 * Choose the language for device
 * @param {string} language     Language constant from constants/language
 * @return {Action}             Action to dispatch store
 */
export const chooseLanguage = language => ({
  type: CHOOSE_LANGUAGE,
  payload: { language }
});
