import { CSS_COLORS } from "./cssColors.js";

let color: HTMLElement | null = document.querySelector(".color");
let btn: HTMLElement | null = document.querySelector(".btn");

const getRandom = (maxValue: number): number =>
  Math.floor(Math.random() * maxValue);

const generateRandomHexColor = (): string => {
  const characters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += characters[getRandom(16)];
  }
  return color;
};

const generateRGBAColor = (): string =>
  `rgb(${getRandom(256)}, ${getRandom(256)}, ${getRandom(256)})`;

const generateTextColor = (): string =>
  CSS_COLORS[getRandom(CSS_COLORS.length)];

const changeCSS = (randomColor: string): void => {
  if (!color) return;
  color.innerHTML = randomColor;
  document.body.style.backgroundColor = randomColor;
  color.textContent = randomColor;
  color.style.color = randomColor;
};

if (btn) {
  btn.addEventListener("click", () => {
    const randomNumber: number = getRandom(3);
    let randomColor: string;
    if (randomNumber === 0) {
      randomColor = generateRandomHexColor();
      changeCSS(randomColor);
    } else if (randomNumber === 1) {
      randomColor = generateRGBAColor();
      changeCSS(randomColor);
    } else {
      randomColor = generateTextColor();
      changeCSS(randomColor);
    }
  });
}
