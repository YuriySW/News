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

      const secureImage = image?.startsWith('http://')
        ? image.replace('http://', 'https://')
        : image;
      const defaultImage =
        'https://raw.githubusercontent.com/YuriySW/News/refs/heads/main/img/no-image.jpg';
      const imageUrl = secureImage || defaultImage;

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

document.addEventListener('DOMContentLoaded', function () {
  const newsListFresh = document.querySelector('.news__list_fresh');
  if (newsListFresh) {
    newsListFresh.style.minHeight = '';
  }
});
