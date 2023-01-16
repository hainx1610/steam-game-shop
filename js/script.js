const BASE_URL = "https://steam-api-dot-cs-platform-306304.et.r.appspot.com/";

const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("menu");

const allGamesArea = document.querySelector("#all-games-area");
const featuredArea = document.querySelector("#featured-area");
const moreGamesBtn = document.querySelector(".more-games");
const loadingMsg = document.querySelector(".loading-msg");
const genresList = document.querySelector("#genres-list");
const tagsList = document.querySelector("#tags-list");
const mainSectionTitle = document.querySelector("#main-section-title");
const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const mainContainer = document.querySelector(".main-container");
const singleSlot = document.querySelector(".single-slot");
const gameInfo = document.querySelector(".game-info");

let gamesList = [];
let pageCounter = 1;
let queryWord = "q";
let queryValue = "";
let appId = 0;
let loadingMode = "all";

// const getGames = async () => {
//   try {
//     const response = await fetch(
//       BASE_URL + `games?${queryWord}=${queryValue}&page=${pageCounter}`
//     );
//     if (response.ok) {
//       const data = await response.json();
//       return data;
//     }
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// const getOtherAPIs = async (queryType) => {
//   try {
//     const response = await fetch(BASE_URL + queryType);
//     if (response.ok) {
//       const data = await response.json();
//       return data;
//     }
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// const getSingle = async (appId) => {
//   try {
//     const response = await fetch(BASE_URL + `single-game/${appId}`);
//     if (response.ok) {
//       const data = await response.json();
//       // console.log("data", data)
//       return data;
//     }
//   } catch (error) {
//     console.log("error", error);
//   }
// };

const getData = async (dataType) => {
  try {
    let queryString = "";
    if (dataType === "all") {
      queryString = `games?${queryWord}=${queryValue}&page=${pageCounter}`;
    } else if (dataType === "single") {
      queryString = `single-game/${appId}`;
    } else {
      queryString = dataType;
    }

    const response = await fetch(BASE_URL + queryString);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log("error", error);
  }
};

// const renderGames = async (dataType) => {
//   try {
//     // get games from the API
//     loadingMsg.textContent = "Loading data..."; //for slow Internet
//     const data = await getData(dataType);
//     gamesList = data["data"];
//     if (!gamesList.length) {
//       featuredArea.textContent = "No games found!";
//       return;
//     }
//     loadingMsg.textContent = ""; //loading done!

//     gamesList.forEach((game) => {
//       const divElement = document.createElement("div");
//       divElement.className +=
//         "game-slot bg-blue-800 w-80 h-52 mb-6 md:mx-3 hover:cursor-pointer hover:brightness-90";
//       divElement.innerHTML = `<img src=${game["header_image"]} alt="" class="w-[100%] h-[75%]">
//         <div class="game-info h-[25%] flex justify-between items-center px-1 text-blue-300">
//             <p class="title">${game.name}</p>
//             <span class="price">$${game.price}</span>
//         </div>`;
//       allGamesArea.appendChild(divElement);
//       divElement.addEventListener("click", () => {
//         appId = game.appid;
//         window.scrollTo({ top: 0, behavior: "smooth" });
//         renderSingle();
//       });
//     });
//     pageCounter++;
//   } catch (error) {
//     console.log("error", error);
//   }
// };

const renderFeaturedGames = async () => {
  try {
    // get games from the API
    featuredArea.textContent = "Loading data..."; //for slow Internet
    const data = await getData("features");
    gamesList = data["data"];
    if (!gamesList.length) {
      featuredArea.textContent = "No games found!";
      return;
    }
    featuredArea.textContent = ""; //loading done!

    gamesList.forEach((game) => {
      const divElement = document.createElement("div");
      divElement.className +=
        "game-slot bg-blue-800 w-80 h-52 mb-6 md:mx-3 hover:cursor-pointer hover:brightness-90";
      divElement.innerHTML = `<img src=${game["header_image"]} alt="" class="w-[100%] h-[75%]">
        <div class="game-info h-[25%] flex justify-between items-center px-1 text-blue-300">
            <p class="title">${game.name}</p>
            <span class="price">$${game.price}</span>
        </div>`;
      featuredArea.appendChild(divElement);
      divElement.addEventListener("click", (e) => {
        appId = game.appid;
        window.scrollTo({ top: 0, behavior: "smooth" });
        renderSingle();
      });
    });
  } catch (error) {
    console.log("error", error);
  }
};

