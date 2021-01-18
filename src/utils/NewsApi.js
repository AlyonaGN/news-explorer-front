//import { getToken } from "./token";
import { newsApiKey } from './newsApiKey';

class NewsApi {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
    }

    getNews(keyWord, fromDate, toDate) {
        return this.makeApiRequest(`${this.baseUrl}&q=${keyWord}&from=${fromDate}&to=${toDate}&pageSize=${100}`, {
            method: 'GET',
            headers: this.headers,
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }

    
    makeApiRequest(url, config) {
        const token = 1/* getToken() */;
        if (!token) {
            return;
        }

        if (!config.headers) {
            config.headers = { authorization: `Bearer ${token}` };
        } else {
            config.headers.authorization = `Bearer ${token}`;
        }
        return fetch(url, config);
    }

    _getResponseData(res){
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }
}

export const newsApi = new NewsApi({
    baseUrl: `https://newsapi.org/v2/everything?apiKey=${newsApiKey}`,
    //baseUrl: 'http://localhost:4000/api',
});