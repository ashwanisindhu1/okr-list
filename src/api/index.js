import { transformData } from '../utils';

export const getOKRs = function () {
  return fetch('https://okrcentral.github.io/sample-okrs/db.json')
    .then((res) => res.json())
    .then((data) => {
      return transformData(data);
    });
};
