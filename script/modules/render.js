import {fetchNewsSearch, fetchPopularNews} from './api.js';

export function renderNewsCards(articles, containerSelector) {
  const newsContainer = document.querySelector(containerSelector);

  if (!newsContainer) {
    console.error(`Контейнер ${containerSelector} не найден!`);
    return;
  }

  newsContainer.innerHTML = '';

  const cardsHTML = articles
    .map((article) => {
      const {image, title, url, description, publishedAt, source} = article;

      const formattedDate = new Date(publishedAt).toLocaleString();
      // const imageUrl = image || '../../img/no-image.jpg';
      const defaultImage = '/img/no-image.jpg';
      const imageUrl = image || defaultImage;

      const authorText = source.name || 'Неизвестный автор';
      const descriptionText = description || 'Описание недоступно.';

      return `
       <li class="news__item">
         <div class="card">
           <img class="preview" src="${imageUrl}" alt="News image" onerror="this.src='${defaultImage}'" >
           <div class="news__title-wrap">
             <a class="news__title-link" href="${url}" target="_blank">
               <h2 class="news__title">${title}</h2>
             </a>
             <svg
                    class="news__link"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M8 6H18V16M18 6L6 18L18 6Z"
                      stroke="#F2994A"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
           </div>
           <p class="news__text">${descriptionText}</p>
           <div class="news__data-wrap">
             <div class="news__time">${formattedDate}</div>
             <p class="news__autor news__time">${authorText}</p>
           </div>
         </div>
       </li>
     `;
    })
    .join('');

  newsContainer.innerHTML = cardsHTML;
}

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

document.addEventListener('DOMContentLoaded', function () {
  const newsListFresh = document.querySelector('.news__list_fresh');
  if (newsListFresh) {
    newsListFresh.style.minHeight = '';
  }
});
