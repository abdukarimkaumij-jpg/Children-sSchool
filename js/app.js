// === Подключение HTML (header, footer и т.д.) ===
async function includeHTML() {
  const elements = document.querySelectorAll('[data-include]');

  const promises = Array.from(elements).map(async (el) => {
    const file = el.getAttribute('data-include');

    try {
      const res = await fetch(file);

      if (!res.ok) {
        el.innerHTML = `Ошибка загрузки: ${file}`;
        return;
      }

      const html = await res.text();
      el.innerHTML = html;

    } catch (error) {
      el.innerHTML = `Ошибка: ${file}<br>${error.message}`;
    }
  });

  await Promise.all(promises);
}


// === Бургер ===
function initBurger() {
  const burger = document.querySelector(".header__novbar-burger");
  const nav = document.querySelector(".header__novbar-menu");

  if (!burger || !nav) return;

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    nav.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !burger.contains(e.target)) {
      nav.classList.remove("active");
      burger.classList.remove("active");
    }
  });
}


// === Скролл ===
function initScroll() {
  const banner = document.querySelector(".header__content-banner");
  const navbar = document.querySelector(".header__content-novbar");

  if (!banner || !navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > banner.offsetHeight) {
      banner.classList.add("scrolled");
      navbar.classList.add("scrolled");
    } else {
      banner.classList.remove("scrolled");
      navbar.classList.remove("scrolled");
    }
  });
}


// === Swiper ===
function initSwiper() {

  // Первый слайдер
  if (document.querySelector(".mySwiper")) {
    new Swiper(".mySwiper", {
      slidesPerView: 3,
      spaceBetween: 50,
      freeMode: true,

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      breakpoints: {
        0: { slidesPerView: 1, spaceBetween: 10 },
        768: { slidesPerView: 1, spaceBetween: 30 },
        1024: { slidesPerView: 3, spaceBetween: 50 }
      }
    });
  }

  // Второй слайдер
  if (document.querySelector(".achievements-mySwiper")) {
    new Swiper(".achievements-mySwiper", {
      slidesPerView: 3,
      spaceBetween: 30,
      freeMode: true,

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
}

// === FAQ ===
function initQuestions() {
  const items = document.querySelectorAll('.question__wrap-flex');
  if (!items.length) return;

  items.forEach(item => {
    item.addEventListener('click', () => {
      const body = item.querySelector('.question__flex-body');
      const top = item.querySelector('.question__flex-top');

      item.classList.toggle('active');
      body?.classList.toggle('active');
      top?.classList.toggle('active');
    });
  });
}

document.querySelectorAll(".gallery__flex-bg").forEach((block) => {
  const swiper = new Swiper(block.querySelector(".galleryMySwiper"), {
    slidesPerView: 5,
    spaceBetween: 10,
    navigation: {
      nextEl: block.querySelector(".swiper-button-next"),
      prevEl: block.querySelector(".swiper-button-prev"),
    },
    breakpoints: {
      0: {slidesPerView: 1},
      768: {slidesPerView: 1},
      955: { slidesPerView: 2 },
      1024: { slidesPerView: 3},
      1440: { slidesPerView: 4}
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".gallery__button-btn");
    const items = document.querySelectorAll(".gallery__sartyrofka-body");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;

            // active кнопка
            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            items.forEach(item => {
                const categories = item.dataset.category.split(" ");

                if (filter === "all" || categories.includes(filter)) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });
});

// === Запуск ===
document.addEventListener("DOMContentLoaded", async () => {
  await includeHTML();

  // даём браузеру применить вставленный HTML
  requestAnimationFrame(() => {
    initBurger();
    initScroll();
    initSwiper();
    initQuestions();
  });
});