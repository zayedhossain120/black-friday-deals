import apiUrl from "./apiUrl";


const fetchPostDataAtRouterLevel = (id) => {
  return fetch(`${apiUrl}/post`);
};

export default fetchPostDataAtRouterLevel;