const renderGames = async (dataType) => {
  try {
    // get games from the API
    loadingMsg.textContent = "Loading data..."; //for slow Internet
    const data = await getData(dataType);
    gamesList = data["data"];
    if (!gamesList.length) {
      featuredArea.textContent = "No games found!";
      return;
    }
    loadingMsg.textContent = ""; //loading done!

    gamesList.forEach((game) => {
      const divElement = document.createElement("div");
      divElement.className +=
        "game-slot bg-blue-800 w-80 h-52 mb-6 md:mx-3 hover:cursor-pointer hover:brightness-90";
      divElement.innerHTML = `<img src=${game["header_image"]} alt="" class="w-[100%] h-[75%]">
        <div class="game-info h-[25%] flex justify-between items-center px-1 text-blue-300">
            <p class="title">${game.name}</p>
            <span class="price">$${game.price}</span>
        </div>`;
      allGamesArea.appendChild(divElement);
      divElement.addEventListener("click", () => {
        appId = game.appid;
        window.scrollTo({ top: 0, behavior: "smooth" });
        renderSingle();
      });
    });
    pageCounter++;
  } catch (error) {
    console.log("error", error);
  }
};

const renderGenres = async () => {
  try {
    const data = await getData("genres");
    const list = data["data"];
    list.forEach((item) => {
      const spanElement = document.createElement("span");
      spanElement.className += "hover:cursor-pointer hover:brightness-125";
      spanElement.textContent = `${item.name}`;

      genresList.appendChild(spanElement);
      spanElement.addEventListener("click", () => {
        mainSectionTitle.textContent = `Games by genre: ${item.name}`;
        singleSlot.classList.add("hidden");
        featuredArea.classList.add("hidden");
        allGamesArea.innerHTML = "";
        queryWord = "genres";
        queryValue = item.name;
        pageCounter = 1;
        renderGames("all");
      });
    });
  } catch (error) {
    console.log("error", error);
  }
};

const renderTags = async () => {
  try {
    const data = await getData("steamspy-tags");
    const list = data["data"];
    list.forEach((item) => {
      const spanElement = document.createElement("span");
      spanElement.className += "hover:cursor-pointer hover:brightness-125";
      spanElement.textContent = `${item.name}`;

      tagsList.appendChild(spanElement);
      spanElement.addEventListener("click", () => {
        mainSectionTitle.textContent = `Games by tags: ${item.name}`;
        singleSlot.classList.add("hidden");
        featuredArea.classList.add("hidden");
        allGamesArea.innerHTML = "";
        queryWord = "steamspy_tags";
        queryValue = item.name;
        pageCounter = 1;
        renderGames("all");
      });
    });
  } catch (error) {
    console.log("error", error);
  }
};

const renderSingle = async () => {
  try {
    // get games from the API
    singleSlot.classList.remove("hidden");

    const data = await getData(appId);
    const game = data["data"];
    console.log(game["background"]);
    singleSlot.children[0].setAttribute("src", `${game["header_image"]}`);

    gameInfo.style.backgroundImage = `url('${game.background}')`;
    gameInfo.children[0].textContent = game.name;
    gameInfo.children[1].textContent = `Price: $${game.price}`;
    gameInfo.children[2].textContent = `Release date: ${game[
      "release_date"
    ].slice(0, 10)}`;
    gameInfo.children[3].textContent = `Developed by: ${game["developer"].join(
      ", "
    )}`;
    gameInfo.children[4].textContent = `Categories: ${game["categories"].join(
      ", "
    )}`;
    gameInfo.children[5].textContent = `${game["description"]}`;
  } catch (error) {
    console.log("error", error);
  }
};

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("open");
  nav.classList.toggle("flex");
  nav.classList.toggle("hidden");
});

document.querySelector(".logo").addEventListener("click", () => {
  location.reload();
});

moreGamesBtn.addEventListener("click", () => {
  renderGames("all");
});

searchBtn.addEventListener("click", () => {
  mainSectionTitle.textContent = `Search results for "${searchInput.value}":`;
  singleSlot.classList.add("hidden");
  featuredArea.classList.add("hidden");
  allGamesArea.innerHTML = "";
  queryWord = "q";
  queryValue = searchInput.value;
  pageCounter = 1;
  renderGames("all");
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

renderFeaturedGames();
renderGames("all");
renderGenres();
renderTags();
