class Pokemon {
  constructor(name, image, moves, types, abilities) {
    this.name = name;
    this.image = image;
    this.moves = moves;
    this.types = types;
    this.abilities = abilities;
  }

  setDescription(description) {
    this.description = description;
  }
}

let pokeIdInput = document.getElementById("pokemonId");
let search = document.getElementById("search");
let pokemonName = document.getElementById("pokemonNameDisplay");
let pokemonImg = document.getElementById("pokemonImg");
let movesLi = document.getElementById("moves");
let typesLi = document.getElementById("type");
let abilitiesLi = document.getElementById("ability");
let shiny = document.getElementById("shiny");
let fronteview = document.getElementById("fronteview");
let rearview = document.getElementById("rearview");
let descriptionOutput = document.getElementById("pokemonDescription");
let pokemon;
let pokemonShiny = false;
let rearViewImg = false;

let description = "";
let inputNum = "";
let inputName = "";
const pokemonApi = `https://pokeapi.co/api/v2/pokemon/`;
const pokemon_speciesAPI = "http://pokeapi.co/api/v2/pokemon-species/";

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
    });

  fetch(`${pokemon_speciesAPI}` + `${inputNum}`)
    .then((response) => response.json())
    .then((response) => {
      pokemon.setDescription(response.flavor_text_entries);

      displayPokemon();
    });
};

let displayPokemon = function () {
  pokemonName.innerText = pokemon.name;
  pokemonImg.src = pokemon.image.front_default;
  displayMoves(pokemon.moves);
  displayType(pokemon.types);
  displayAbilities(pokemon.abilities);
  displayDescription(pokemon.description);
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

let displayDescription = function (description_list) {
  descriptionOutput.innerText = "";
  for (let i = 0; i < description_list.length; i++) {
    if (description_list[i].language.name == "en") {
      descriptionOutput.innerText = description_list[i].flavor_text;
      break;
    }
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

shiny.addEventListener("click", () => {
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

fronteview.addEventListener("click", () => {
  rearViewImg = false;
  if (!pokemonShiny) {
    pokemonImg.src = pokemon.image.front_default;
  } else {
    pokemonImg.src = pokemon.image.front_shiny;
  }
});

rearview.addEventListener("click", () => {
  rearViewImg = true;
  if (!pokemonShiny) {
    pokemonImg.src = pokemon.image.back_default;
  } else {
    pokemonImg.src = pokemon.image.back_shiny;
  }
});

search.addEventListener("click", () => {
  inputNum = pokeIdInput.value;
  if (pokeIdInput.value == "" || pokeIdInput.value >= 899) {
    alert("You must write valid Pokemon name or Pokemon number(1-898)");
  } else {
    fetetchPokemon(inputNum);
    console.log(inputNum);
    fetetchPokemon(inputNum);
  }
});

pokeIdInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    search.click();
  }
});
