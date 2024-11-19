import {renderNewsCards} from './render.js';

const API_KEY = '4b2b0d0e0da043b880203823db1ec41b';
const BASE_URL = 'https://newsapi.org/v2/everything';
const TOP_HEADLINES_URL = 'https://newsapi.org/v2/top-headlines';

// const url = `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?country=us&language=us&apiKey=${API_KEY}`;

// const url = `https://newsapi.org/v2/top-headlines?country=us&language=en&apiKey=${API_KEY}`;

const url = `https://newsapi.org/v2/everything?q=новости&language=ru&apiKey=${API_KEY}`;

export async function fetchNews() {
  try {
    const response = await fetch(url);
    //  const response = await fetch('https://newsapi.org/v2/top-headlines?country=ru', {
    //    headers: {
    //      'X-Api-Key': '4b2b0d0e0da043b880203823db1ec41b',
    //    },
    //  });
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
