let images = [
  {
    src: 'https://img.favcars.com/mini/hatch/mini_hatch_2010_wallpapers_14_1280x960.jpg',
    title: 'Mini Cooper черный',
  },
  {
    src: 'https://img.favcars.com/mini/cabrio/mini_cabrio_2009_pictures_5_1280x960.jpg',
    title: 'Mini Cooper красный',
  },
  {
    src: 'https://www.t-r-n.ru/files/modification-images/cb/a8/5c/f9/40061_tmb940.jpg',
    title: 'Mini Cooper синий',
  },
  {
    src: 'https://i.pinimg.com/736x/c5/d9/14/c5d9142556fe74c49a2c1c2d4ea6d46a.jpg',
    title: 'Mini Cooper бордовый',
  },
];

function initSlider() {
  if (!images || !images.length) return;

  let sliderImages = document.querySelector('.projects-content__wrap');
  let sliderBtns = document.querySelector('.projects-slider-nav');
  let sliderPaginationBullets = document.querySelector('.projects-slider-pagination__wrap');

  initSliderImages();
  initSliderBtns();
  initSliderPagination()
  initAutoplay()
  
  function initSliderImages() {
    images.forEach((image, index) => {
      let img = `<img class="projects-content-image img-${index} ${index === 0 ? "is-active" : ""}" src="${images[index].src}" data-index="${index}"></img>`;
      sliderImages.innerHTML += img;
    });
  }

  function initSliderBtns() {
    sliderBtns.querySelectorAll('.projects-slider-nav__btn').forEach(btn => {
      btn.addEventListener("click", function() {
        let currentImg = +sliderImages.querySelector('.is-active').dataset.index;
        let nextImg;
        if (btn.classList.contains("prev")) {
          nextImg = currentImg === 0 ? images.length - 1 : currentImg - 1;
        } else {
          nextImg = currentImg === images.length - 1 ? 0 : currentImg + 1;
        }
        moveSlider(nextImg);
      });
    });
  }

  function initSliderPagination() {
    images.forEach((image, index) => {
      let bullet = `<span class="slider-pagination-bullet img-${index} ${index === 0 ? "is-active" : ""}" data-index="${index}"></span>`;
      sliderPaginationBullets.innerHTML += bullet;
    });
    sliderPaginationBullets.querySelectorAll(".slider-pagination-bullet").forEach(bullet => {
      bullet.addEventListener("click", function() {
        moveSlider(this.dataset.index);
      })
    })
  }

  function moveSlider(num) {
    sliderImages.querySelector('.is-active').classList.remove('is-active');
    sliderImages.querySelector('.img-' + num).classList.add('is-active');
    sliderPaginationBullets.querySelector('.is-active').classList.remove('is-active')
    sliderPaginationBullets.querySelector('.img-' + num).classList.add('is-active');
  }

  function initAutoplay() {
    setInterval(() => {
      let currentImg = +sliderImages.querySelector(".is-active").dataset.index;
      let nextImg = currentImg === images.length - 1 ? 0 : currentImg + 1;
      moveSlider(nextImg);
    }, 5000);
  }
}

document.addEventListener('DOMContentLoaded', initSlider)
