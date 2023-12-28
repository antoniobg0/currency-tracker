import Currency from "../models/Concurrency";

/**
 * Functions that saves user data to local storage.
 * 
 * Comment:
 * Since this is too specific we will simplify it by saving the actual user currency array.
 * 
 * @param currencies 
 */
const saveToStorage = (currencies: Currency[]) => {
  try {
    localStorage.setItem("userData", JSON.stringify(currencies));
  } catch (error) {
    console.error(error);
  }
};

/**
 * Gets local saved user currencies.
 * 
 * @returns currencies Currency[]
 */
const getFromStorage = (): Currency[] => {
  try {
    const data = localStorage.getItem("userData");

    if (!data) {
      return [];
    }

    return JSON.parse(data);
  } catch (error) {
    console.error(error);
  }

  return [];
};


export {saveToStorage, getFromStorage};