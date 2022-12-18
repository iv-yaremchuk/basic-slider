// Создаём массив содержащий в себе объекты с изображениями и текстом,
// заменяемые при смене раздела
const projectsContentList = [
  {
    chapter: 'Rostov-on-Don, Admiral',
    city: 'Rostov-on-Don <br> LCD admiral',
    area: '81 m2',
    time: '3.5 months',
    cost: 'Upon request',
    src: './img/projects/01-projects-admiral.jpg',
  },
  {
    chapter: 'Sochi, Thieves',
    city: 'Sochi <br> Thieves',
    area: '105 m2',
    time: '4 months',
    cost: 'Upon request',
    src: './img/projects/02-projects-thieves.jpg',
  },
  {
    chapter: 'Rostov-on-Don, Patriotic',
    city: 'Rostov-on-Don <br> Patriotic',
    area: '93 m2',
    time: '3 months',
    cost: 'Upon request',
    src: './img/projects/03-projects-patriotic.jpg',
  },
];

const sliderImages = document.querySelector('.projects-content-slider');
const sliderNavigation = document.querySelector('.projects-slider-nav');
const sliderPaginationBullets = document.querySelector(
  '.projects-slider-pagination__wrap'
);
const projectChapterList = document.querySelector('.projects-chapter__list');
const projectParamsDescrCity = document.querySelector(
  '.projects-params__item.city__wrap'
);
const projectParamsDescrArea = document.querySelector(
  '.projects-params__item.area__wrap'
);
const projectParamsDescrTime = document.querySelector(
  '.projects-params__item.time__wrap'
);
const projectParamsDescrCost = document.querySelector(
  '.projects-params__item.cost__wrap'
);

// создаём объект содержащий дополнительные параметры слайдера,
// такие как пагинация, автоматическое переключение слайдов
// и скорость смены слайдов в данном режиме(миллисекунды)
let sliderOptions = {
  pagination: true,
  autoplay: false,
  autoplayInterval: 5000,
};

// вызываем функцию логики слайдера с переданными данными и
// параметрами после того, как браузер составит DOM-дерево
document.addEventListener('DOMContentLoaded', () => {
  initSlider(projectsContentList, sliderOptions);
});

// создаём функцию логики слайдера в которой описана:
// логика смены изображений, логика кнопок смены слайдов,
// логика пагинации, логика смены слайдов и текста,
// логика параметров слайдера
function initSlider(content, options) {
  if (!content || !content.length) return;

  options = options || {
    titles: false,
    pagination: true,
    autoplay: false,
  };

  initSliderContent();
  initSliderBtns();

  if (options.pagination) {
    initSliderPagination();
  }

  if (options.autoplay) {
    initAutoplay();
  }

  function initSliderContent() {
    content.forEach((image, index) => {
      let chapter = `<li class="projects-chapter__item">
      <button class="btn projects-chapter__btn chapter-${index} ${
        index === 0 ? 'is-active' : ''
      } "data-index="${index}">
      ${content[index].chapter}<hr></button></li>`;
      projectChapterList.innerHTML += chapter;
      projectChapterList
        .querySelector('.is-active')
        .setAttribute('tabindex', '-1');
      projectChapterList
        .querySelectorAll('.projects-chapter__btn')
        .forEach((item) => {
          item.addEventListener('click', function() {
            moveSliderImages(this.dataset.index);
          });
        });

      let img = `<img class="projects-content-image img-${index} ${
        index === 0 ? 'is-active' : ''
      }" src="${content[index].src}" data-index="${index}"></img>`;

      sliderImages.innerHTML += img;

      let city = `<p class="projects-params__descr city city-${index} ${
        index === 0 ? 'is-active' : ''
      } "data-index="${index}">${content[index].city}</p>`;

      projectParamsDescrCity.innerHTML += city;

      let area = `<p class="projects-params__descr area area-${index} ${
        index === 0 ? 'is-active' : ''
      } "data-index="${index}">${content[index].area}</p>`;

      projectParamsDescrArea.innerHTML += area;

      let time = `<p class="projects-params__descr time time-${index} ${
        index === 0 ? 'is-active' : ''
      } "data-index="${index}">${content[index].time}</p>`;

      projectParamsDescrTime.innerHTML += time;

      let cost = `<p class="projects-params__descr cost cost-${index} ${
        index === 0 ? 'is-active' : ''
      } "data-index="${index}">${content[index].cost}</p>`;

      projectParamsDescrCost.innerHTML += cost;
    });
  }

  function initSliderBtns() {
    sliderNavigation
      .querySelectorAll('.projects-slider-nav__btn')
      .forEach((btn) => {
        btn.addEventListener('click', function () {
          let currentImg =
            +sliderImages.querySelector('.is-active').dataset.index;
          let nextImg;
          if (btn.classList.contains('prev')) {
            nextImg = currentImg === 0 ? content.length - 1 : currentImg - 1;
          } else {
            nextImg = currentImg === content.length - 1 ? 0 : currentImg + 1;
          }
          moveSliderImages(nextImg);
        });
      });
  }

  function initSliderPagination() {
    content.forEach((image, index) => {
      let bullet = `<button class="btn slider-pagination-bullet img-${index} ${
        index === 0 ? 'is-active' : ''
      }" data-index="${index}"></button>`;
      sliderPaginationBullets.innerHTML += bullet;
    });
    sliderPaginationBullets
      .querySelectorAll('.slider-pagination-bullet')
      .forEach((blt) => {
        blt.addEventListener('click', function () {
          moveSliderImages(this.dataset.index);
        });
      });
  }

  function moveSliderImages(num) {
    projectChapterList
      .querySelector('.is-active')
      .removeAttribute('tabindex', '-1');
    projectChapterList
      .querySelector('.is-active')
      .classList.remove('is-active');
    projectChapterList
      .querySelector('.chapter-' + num)
      .classList.add('is-active');
    projectChapterList
      .querySelector('.chapter-' + num)
      .setAttribute('tabindex', '-1');
    sliderImages.querySelector('.is-active').classList.remove('is-active');
    sliderImages.querySelector('.img-' + num).classList.add('is-active');
    projectParamsDescrCity
      .querySelector('.is-active')
      .classList.remove('is-active');
    projectParamsDescrCity
      .querySelector('.city-' + num)
      .classList.add('is-active');
    projectParamsDescrArea
      .querySelector('.is-active')
      .classList.remove('is-active');
    projectParamsDescrArea
      .querySelector('.area-' + num)
      .classList.add('is-active');
    projectParamsDescrTime
      .querySelector('.is-active')
      .classList.remove('is-active');
    projectParamsDescrTime
      .querySelector('.time-' + num)
      .classList.add('is-active');
    projectParamsDescrCost
      .querySelector('.is-active')
      .classList.remove('is-active');
    projectParamsDescrCost
      .querySelector('.cost-' + num)
      .classList.add('is-active');
    if (options.pagination) {
      sliderPaginationBullets
        .querySelector('.is-active')
        .classList.remove('is-active');
      sliderPaginationBullets
        .querySelector('.img-' + num)
        .classList.add('is-active');
    }
  }

  function initAutoplay() {
    setInterval(() => {
      let currentImg = +sliderImages.querySelector('.is-active').dataset.index;
      let nextImg = currentImg === content.length - 1 ? 0 : currentImg + 1;

      moveSliderImages(nextImg);
    }, options.autoplayInterval);
  }
}
