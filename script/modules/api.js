import {renderNewsCards, eventHandler} from './render.js';

const API_KEY = 'c37265cfce8f3a3877a834c9ceba0f0c';
const BASE_URL = 'https://gnews.io/api/v4';
const selectElement = document.querySelector('.custom-select');
let titleSearch = document.querySelector('.title');
const countryNames = {
  ru: 'Россия',
  us: 'Сша',
  de: 'Германия',
  fr: 'Франция',
};

export async function fetchNews() {
  try {
    const lang = selectElement.value;
    const url = `${BASE_URL}/top-headlines?lang=${lang}&country=${lang}&max=8&apikey=${API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Ошибка загрузки новостей: ${response.status}`);
    }

    const data = await response.json();

    const articles = data.articles;
    console.log('Новости:', articles);

    renderNewsCards(articles, '.news__list_fresh');
  } catch (error) {
    console.error('Ошибка при получении новостей:', error);
  }
}

selectElement.addEventListener('change', () => {
  console.log(`Выбрано: ${selectElement.value}`);

  eventHandler();
});

export async function fetchNewsSearch(query, lang) {
  try {
    const url = `${BASE_URL}/search?q=${encodeURIComponent(
      query
    )}&lang=${lang}&country=${lang}&max=8&apikey=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Ошибка поиска: ${response.status}`);
    }

    const data = await response.json();
    console.log('Результаты поиска:', data.articles);

    return data.articles || [];
  } catch (error) {
    console.error('Ошибка при получении новостей:', error);
    return [];
  }
}

export async function fetchPopularNews(lang) {
  try {
    const url = `${BASE_URL}/top-headlines?lang=${lang}&country=${lang}&max=4&apikey=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Ошибка популярных новостей: ${response.status}`);
    }

    const data = await response.json();
    console.log('Популярные новости:', data.articles);

    return data.articles || [];
  } catch (error) {
    console.error('Ошибка при получении популярных новостей:', error);
    return [];
  }
}

fetchNews();
eventHandler(titleSearch, selectElement, countryNames);
