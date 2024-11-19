import {fetchNewsSearch, fetchPopularNews} from './api.js';

// export function renderNewsCards(articles) {
//   const newsContainer = document.querySelector('.news__list_fresh');

//   if (!newsContainer) {
//     console.error('Контейнер новостей не найден');
//     return;
//   }

//   // Очищаем контейнер перед добавлением карточек
//   newsContainer.innerHTML = '';

//   articles.forEach((article) => {
//     const {urlToImage, title, url, description, publishedAt, author} = article;
//     const newsContainer = document.querySelector('.news__list_fresh');

//     // Форматируем дату и время
//     const formattedDate = new Date(publishedAt).toLocaleString();

//     // Создаем элементы для карточки
//     const newsItem = document.createElement('li');
//     newsItem.classList.add('news__item');

//     const card = document.createElement('div');
//     card.classList.add('card');

//     const image = document.createElement('img');
//     image.classList.add('preview');
//     image.src = urlToImage || '../../img/no-image.jpg';
//     image.alt = 'News image';

//     const titleWrap = document.createElement('div');
//     titleWrap.classList.add('news__title-wrap');

//     const titleLink = document.createElement('a');
//     titleLink.classList.add('news__title-link');
//     titleLink.href = url;
//     titleLink.target = '_blank';

//     const titleText = document.createElement('h2');
//     titleText.classList.add('news__title');
//     titleText.textContent = title;

//     // Вложенный SVG-элемент для ссылки
//     const svgLink = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
//     svgLink.classList.add('news__link');
//     svgLink.setAttribute('width', '24');
//     svgLink.setAttribute('height', '24');
//     svgLink.setAttribute('viewBox', '0 0 24 24');
//     svgLink.setAttribute('fill', 'none');
//     svgLink.innerHTML = `<path d="M8 6H18V16M18 6L6 18L18 6Z" stroke="#F2994A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />`;

//     const descriptionText = document.createElement('p');
//     descriptionText.classList.add('news__text');
//     descriptionText.textContent = description || 'Описание недоступно.';

//     const dataWrap = document.createElement('div');
//     dataWrap.classList.add('news__data-wrap');

//     const dateElement = document.createElement('div');
//     dateElement.classList.add('news__time');
//     dateElement.textContent = formattedDate;

//     const authorElement = document.createElement('p');
//     authorElement.classList.add('news__autor', 'news__time');
//     authorElement.textContent = author || 'Неизвестный автор';

//     // Собираем структуру карточки
//     titleLink.appendChild(titleText);
//     titleWrap.appendChild(titleLink);
//     titleWrap.appendChild(svgLink);

//     dataWrap.appendChild(dateElement);
//     dataWrap.appendChild(authorElement);

//     card.appendChild(image);
//     card.appendChild(titleWrap);
//     card.appendChild(descriptionText);
//     card.appendChild(dataWrap);

//     newsItem.appendChild(card);
//     newsContainer.appendChild(newsItem);
//   });
// }

export function renderNewsCards(articles, containerSelector) {
  const newsContainer = document.querySelector(containerSelector);

  if (!newsContainer) {
    console.error(`Контейнер ${containerSelector} не найден!`);
    return;
  }

  // Очищаем контейнер перед добавлением новых карточек
  newsContainer.innerHTML = '';

  // Генерируем HTML для карточек
  const cardsHTML = articles
    .map((article) => {
      const {urlToImage, title, url, description, publishedAt, author} = article;

      const formattedDate = new Date(publishedAt).toLocaleString();
      const imageUrl = urlToImage || 'https://via.placeholder.com/150';
      const authorText = author || 'Неизвестный автор';
      const descriptionText = description || 'Описание недоступно.';

      return `
       <li class="news__item">
         <div class="card">
           <img class="preview" src="${imageUrl}" alt="News image">
           <div class="news__title-wrap">
             <a class="news__title-link" href="${url}" target="_blank">
               <h2 class="news__title">${title}</h2>
             </a>
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

  // Добавляем карточки в контейнер
  newsContainer.innerHTML = cardsHTML;
}

export const eventHandler = () => {
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
      // Одновременное выполнение запросов
      const [searchResults, popularNews] = await Promise.all([
        fetchNewsSearch(query), // Первый запрос: Поиск новостей по запросу
        fetchPopularNews(), // Второй запрос: Популярные новости
      ]);

      // Рендерим результаты первого запроса (8 карточек)
      if (searchResults.length > 0) {
        renderNewsCards(searchResults.slice(0, 8), '.news__list_search');
      } else {
        alert('Новости по вашему запросу не найдены.');
      }

      // Рендерим результаты второго запроса (4 карточки популярных новостей)
      if (popularNews.length > 0) {
        renderNewsCards(popularNews.slice(0, 4), '.news__list_fresh');
      } else {
        console.warn('Популярные новости не найдены.');
      }
    } catch (error) {
      console.error('Ошибка при выполнении запросов:', error);
    }
  });
};
