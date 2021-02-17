import { ROUTES_MAP } from "./routesMap";
import { setToken } from "./token";

export const BASE_URL = 'http://api.news.explorer.by.alyona.students.nomoredomains.icu';

export const register = (name, email, password) => {
    return fetch(`${BASE_URL}${ROUTES_MAP.SIGNUP}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
        .then(async (response) => {
                const data = await response.json();
                if (response.status === 200){
                  return data;
                }
                else {
                    if (response.status === 400) {
                        return Promise.reject(new Error(data.validation.body.message));
                    }
                    return Promise.reject(new Error(data.message));
                }
        })
};

export const login = (email, password) => {
    return fetch(`${BASE_URL}${ROUTES_MAP.SIGNIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then(response => response.json())
    .then((data) => {
      if (data.token){
        setToken(data.token);
        return data;
      }
      else {
        if (data.status === 400) {
          return Promise.reject(new Error(data.validation.body.message));
        }
        return Promise.reject(new Error(data.message));
      }
    })
  };

  export const getUserData = (token) => {
    return fetch(`${BASE_URL}${ROUTES_MAP.USER_INFO}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then((response) => {
        console.log(response);
        return response.json();
    })
  };

  export const saveNews = (newsCard, token) => {
    //TODO: дописать запрос
    return fetch(`${BASE_URL}${ROUTES_MAP.ARTICLES}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        keyword: , 
        title: , 
        text: , 
        date: , 
        source: , 
        link: , 
        image: ,
      })
    })
    .then((response) => {
        console.log(response);
        return response.json();
    })
  };
