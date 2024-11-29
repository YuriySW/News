import {renderNewsCards} from './render.js';
import {eventHandler} from './event-handler.js';
import {
  newsList,
  preloader,
  preloaderFresh,
  selectElement,
  API_KEY,
  BASE_URL,
  titleSearch,
  countryNames,
} from './identifiers.js';

export async function fetchNews() {
  preloaderFresh.classList.remove('unseen');
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
    preloaderFresh.classList.add('unseen');
  } catch (error) {
    console.error('Ошибка при получении новостей:', error);
    preloaderFresh.classList.add('unseen');
  }
}

selectElement.addEventListener('change', () => {
  console.log(`Выбрано: ${selectElement.value}`);

  eventHandler();
});

export async function fetchNewsSearch(query, lang) {
  preloader.classList.remove('unseen');

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

    preloader.classList.add('unseen');
    return data.articles || [];
  } catch (error) {
    console.error('Ошибка при получении новостей:', error);
    preloader.classList.add('unseen');
    return [];
  }
}

export async function fetchPopularNews(lang) {
  preloaderFresh.classList.remove('unseen');
  try {
    const url = `${BASE_URL}/top-headlines?lang=${lang}&country=${lang}&max=4&apikey=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Ошибка популярных новостей: ${response.status}`);
    }

    const data = await response.json();
    console.log('Популярные новости:', data.articles);
    preloaderFresh.classList.add('unseen');
    newsList.style.minHeight = '450px';
    return data.articles || [];
  } catch (error) {
    preloaderFresh.classList.add('unseen');
    console.error('Ошибка при получении популярных новостей:', error);
    return [];
  }
}

fetchNews();
eventHandler(titleSearch, selectElement, countryNames);
