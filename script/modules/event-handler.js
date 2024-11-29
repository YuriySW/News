import {fetchNewsSearch, fetchPopularNews} from './api.js';

export const eventHandler = (titleSearch, selectElement, countryNames) => {
  document.querySelector('.search-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    let hiddenSearchWrap = document.querySelector('.hidden');
    hiddenSearchWrap.style.display = 'block';
    const searchInput = document.querySelector('.search');
    const query = searchInput.value.trim();

    if (!query) {
      alert('Введите запрос для поиска.');
      return;
    }

    try {
      const lang = selectElement.value;
      console.log('Выбранный язык:', lang);
      const countryName = countryNames[lang];

      const [searchResults, popularNews] = await Promise.all([
        fetchNewsSearch(query, lang),
        fetchPopularNews(lang),
      ]);
      const searchResultsCount = searchResults.length;
      titleSearch.textContent = `По вашему запросу для страны "${countryName}" найдено ${searchResultsCount} результатов`;
      if (searchResults.length > 0) {
        renderNewsCards(searchResults, '.news__list_search');
      } else {
        alert('Новости по вашему запросу не найдены.');
      }

      if (popularNews.length > 0) {
        renderNewsCards(popularNews, '.news__list_fresh');
      } else {
        console.warn('Популярные новости не найдены.');
      }
    } catch (error) {
      console.error('Ошибка при выполнении запросов:', error);
    }
  });
};
