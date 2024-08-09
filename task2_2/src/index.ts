import { categories, foxes } from "./data.js";
import { card, category } from "./marcups.js";

interface Fox {
  name: string;
  describe: string;
  img: string;
  likes: number;
  category: number;
}

const categoriesHtml: HTMLElement | null =
  document.querySelector(".categories");
const wrapper: HTMLElement | null = document.querySelector(".wrapper");

if (categoriesHtml) {
  categoriesHtml.innerHTML = categories
    .map((value: string, index: number) => category(value, index))
    .join("");
}

const renderFoxes = (categoryId: number): void => {
  if (wrapper) {
    const filteredFoxes = foxes.filter(
      (fox: Fox) => fox.category === categoryId
    );
    wrapper.innerHTML = filteredFoxes
      .map((fox: Fox) => card(fox.img, fox.name, fox.likes, fox.describe))
      .join("");

    const readMoreButtons = wrapper.querySelectorAll(".read-more");
    readMoreButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const cardElement: HTMLElement | null = button.closest(".card");
        const shortText = cardElement?.querySelector(
          ".short-text"
        ) as HTMLElement | null;
        const fullText = cardElement?.querySelector(
          ".full-text"
        ) as HTMLElement | null;

        if (shortText && fullText) {
          shortText.style.display = "none";
          fullText.style.display = "inline";
          button.remove();
        }
      });
    });
  }
};

if (categoriesHtml) {
  categoriesHtml.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target && target.classList.contains("category")) {
      const categoryId = parseInt(target.getAttribute("data-id") || "0", 10);
      const allCategories = categoriesHtml.querySelectorAll(".category");
      allCategories.forEach((category) => category.classList.remove("active"));
      target.classList.add("active");
      renderFoxes(categoryId);
    }
  });
}
