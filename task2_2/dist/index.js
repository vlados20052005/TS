import { categories, foxes } from "./data.js";
import { card, category } from "./marcups.js";
const categoriesHtml = document.querySelector(".categories");
const wrapper = document.querySelector(".wrapper");
if (categoriesHtml) {
    categoriesHtml.innerHTML = categories
        .map((value, index) => category(value, index))
        .join("");
}
const renderFoxes = (categoryId) => {
    if (wrapper) {
        const filteredFoxes = foxes.filter((fox) => fox.category === categoryId);
        wrapper.innerHTML = filteredFoxes
            .map((fox) => card(fox.img, fox.name, fox.likes, fox.describe))
            .join("");
        const readMoreButtons = wrapper.querySelectorAll(".read-more");
        readMoreButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const cardElement = button.closest(".card");
                const shortText = cardElement?.querySelector(".short-text");
                const fullText = cardElement?.querySelector(".full-text");
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
        const target = event.target;
        if (target && target.classList.contains("category")) {
            const categoryId = parseInt(target.getAttribute("data-id") || "0", 10);
            const allCategories = categoriesHtml.querySelectorAll(".category");
            allCategories.forEach((category) => category.classList.remove("active"));
            target.classList.add("active");
            renderFoxes(categoryId);
        }
    });
}
