document.querySelectorAll('input[name="apiType"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    showLoading(true);
    fetchAndDisplayData(this.value);
  });
});

function showLoading(isLoading) {
  const loadingDiv = document.getElementById("loading");
  loadingDiv.style.display = isLoading ? "block" : "none";
}

function fetchAndDisplayData(apiType) {
  let endpoint;
  if (apiType === "allCharacter") {
    endpoint = "https://ihatov08.github.io/kimetsu_api/api/all.json";
  } else if (apiType === "hashira") {
    endpoint = "https://ihatov08.github.io/kimetsu_api/api/hashira.json";
  } else if (apiType === "oni") {
    endpoint = "https://ihatov08.github.io/kimetsu_api/api/oni.json";
  } else if (apiType === "kisatsutai") {
    endpoint = "https://ihatov08.github.io/kimetsu_api/api/kisatsutai.json";
  }

  fetch(endpoint)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const jsonDataDiv = document.getElementById("jsonData");
      jsonDataDiv.innerHTML = "";

      data.forEach((item) => {
        const name = document.createElement("p");
        name.textContent = `Name: ${item.name}`;

        const image = document.createElement("img");
        image.src = item.image;

        const category = document.createElement("p");
        category.textContent = `Category: ${item.category}`;

        const itemDiv = document.createElement("div");
        itemDiv.appendChild(name);
        itemDiv.appendChild(image);
        itemDiv.appendChild(category);

        jsonDataDiv.appendChild(itemDiv);
      });
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
    })
    .finally(() => {
      showLoading(false);
    });
}
