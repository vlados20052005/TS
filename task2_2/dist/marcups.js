export const card = (img, title, likes, describe) => {
    const maxLength = 100;
    const isTruncated = describe.length > maxLength;
    const shortDescription = isTruncated
        ? describe.slice(0, maxLength) + "..."
        : describe;
    return `<div class="card">
          <img src="./assets/${img}" class="img" />
          <div class="describe">
            <div class="up">
              <div class="title">${title}</div>
              <div class="likes">
                <img src="./assets/heart.png" class="heart" />${likes}
              </div>
            </div>
            <div class="card__line"></div>
            <div class="text">
              <span class="short-text">${shortDescription}</span>
              ${isTruncated
        ? `<span class="full-text" style="display:none;">${describe}</span><span class="read-more">Read More</span>`
        : ""}
            </div>
          </div>
        </div>`;
};
export const category = (title, index) => {
    return `<label name="category" class="category" data-id="${index + 1}"
          ><input type="radio" style="display: none" />${title}</label
        >`;
};
