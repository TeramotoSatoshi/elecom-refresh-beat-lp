// Header height calculation
(function () {
  function setHeaderHeightVar() {
    const header = document.querySelector('.header');
    const h = header ? header.offsetHeight : 0;
    document.documentElement.style.setProperty('--header-h', h + 'px');
  }
  window.addEventListener('DOMContentLoaded', setHeaderHeightVar);
  window.addEventListener('load', setHeaderHeightVar);
  window.addEventListener('resize', setHeaderHeightVar);
})();

document.addEventListener('DOMContentLoaded', () => {
  const setupSwiperCarousels = () => {
    const thumbSwiper = new Swiper('.product-details__thumb-swiper', {
      spaceBetween: 10,
      slidesPerView: 4,
      watchSlidesProgress: true,
    });

    new Swiper('.main-visual__swiper', {
      loop: true,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      autoplay: { delay: 4000, disableOnInteraction: false },
      pagination: {
        el: '.main-visual__pagination-out .swiper-pagination',
        clickable: true,
        type: 'bullets'
      },
    });

    new Swiper('.product-details__main-swiper', {
      loop: true,
      spaceBetween: 10,
      speed: 1000,
      effect: 'slide',
      thumbs: {
        swiper: thumbSwiper,
      },
      navigation: {
        nextEl: '.product-details__gallery-nav--next',
        prevEl: '.product-details__gallery-nav--prev',
      },
    });
  };

  new Swiper('.product-feature__carousel', {
    loop: false,
    navigation: {
      nextEl: '.product-feature__carousel-button--next',
      prevEl: '.product-feature__carousel-button--prev',
    },
    pagination: {
      el: '.product-feature__carousel-pagination',
      clickable: true,
    },
  });

  new Swiper('.promo-slider__carousel', {
    loop: false,
    speed: 1000,
    navigation: {
      nextEl: '.promo-slider__nav-button--next',
      prevEl: '.promo-slider__nav-button--prev',
    },
    pagination: {
      el: '.promo-slider__pagination',
      clickable: true,
    },
  });

  new Swiper(".user-voice__slider", {
    loop: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 20,
    initialSlide: 1,
    pagination: {
      el: '.user-voice__pagination',
      clickable: true,
    },
  });

  const productThumbSwiper = new Swiper('.product__thumb-swiper', {
    spaceBetween: 10,
    slidesPerView: 4,
    watchSlidesProgress: true,
  });

  new Swiper('.product__main-swiper', {
    loop: true,
    spaceBetween: 10,
    speed: 1000,
    effect: 'slide',
    thumbs: {
      swiper: productThumbSwiper,
    },
    navigation: {
      nextEl: '.product__gallery-nav--next',
      prevEl: '.product__gallery-nav--prev',
    },
  });

  (function () {
    const thumb = document.querySelector('.product__thumb-swiper')?.swiper;
    const main = document.querySelector('.product__main-swiper')?.swiper;
    if (!thumb || !main) return;

    const VISIBLE = 4;
    let prev = main.realIndex ?? 0;

    function alignThumbs(selectedIndex, direction) {
      const last = thumb.slides.length - 1;

      if (selectedIndex <= 0) {
        thumb.slideTo(0, 300);
        return;
      }
      if (selectedIndex >= last) {
        thumb.slideTo(Math.max(0, last - (VISIBLE - 1)), 300);
        return;
      }

      if (direction === 'right') {
        thumb.slideTo(selectedIndex - 1, 300);
      } else if (direction === 'left') {
        thumb.slideTo(selectedIndex - 2, 300);
      }
    }

    main.on('slideChange', () => {
      const cur = main.realIndex;
      const dir = cur > prev ? 'right' : cur < prev ? 'left' : null;
      alignThumbs(cur, dir);
      prev = cur;
    });

    thumb.on('click', (sw) => {
      if (typeof sw.clickedIndex !== 'number') return;
      const cur = sw.clickedIndex;
      const dir = cur > prev ? 'right' : cur < prev ? 'left' : null;
      alignThumbs(cur, dir);
      prev = cur;
    });

    alignThumbs(main.realIndex ?? 0, 'right');
  })();

  const setupVideoPlayer = () => {
    const videoFrame = document.getElementById('howto-video');
    const links = document.querySelectorAll('.howto__link-item');

    if (!videoFrame || links.length === 0) return;

    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const videoId = link.getAttribute('data-video-id');
        if (videoId) {
          videoFrame.src = "https://www.youtube.com/embed/" + encodeURIComponent(videoId);
        }
      });
    });
  };

  setupSwiperCarousels();
  setupVideoPlayer();
});