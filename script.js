class Pokemon {
  //   constructor(num, name, image, description, abillity, types) {
  //     this.num = num;
  //     this.name = name;
  //     this.image = image;
  //     this.description = description;
  //     this.abillity = abillity;
  //     this.types = types;
  //   }

  constructor(name) {
    this.name = name;
    // this.image = image;
  }

  //   static get name() {
  //     return this.name;
  //   }
}

let pokeInputName = document.getElementById("pokemonName");
let pokeId = document.getElementById("pokemonId");
let search = document.getElementById("search");
let pokemonName = document.getElementById("pokemonName");
let pokemonImg = document.getElementById("pokemonImg");
let pokemon;

const num = "";
const pokemonApi = `https://pokeapi.co/api/v2/pokemon/`;

fetch(`${pokemonApi}`)
  .then((response) => response.json())
  .then((response) => fetch(response.results[10].url))

  .then((response) => response.json())
  // .then((response) => console.log(response))
  .then(
    (response) => (pokemon = new Pokemon(response.name, response.species.url))
  )
  .then((pokemon) => console.log(pokemon.name))
  .finally(() => displayPokemon());

let displayPokemon = function () {
  pokemonName.innerHTML = pokemon.name;
  pokemonImg.src = pokemon.image;
};
