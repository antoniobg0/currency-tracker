/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Since javascript format convention is camelCase I liked to implement a function that converts data keys into camel case. 
 */

const isObject = (o: any) => {
  return o !== null && typeof o === 'object' && Array.isArray(o) === false;
};

const camelCase = (str: string): string => {
  return str.replace(/[-_]([A-Z|a-z|0-9])/g, (_, char) => char.toUpperCase());
};

// Convert underscore to camel case. (maybe not the best way due time complexity).
// we can also use a regex operation.
const responseToModel = <T>(res: any) => {
  const keys = Object.keys(res);
  const castedObject = {} as any;

  keys.forEach(key => {
    if (isObject(res[key])) {
      castedObject[camelCase(key)] = responseToModel(res[key]);
    } else if (Array.isArray(res[key])) {
      castedObject[camelCase(key)] = res[key].map(responseToModel);
    } else {
      castedObject[camelCase(key)] = res[key];
    }
  });

  return castedObject as T;
};

export default responseToModel