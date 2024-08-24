const header: HTMLElement | null = document.querySelector(".header");
const basket: HTMLElement | null = document.querySelector(".basket");
const headerDots: HTMLElement | null = document.querySelector(".header__dots");
const headerMenuMobile: HTMLElement | null = document.querySelector(
  ".header__menu__mobile"
);
const headerCross: HTMLElement | null =
  document.querySelector(".header__cross");
const basketCross: HTMLElement | null =
  document.querySelector(".basket__cross");
const basketIcon: HTMLElement | null = document.querySelector(".basket__icon");

const mainpageItems: NodeListOf<HTMLElement> =
  document.querySelectorAll(".mainpage-item");
const ourHistoryItems: NodeListOf<HTMLElement> =
  document.querySelectorAll(".our-history-item");
const allItemsItems: NodeListOf<HTMLElement> =
  document.querySelectorAll(".all-items-item");

const mainpage: HTMLElement | null = document.querySelector(".mainpage");
const ourHistory: HTMLElement | null = document.querySelector(".our-history");
const allItems: HTMLElement | null = document.querySelector(".all-items");

headerDots?.addEventListener("click", (event) => {
  event.preventDefault();
  headerMenuMobile?.classList.add("activeAn");
  header?.classList.add("black");
});

headerCross?.addEventListener("click", (event) => {
  event.preventDefault();
  headerMenuMobile?.classList.remove("activeAn");
  header?.classList.remove("black");
});

basketIcon?.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("headerDots clicked");
  basket?.classList.remove("basket-hidden");
  basket?.classList.add("basket-active");
});

basketCross?.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("headerDots clicked");
  basket?.classList.remove("basket-active");
  basket?.classList.add("basket-hidden");
});

const switchTab = (
  displayElement: HTMLElement,
  hideElements: HTMLElement[]
) => {
  displayElement.style.display = "flex";
  hideElements.forEach((element) => (element.style.display = "none"));
};

mainpageItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    if (mainpage && ourHistory && allItems && header) {
      switchTab(mainpage, [ourHistory, allItems]);
      header.style.position = "absolute";
    }
  });
});

ourHistoryItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    if (mainpage && ourHistory && allItems && header) {
      switchTab(ourHistory, [mainpage, allItems]);
      header.style.position = "relative";
    }
  });
});

allItemsItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    if (mainpage && ourHistory && allItems && header) {
      switchTab(allItems, [mainpage, ourHistory]);
      header.style.position = "relative";
    }
  });
});
