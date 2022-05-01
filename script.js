class Pokemon {
  //   constructor(num, name, image, description, abillity, types) {
  //     this.num = num;
  //     this.name = name;
  //     this.image = image;
  //     this.description = description;
  //     this.abillity = abillity;
  //     this.types = types;
  //   }

  constructor(name, image, moves, types) {
    this.name = name;
    this.image = image;
    this.moves = moves;
    this.types = types;
  }
}

let pokeInputName = document.getElementById("pokemonName");
let pokeId = document.getElementById("pokemonId");
let search = document.getElementById("search");
let pokemonName = document.getElementById("pokemonName");
let pokemonImg = document.getElementById("pokemonImg");
let movesLi = document.getElementById("moves");
let typesLi = document.getElementById("type");
let shiny = document.getElementById("shiny");
let fronteview = document.getElementById("fronteview");
let rearview = document.getElementById("rearview");
let pokemon;
let pokemonShiny = false;
let rearViewImg = false;
let num = 1;
const pokemonApi = `https://pokeapi.co/api/v2/pokemon?limit=1126/`;

fetch(`${pokemonApi}`)
  .then((response) => response.json())
  .then((response) => fetch(response.results[100].url))

  .then((response) => response.json())
  // .then((response) => console.log(response))
  .then(
    (response) =>
      (pokemon = new Pokemon(
        response.name,
        response.sprites,
        response.moves,
        response.types
      ))
  )
  // .then((pokemon) => console.log(pokemon.name));
  // .then((pokemon) => console.log(pokemon.types[0].type.name))
  .finally();

let displayPokemon = function () {
  pokemonName.innerHTML = pokemon.name;
  pokemonImg.src = pokemon.image.front_default;
  displayMoves(pokemon.moves);
  displayType(pokemon.types);
};

let displayMoves = function (moves) {
  for (let i = 0; i < moves.length; i++) {
    let moveElement = document.createElement("li");
    moveElement.innerHTML = moves[i].move.name;
    movesLi.appendChild(moveElement);
  }
};

let displayType = function (types) {
  for (let i = 0; i < types.length; i++) {
    let typeElement = document.createElement("li");
    typeElement.innerHTML = types[i].type.name;
    typesLi.appendChild(typeElement);
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

search.addEventListener("click", (event) => {
  num == pokeId.value;
  console.log(num);

  displayPokemon();
});
