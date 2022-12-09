const itemContainer = document.querySelectorAll(".item-container");
const itemCard = document.querySelectorAll(".slider__item");
const imageSources = document.querySelectorAll(".header-bg");
const headerImgbox = document.querySelector(".head__imgbox");
const resetBtn = document.querySelector(".reset");
const listTitle = document.querySelectorAll(".list__title");
let currentHeaderSlide = 0;

//sticky nav

const setStickyNav = () => {
  if (document.documentElement.scrollTop > 800) {
    document.querySelector(".navigation").classList.add("sticky-nav");
  } else {
    document.querySelector(".navigation").classList.remove("sticky-nav");
  }
};
document.addEventListener("scroll", setStickyNav);

//mobile nav

document
  .querySelector(".mobile-navigation")
  .addEventListener("click", (e) =>
    e.currentTarget.classList.toggle("mobile-navigation--open")
  );

// HEADER HOUSE CARDS
//load header img box bg
const loadBg = (time, bg) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      headerImgbox.style.backgroundImage = "url(" + bg + ")";

      resolve();
    }, time * 1000);
  });
};

//swap header imgbox bg
const swapBackground = async (bg) => {
  console.log(bg);
  headerImgbox.classList.remove("fade-in");
  headerImgbox.classList.add("fade-out");
  await loadBg(0.7, bg);
  headerImgbox.classList.remove("fade-out");
  headerImgbox.classList.add("fade-in");
};

// sliding header houses
const slideHouses = function (index) {
  if (currentHeaderSlide === index) return;
  let howMuchToSlide = index * 100;
  let imageSource = imageSources[index].src;
  swapBackground(imageSource);
  console.log("hi");
  itemContainer.forEach((item) => {
    item.style.transform = "translateX(-" + howMuchToSlide + "%)";
  });
  currentHeaderSlide = index;
};

itemCard.forEach((item, index) => {
  item.addEventListener("click", function () {
    slideHouses(index);
  });
  // console.log(index);
});

resetBtn.addEventListener("click", () => {
  slideHouses(0);
});
// HEADER HOUSE CARDS END

// hidden list headery atvaizdavimas ir logika
const hiddenList = ["Vilnius", "Kaunas", "Klaipeda", "Panevezys"];
const hiddenList2 = ["Industrial Home", "Farm", "City Districts"];
let hiddenListItem;
let hiddenListItem2;
let selectedCity = 0;

// loadinam hidden lista
const loadHiddenList = (list, where, type) => {
  const hiddenListLocation = where;
  list.forEach((list) => {
    let html = `<li class="hidden__list__item--${type}">${list}</li>`;
    hiddenListLocation.insertAdjacentHTML("beforeend", html);
  });
  hiddenListItem = document.querySelectorAll(".hidden__list__item--city");
  hiddenListItem2 = document.querySelectorAll(".hidden__list__item--type");
};

//setinam pasirinkta miesta
const setCity = (city) => {
  document.querySelector(".list__selected__city").textContent =
    hiddenList[city];
};

const setType = (type) => {
  document.querySelector(".list__selected__type").textContent =
    hiddenList2[type];
};

//rodom arba paslepiam hidden lista.
const displayHiddenList = (item) => {
  let parrentList = item.currentTarget.parentElement;
  parrentList.classList.toggle("list--opened");
};

setCity(selectedCity);
loadHiddenList(
  hiddenList,
  document.querySelector(".hidden__list--location"),
  "city"
);
loadHiddenList(
  hiddenList2,
  document.querySelector(".hidden__list--type"),
  "type"
);
listTitle.forEach((item) => {
  item.addEventListener("click", displayHiddenList);
});

hiddenListItem.forEach((item, index) => {
  item.addEventListener("click", function () {
    setCity(index);
    // alert(index);
    // console.log(index);
  });
});

hiddenListItem2.forEach((item, index) => {
  item.addEventListener("click", function () {
    setType(index);
  });
});
// hidden list headery atvaizdavimas ir logika -------******

//houses gallery

const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const house = document.querySelectorAll(".homes__slider__box");
const houseSlider = document.querySelector(".homes__slider");
let currentSlide = 0;

houseSlider.addEventListener("scroll", () => {
  // console.log(
  //   house[1].getBoundingClientRect().left -
  //     houseSlider.getBoundingClientRect().left
  // );
  house.forEach((h, i) => {
    if (
      h.getBoundingClientRect().left -
        houseSlider.getBoundingClientRect().left ===
      0
    ) {
      setActiveCard(i);
    }
  });
});

const setActiveCard = function (slide) {
  house.forEach((e) => {
    e.classList.remove("homes__slider__box--selected");
  });
  house[slide].classList.add("homes__slider__box--selected");
  currentSlide = slide;
};

const slideCards = (slide) => {
  let howMuchToSlide = house[0].clientWidth * slide;
  document.querySelector(".homes__slider").scrollLeft = howMuchToSlide;
  setActiveCard(slide);
};

rightArrow.addEventListener("click", () => {
  currentSlide++;
  if (currentSlide > house.length - 1) currentSlide = 0;
  slideCards(currentSlide);
  console.log(currentSlide);
  console.log(document.querySelector(".homes__slider").scrollLeft);
});

leftArrow.addEventListener("click", () => {
  currentSlide--;
  if (currentSlide < 0) currentSlide = house.length - 1;

  slideCards(currentSlide);
});

house.forEach((item, index) => {
  item.addEventListener("click", () => {
    currentSlide = index;
    slideCards(currentSlide);
  });
});

//FAQ

const faqList = document.querySelectorAll(".faq__list");
faqList.forEach((e) => {
  e.addEventListener("click", (list) => {
    list.currentTarget.classList.toggle("faq__list__opened");
  });
});
