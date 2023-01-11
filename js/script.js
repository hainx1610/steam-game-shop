const BASE_URL = "https://steam-api-dot-cs-platform-306304.et.r.appspot.com/";

const btn = document.getElementById("menu-btn")
const nav = document.getElementById("menu")

const gamesArea = document.querySelector("#games-area")

let gamesList = [];

const getGames = async () => {
    try {
        const response = await fetch(BASE_URL + "games");
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log("error", error)
    }
}

const initialize = async () => {
    try {
        // get games from the API
        gamesArea.textContent = "Loading data..."; //for slow Internet
        const data = await getGames();
        gamesList = data["data"];
        if (!gamesList.length) {
            gamesArea.textContent = "No games found!";
            return;
        }
        gamesArea.textContent = ""; //loading done!

        gamesList.forEach(game => {
            const divElement = document.createElement("div")
            divElement.className += "game-slot bg-blue-800 w-80 h-52 mb-6 md:mx-3";
            divElement.innerHTML = `<img src=${game["header_image"]} alt="" class="w-[100%] h-[75%]">
        <div class="game-info h-[25%] flex justify-between items-center px-1 text-blue-300">
            <p class="title">${game.name}</p>
            <span class="price">$${game.price}</span>
        </div>`;
            gamesArea.appendChild(divElement);
        });
    } catch (error) {
        console.log("error", error);
    }

}

btn.addEventListener("click", () => {
    btn.classList.toggle("open")
    nav.classList.toggle("flex")
    nav.classList.toggle("hidden")
})

initialize()