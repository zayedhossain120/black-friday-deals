import apiUrl from "./apiUrl";


const fetchBrandDataAtRouterLevel = (id) => {
  return fetch(`${apiUrl}/brand/${id}`);
};

export default fetchBrandDataAtRouterLevel;
