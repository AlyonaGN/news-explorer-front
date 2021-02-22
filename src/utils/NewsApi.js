import { newsApiKey } from './newsApiKey';

class NewsApi {
    constructor({ baseUrl }) {
        this.baseUrl = baseUrl;
    }

    getNews(keyWord, fromDate, toDate) {
        return fetch(`${this.baseUrl}&q=${keyWord}&from=${fromDate}&to=${toDate}&pageSize=${100}`, {
            method: 'GET',
        })
            .then(async(res) => {
                const results = await this._getResponseData(res);
                return this._formatNews(results.articles, keyWord);
            });
    }

    _formatNews(results, keyWord){
        const formattedCards = [];
        results.forEach((article) =>{
            const formattedArticle = { date: "", image: "", keyword: keyWord, link: "", source: "", text: "", title: ""}
            formattedArticle.date = article.publishedAt;
            formattedArticle.image = article.urlToImage;
            formattedArticle.link = article.url;
            formattedArticle.source = article.source.name;
            formattedArticle.text = article.content;
            formattedArticle.title = article.title;
            formattedCards.push(formattedArticle);
        });
        return formattedCards;
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