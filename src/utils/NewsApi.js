import { getToken } from "./token";
import { newsApiKey } from './newsApiKey';

class NewsApi {
    constructor({ baseUrl }) {
        this.baseUrl = baseUrl;
    }

    getNews(keyWord, fromDate, toDate) {
        return fetch(`${this.baseUrl}&q=${keyWord}&from=${fromDate}&to=${toDate}&pageSize=${100}`, {
            method: 'GET',
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }

    _getResponseData(res){
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }
}

export const newsApi = new NewsApi({
    baseUrl: `https://nomoreparties.co/news/v2/top-headlines?country=us&apiKey=${newsApiKey}`,
});