import {renderNewsCards} from './render.js';

const API_KEY = '4b2b0d0e0da043b880203823db1ec41b';

// const url = `https://newsapi.org/v2/top-headlines?country=ru&language=ru&apiKey=${API_KEY}`;

const url = `https://newsapi.org/v2/everything?q=новости&language=ru&apiKey=${API_KEY}`;

export async function fetchNews() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    // Получаем первые 8 статей
    const articles = data.articles.slice(0, 8);
    console.log(articles);

    // Вызываем функцию для отображения карточек
    renderNewsCards(articles);
  } catch (error) {
    console.error('Ошибка при получении новостей:', error);
  }
}

fetchNews();
