import "./styles.css";

if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

function initializeCode() {
  const container = document.createElement("div");
  container.classList.add("container");

  async function fetchDogImage() {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.log("Error fetching dog image:", error);
    }
  }

  async function fetchBreedSummary(breed) {
    try {
      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${breed}`
      );
      const data = await response.json();
      return data.extract;
    } catch (error) {
      console.log("Error fetching dog summary:", error);
    }
  }

  async function generateWikiItem(breed) {
    const wikiItem = document.createElement("div");
    wikiItem.classList.add("wiki-item");

    const wikiHeader = document.createElement("h1");
    wikiHeader.classList.add("wiki-header");
    wikiHeader.textContent = breed;

    const wikiContent = document.createElement("div");
    wikiContent.classList.add("wiki-content");

    const wikiText = document.createElement("p");
    wikiText.classList.add("wiki-text");
    const summaryText = await fetchBreedSummary(breed);
    wikiText.textContent = summaryText;

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");

    const imgElement = document.createElement("img");
    imgElement.classList.add("wiki-img");
    const dogImage = await fetchDogImage();
    imgElement.src = dogImage;

    imgContainer.appendChild(imgElement);
    wikiContent.appendChild(wikiText);
    wikiContent.appendChild(imgContainer);

    wikiItem.appendChild(wikiHeader);
    wikiItem.appendChild(wikiContent);

    return wikiItem;
  }

  async function generateContainer() {
    const breeds = [
      "German Shephard",
      "Bull Dog",
      "Labrador",
      "Husky",
      "Hound"
    ];

    for (const breed of breeds) {
      const wikiItem = await generateWikiItem(breed);
      container.appendChild(wikiItem);
    }

    document.body.appendChild(container);
  }

  generateContainer();
}
