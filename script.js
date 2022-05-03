class Pokemon {
  //   constructor(inputNum, name, image, description, abillity, types) {
  //     this.inputNum = inputNum;
  //     this.name = name;
  //     this.image = image;
  //     this.description = description;
  //     this.abillity = abillity;
  //     this.types = types;
  //   }

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
let abilitiesLi = document.getElementById("ability")
let shiny = document.getElementById("shiny");
let fronteview = document.getElementById("fronteview");
let rearview = document.getElementById("rearview");
let pokemon;
let pokemonShiny = false;
let rearViewImg = false;

// pokeIdInput = false;
// pokeNameInput = false;
let inputNum = "";
let inputName = "";
const pokemonApi = `https://pokeapi.co/api/v2/pokemon/`;


let fetetchPokemon = function (inputNum) {
  https: fetch(`${pokemonApi}` + `${inputNum}`)
    .then((response) => response.json())

    // .then((response) => console.log(response))
    .then(
      (response) =>
        (pokemon = new Pokemon(
          response.name,
          response.sprites,
          response.moves,
          response.types,
          response.abilities
        ))
    )
    // .then((pokemon) => console.log(pokemon.name));
    // .then((pokemon) => console.log(pokemon.types[0].type.name))
    .finally(() => displayPokemon());
};


let displayPokemon = function () {
  pokemonName.innerHTML = pokemon.name;
  pokemonImg.src = pokemon.image.front_default;
  displayMoves(pokemon.moves);
  displayType(pokemon.types);
  displayAbilities(pokemon.abilities);
};

let displayMoves = function (moves) {
  movesLi.innerHTML = "";
  for (let i = 0; i < moves.length; i++) {
    let moveElement = document.createElement("li");
    moveElement.innerHTML = moves[i].move.name;
    movesLi.appendChild(moveElement);
  }
};

let displayType = function (types) {
  typesLi.innerHTML = "";
  for (let i = 0; i < types.length; i++) {
    let typeElement = document.createElement("li");
    typeElement.innerHTML = types[i].type.name;
    typesLi.appendChild(typeElement);
  }
};

let displayAbilities = function (abilities) {
  abilitiesLi.innerHTML = "";
  for (let i = 0; i < abilities.length; i++) {
    let abiltiyElement = document.createElement("li");
    abiltiyElement.innerHTML = abilities[i].ability.name;
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


// let displayinput = function () {
//   if (pokeIdInput.value.length > 0) {
//     pokeInputName.style.display = "none";
//   } else if (pokeInputName.value.length > 0) {
//     pokeIdInput.style.display = "none";
//   }
// };
// displayinput();

search.addEventListener("click", (event) => {
  inputNum = pokeIdInput.value;
  console.log(inputNum);
  fetetchPokemon(inputNum);
});

