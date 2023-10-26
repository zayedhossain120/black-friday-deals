// import React from 'react';

const getDateFromApi = (date = new Date()) => {
  return `createdAt[lt]=${date}`;
};

export default getDateFromApi;
