// --- Interfaces ---
interface DataType {
  name: string;
  price: number;
  rating: number;
  type: string;
  img: string;
}

interface BasketItem {
  id: string;
  name: string;
  price: number;
  img: string;
  quantity: number;
}

const header: HTMLElement | null = document.querySelector(".header");
const basket: HTMLElement | null = document.querySelector(".basket");
const headerDots: HTMLElement | null = document.querySelector(".header__dots");
const headerMenuMobile: HTMLElement | null = document.querySelector(".header__menu__mobile");
const allItemsContainer = document.querySelector(".all-items__items");
const seeAllButton: HTMLElement | null = document.querySelector(".all-items__see-all");
const categoriesBlock = document.querySelector(".all-items__categories__block");
const priceRangeInput = document.querySelector(".all-items__range") as HTMLInputElement;
const priceValue = document.querySelector(".all-items__value") as HTMLElement;
const searchInput = document.querySelector(".all-items__input") as HTMLInputElement;

const headerCross: HTMLElement | null = document.querySelector(".header__cross");
const basketCross: HTMLElement | null = document.querySelector(".basket__cross");
const basketIcon: HTMLElement | null = document.querySelector(".basket__icon");

const mainpagePage: HTMLElement | null = document.querySelector(".mainpage");
const ourHistoryPage: HTMLElement | null = document.querySelector(".our-history");
const allItemsPage: HTMLElement | null = document.querySelector(".all-items");

const mainpageItemMenu: NodeListOf<HTMLElement> = document.querySelectorAll(".mainpage-item");
const ourHistoryItemMenu: NodeListOf<HTMLElement> = document.querySelectorAll(".our-history-item");
const allItemsItemMenu: NodeListOf<HTMLElement> = document.querySelectorAll(".all-items-item");
const allFoxes: HTMLElement | null = document.querySelector(".mainpage__all-btn");

let items: DataType[] = [];
let seeAllButtonHidden = false;

const fetchData = async (): Promise<DataType[]> => {
  try {
    const response = await fetch("../data.json");
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return [];
  }
};

const switchTab = (displayElement: HTMLElement, hideElements: HTMLElement[]) => {
  displayElement.style.display = "flex";
  hideElements.forEach((element) => (element.style.display = "none"));
};

const handleHeaderMenuMobile = () => {
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
};

const handleBasket = () => {
  basketIcon?.addEventListener("click", (event) => {
    event.preventDefault();
    basket?.classList.remove("basket-hidden");
    basket?.classList.add("basket-active");
  });

  basketCross?.addEventListener("click", (event) => {
    event.preventDefault();
    basket?.classList.remove("basket-active");
    basket?.classList.add("basket-hidden");
  });
};

const handleTabSwitches = () => {
  mainpageItemMenu.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      if (mainpagePage && ourHistoryPage && allItemsPage && header) {
        switchTab(mainpagePage, [ourHistoryPage, allItemsPage]);
        header.style.position = "absolute";
      }
    });
  });

  ourHistoryItemMenu.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      if (mainpagePage && ourHistoryPage && allItemsPage && header) {
        switchTab(ourHistoryPage, [mainpagePage, allItemsPage]);
        header.style.position = "relative";
      }
    });
  });

  allItemsItemMenu.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      if (mainpagePage && ourHistoryPage && allItemsPage && header) {
        switchTab(allItemsPage, [mainpagePage, ourHistoryPage]);
        header.style.position = "relative";
      }
    });
  });
  
  allFoxes?.addEventListener("click", (event) => {
    event.preventDefault();
    if (mainpagePage && ourHistoryPage && allItemsPage && header) {
      switchTab(allItemsPage, [mainpagePage, ourHistoryPage]);
      header.style.position = "relative";
    }
  });
};

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;
  return "★".repeat(fullStars) + "✩".repeat(emptyStars);
};

const renderItems = (items: DataType[], limit: number) => {
  const limitedItems = items.slice(0, limit);
  const itemHTML = limitedItems
    .map((item) => {
      const stars = renderStars(item.rating);
      return `
      <div class="all-items__item" data-type="${item.type}" data-price="${item.price}">
        <div class="all-items__btn">
          <span class="all-items__plus">+</span>
          <span>Add</span>
        </div>
        <img src="./assets/foxes/${item.img}" alt="fox" />
        <div class="all-items__info">
          <div class="all-items__title">${item.name}</div>
          <div class="all-items__price">$${item.price.toFixed(2)}</div>
          <div class="all-items__stars">
            ${stars}
          </div>
          <div class="all-items__class">${item.type}</div>
        </div>
      </div>
    `;
    })
    .join("");

  if (allItemsContainer) allItemsContainer.innerHTML = itemHTML;

  // Show or hide the "See All" button based on the number of items
  if (items.length > limit) {
    seeAllButton?.classList.remove("hidden");
    seeAllButtonHidden = false;
  } else if (items.length === 0 && !seeAllButtonHidden) {
    seeAllButtonHidden = true;
  }
};

const handleSeeAllClick = () => {
  seeAllButton?.addEventListener("click", (event) => {
    event.preventDefault();
    renderItems(items, items.length);
    seeAllButton.style.display = "none";
  });
};

