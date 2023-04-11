let pokemons = [];
const poke_container = document.getElementById("poke_container");
const url = "https://pokeapi.co/api/v2/pokemon";
const pokemons_number = 151;
const search = document.getElementById("search");
const form = document.getElementById("form");

// const fetchPokemons = async () => {
//     for (let i=1; i <= pokemons_number; i++) {
//         await getAllPokemon(i);
//     }
//     pokemons.forEach((pokemon) => createPokemonCard(pokemon));
// };


const removePokemon = () => {
    const pokemonEls = document.getElementsByClassName("pokemon");
    let removablePokemons = [];
    for (let i=0; i < pokemonEls.length; i++){
        const pokemonEl = pokemonEls[i];
        removablePokemons = [...removablePokemons, pokemonEl];

    }
    removablePokemons.forEach((remPoke) => remPoke.remove());
};
const getPokemon = id => {
    const searchPokemons = pokemons.filter((poke) => poke.name === id);
    removePokemon();
    searchPokemons.forEach((pokemon) => createPokemonCard(pokemon));

};

const getAllPokemon = async (id) => {
    if (typeof id === "string") id=id.toLowerCase()
    const res = await fetch(`${url}/${id}`);
    const pokemon = await res.json();
    console.log(pokemon)
    pokemons = [...pokemons,pokemon];
    console.log(pokemons)

};

// fetchPokemons();

function createPokemonCard(pokemon) {
    const pokemonEl = document.createElement("div");
    pokemonEl.classList.add("pokemon");
    const poke_types = pokemon.types.map((el) => el.type.name).slice(0,1);
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const poke_stat = pokemon.stats.map((el) => el.stat.name);
    const stats = poke_stat.slice(0,3);
    const base_value = pokemon.stats.map((el) => el.base_stat);
    const base_stat = base_value.slice(0,3);
    const stat = stats.map((stat) => {
        return `<li class= "names" >${stat}</li>`;
    }).join("");
    const base = base_stat.map((base) => {
        return `<li class= "base" >${base}</li>`
    }).join("");
    const pokeInnerHTML = `<div class= "img-container" >
    <img src="https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemon.id}.svg"     
    </div>
    <div class= "info" >
    <span class= "number" >#${pokemon.id}</
    span>
    <h3 class= "name" >${name}</h3>
    <small class= "type" ><span>${poke_types}</span></small>
    </div>
    <div class= "stats" >
    <h2>Stats</h2>
    <div class= "flex" >
    <ul>${stat}</ul>
    <ul>${base}</ul>
    </div>
    </div>`;
    pokemonEl.innerHTML = pokeInnerHTML;
    poke_container.appendChild(pokemonEl);
   
}

form.addEventListener("submit", async(e) => {
    e.preventDefault();
    const searchTerm = search.value;
    console.log(searchTerm)
    if (searchTerm) {
        await getAllPokemon(searchTerm);
        createPokemonCard([pokemons]);
        search.value = "";
    
    } else if (searchTerm === ""){
        pokemons = [];
        removePokemon();
        fetchPokemons();
    }
})
