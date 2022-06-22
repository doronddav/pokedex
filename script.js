class Pokemon {
  constructor(name, image, moves, types, abilities) {
    this.name = name;
    this.image = image;
    this.moves = moves;
    this.types = types;
    this.abilities = abilities;
  }
}

let pokeIdInput = document.getElementById("pokemonId");
let pokeNameInput = document.getElementById("pokemonId");
let search = document.getElementById("search");
let pokemonName = document.getElementById("pokemonNameDisplay");
let pokemonImg = document.getElementById("pokemonImg");
let movesLi = document.getElementById("moves");
let typesLi = document.getElementById("type");
let abilitiesLi = document.getElementById("ability");
let shiny = document.getElementById("shiny");
let fronteview = document.getElementById("fronteview");
let rearview = document.getElementById("rearview");
let pokemon;
let pokemonShiny = false;
let rearViewImg = false;

let inputNum = "";
let inputName = "";
const pokemonApi = `https://pokeapi.co/api/v2/pokemon/`;

const fetetchPokemon = function (inputNum) {
  fetch(`${pokemonApi}` + `${inputNum}`)
    .then((response) => response.json())
    .then((response) => {
      pokemon = new Pokemon(
        response.name,
        response.sprites,
        response.moves,
        response.types,
        response.abilities
      );

      displayPokemon();
    });
};

const displayPokemon = function () {
  pokemonName.innerText = pokemon.name;
  pokemonImg.src = pokemon.image.front_default;
  displayMoves(pokemon.moves);
  displayType(pokemon.types);
  displayAbilities(pokemon.abilities);
};

let displayMoves = function (moves) {
  movesLi.innerText = "";
  for (let i = 0; i < moves.length; i++) {
    let moveElement = document.createElement("li");
    moveElement.innerText = moves[i].move.name;
    movesLi.appendChild(moveElement);
  }
};

let displayType = function (types) {
  typesLi.innerText = "";
  for (let i = 0; i < types.length; i++) {
    let typeElement = document.createElement("li");
    typeElement.innerText = types[i].type.name;
    typesLi.appendChild(typeElement);
  }
};

let displayAbilities = function (abilities) {
  abilitiesLi.innerText = "";
  for (let i = 0; i < abilities.length; i++) {
    let abiltiyElement = document.createElement("li");
    abiltiyElement.innerText = abilities[i].ability.name;
    abilitiesLi.appendChild(abiltiyElement);
  }
};

shiny.addEventListener("click", (event) => {
  if (pokemonShiny) {
    pokemonShiny = false;
    if (!rearViewImg) {
      pokemonImg.src = pokemon.image.front_default;
    } else {
      pokemonImg.src = pokemon.image.back_default;
    }
  } else {
    pokemonShiny = true;

    if (!rearViewImg) {
      pokemonImg.src = pokemon.image.front_shiny;
    } else {
      pokemonImg.src = pokemon.image.back_shiny;
    }
  }
});

// Rotate
fronteview.addEventListener("click", (event) => {
  rearViewImg = false;
  if (!pokemonShiny) {
    pokemonImg.src = pokemon.image.front_default;
  } else {
    pokemonImg.src = pokemon.image.front_shiny;
  }
});

rearview.addEventListener("click", (event) => {
  rearViewImg = true;
  if (!pokemonShiny) {
    pokemonImg.src = pokemon.image.back_default;
  } else {
    pokemonImg.src = pokemon.image.back_shiny;
  }
});

search.addEventListener("click", () => {
  inputNum = pokeIdInput.value;
  if (pokeIdInput.value == "") {
    alert("You must write Pokemon number or Pokemon name");
  } else {
    fetetchPokemon(inputNum);
    console.log(inputNum);
    fetetchPokemon(inputNum);
  }
});

// search.addEventListener("keypress", function (e) {
//   inputNum = pokeIdInput.value;
//   if (e === "Enter") {
//     if (pokeIdInput.value == 0 || "") {
//       event.alert("You must write Pokemon number or Pokemon name");
//     } else {
//       event.fetetchPokemon(inputNum);
//     }
//   }
// });
pokeIdInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    search.click();
  }
});