// Update basket items from localStorage
const updateBasket = () => {
  const basketContainer = document.querySelector(".basket__cards") as HTMLElement;
  const basketItems = JSON.parse(localStorage.getItem('basketItems') || '[]') as BasketItem[];

  if (basketItems.length > 0) {
    basketContainer.innerHTML = basketItems.map(item => `
      <div class="basket__card" data-id="${item.id}">
        <div class="basket__info">
          <img src="./assets/foxes/${item.img}" alt="${item.name}" class="basket__img" />
          <div class="basket__text">
            <div class="basket__title">${item.name}</div>
            <div class="basket__price">$${item.price.toFixed(2)}</div>
          </div>
        </div>
        <div class="basket__counter">
          <div class="basket__counter__block">
            <div class="basket__minus">-</div>
            <div class="basket__count">${item.quantity}</div>
            <div class="basket__plus">+</div>
          </div>
          <div class="basket__counter__delete">
            <div class="basket__remove">Remove</div>
            <img src="./assets/icons/crossCircle.png" alt="" />
          </div>
        </div>
      </div>
    `).join("");
  } else {
    basketContainer.innerHTML = "<p>Your basket is empty.</p>";
  }

  updateBasketTotal();
};

const updateBasketTotal = () => {
  const basketItems = JSON.parse(localStorage.getItem('basketItems') || '[]') as BasketItem[];
  const totalElement = document.querySelector(".basket__total") as HTMLElement;

  const total = basketItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  totalElement.textContent = `Total: $${total.toFixed(2)}`;
};

const handleBasketItemEvents = () => {
  const basketContainer = document.querySelector(".basket__cards") as HTMLElement;

  basketContainer.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const basketItemElement = target.closest(".basket__card") as HTMLElement;
    if (!basketItemElement) return;

    const itemId = basketItemElement.dataset.id as string;
    const basketItems = JSON.parse(localStorage.getItem('basketItems') || '[]') as BasketItem[];
    const itemIndex = basketItems.findIndex(item => item.id === itemId);

    if (target.classList.contains("basket__minus")) {
      if (basketItems[itemIndex].quantity > 1) {
        basketItems[itemIndex].quantity -= 1;
      }
    } else if (target.classList.contains("basket__plus")) {
      basketItems[itemIndex].quantity += 1;
    } else if (target.classList.contains("basket__remove") || target.closest(".basket__counter__delete")) {
      basketItems.splice(itemIndex, 1);
    }

    localStorage.setItem('basketItems', JSON.stringify(basketItems));
    updateBasket();
  });
};

const addToBasket = (item: DataType) => {
  const basketItems = JSON.parse(localStorage.getItem('basketItems') || '[]') as BasketItem[];
  const existingItemIndex = basketItems.findIndex(basketItem => basketItem.id === item.name);

  if (existingItemIndex > -1) {
    basketItems[existingItemIndex].quantity += 1;
  } else {
    basketItems.push({
      id: item.name,
      name: item.name,
      price: item.price,
      img: item.img,
      quantity: 1
    });
  }

  localStorage.setItem('basketItems', JSON.stringify(basketItems));
  updateBasket();
};

// Adding event listeners to dynamically added items in the basket
document.addEventListener("DOMContentLoaded", () => {
  updateBasket();
  handleBasketItemEvents();
});

const handleAddToBasket = () => {
  allItemsContainer?.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains("all-items__plus")) {
      const itemElement = target.closest(".all-items__item") as HTMLElement;
      if (!itemElement) return;

      // Getting item information
      const itemName = itemElement.querySelector(".all-items__title")?.textContent || "";
      const itemPrice = parseFloat(itemElement.querySelector(".all-items__price")?.textContent?.replace('$', '') || "0");
      const itemImg = (itemElement.querySelector("img") as HTMLImageElement)?.src.split('/').pop() || "";
      
      // Creating item object
      const item = {
        name: itemName,
        price: itemPrice,
        rating: 0, // Placeholder value
        type: "",  // Placeholder value
        img: itemImg
      };

      addToBasket(item);
    }
  });
};

const handleSearch = () => {
  searchInput?.addEventListener("input", () => {
    const searchValue = searchInput.value.toLowerCase();
    const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchValue));
    renderItems(filteredItems, filteredItems.length);
  });
};

const handleCategories = () => {
  const uniqueCategories = [...new Set(items.map(item => item.type))];

  if (categoriesBlock) {
    categoriesBlock.innerHTML = `
      <div class="all-items__category" data-category="all">All</div>
      ${uniqueCategories.map(category => `<div class="all-items__category" data-category="${category}">${category}</div>`).join("")}
    `;
    
    categoriesBlock.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains("all-items__category")) {
        const category = target.getAttribute("data-category") || "all";
        filterItemsByCategory(category);
      }
    });
  }
};

const handlePriceRange = () => {
  const maxPrice = Math.max(...items.map(item => item.price));
  priceRangeInput.max = maxPrice.toString();
  priceRangeInput.value = maxPrice.toString();
  priceValue.textContent = `Value: $${maxPrice.toFixed(2)}`;

  priceRangeInput?.addEventListener("input", () => {
    const selectedPrice = parseFloat(priceRangeInput.value);
    priceValue.textContent = `Value: $${selectedPrice.toFixed(2)}`;
    filterItemsByPrice(selectedPrice);
  });
};

const filterItemsByCategory = (category: string) => {
  const filteredItems = items.filter(item => category === "all" || item.type === category);
  renderItems(filteredItems, filteredItems.length);
};

const filterItemsByPrice = (price: number) => {
  const filteredItems = items.filter(item => item.price <= price);
  renderItems(filteredItems, filteredItems.length);
};

(async () => {
  items = await fetchData();
  console.log(items);

  handleHeaderMenuMobile();
  handleBasket();
  handleTabSwitches();
  handleAddToBasket();
  handleSearch();
  handleCategories();
  handlePriceRange();
  handleSeeAllClick();

  if (items.length) {
    renderItems(items, 6);
  }
})();
