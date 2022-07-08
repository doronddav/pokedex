# Pokedex
App for search for all pokemons and datas of them

##Description
This app display data of all pokemon from all seasens.
Its desplay name,picture,description,abillities,type and moves
The user can also change the view point of the Pokemon from front to back and to see the shiny version of them.

the project fetching from global [Pokemon API](https://pokeapi.co/) and made by costtructor 
```  const fetetchPokemon = function (inputNum) {
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
```
 


## How to use the Project
this app can be open just on live-server
```live-server``` on terminal.

To serach for pokemon use the unput the write there the name or number of the pokemon and click on search button or use enter on your keyboard.
for shiny pokemon there is a button of shiny and to buttons to display front and back picture of the pokemon.

## Credits
[Roey Mash](https://github.com/Roi-Mash) 
