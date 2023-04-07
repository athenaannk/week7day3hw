const pokemonCount = 151;
var pokedex = {}; //{1 : {"name" : "bulbsaur" , "img" : url, "type" : ["grass", "poison"], "descrip." : "...."}}
//for loop 1-151
//get pokemon by the number!

window.onload = async function(){
    // getPokemon(1);
//for loop time! there is no pokemon 0
    for(let i = 1; i <= pokemonCount; i ++){
        await getPokemon(i);
//create div
        let pokemon = document.createElement("div");
        pokemon.id = i;
//onclick on name is info on id
        pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase(); 
//div id 1 class= pokemon name BULBASAUR
        pokemon.classList.add("pokemon-name");
        pokemon.addEventListener("click", updatePokemon);
        document.getElementById("pokemon-list").append(pokemon);
    }
    document.getElementById("pokemon-description").innerText = pokedex[1]["des"]; //adding desc to 1 bulbasar
    console.log(pokedex);
}
//fetch is async funtion!
//anytime you have await you have to have an async function

async function getPokemon(num){
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();
    let res = await fetch(url);
    let pokemon = await res.json();
    // console.log(pokemon);
//API works, uncomment to get type and img url
    let pokemonName = pokemon["name"];
    let pokemonType = pokemon["types"]; //will return array
    let pokemonImg = pokemon["sprites"]["front_default"];
//pokemon type info is in a url - find the url and open it - the pokemon info is under flavor_text
//going to get url with fetch but remember to use await

    res = await fetch(pokemon["species"]["url"]);
    let pokemonDescription = await res.json();

    // console.log(pokemonDescription)
    //a bunch of flavor text entries. choose anyone
    // there is another map under each entry!

    pokemonDescription = pokemonDescription["flavor_text_entries"][9]["flavor_text"]
    //we have name, type, img and desc add to pokedex var

    pokedex[num] = {"name" : pokemonName, "img" : pokemonImg, "types" : pokemonType, "desc" : pokemonDescription}

}

function updatePokemon(){
    document.getElementById("pokemon-img").src = pokedex[this.id]["img"];
    //this.id is this pokemon that is clicked

    //picture now changes when pokemon is clicked need to clear the previous types and do the same
    let typesDiv = document.getElementById("pokemon-types")
   
    while (typesDiv.firstChild) { //basically means while this div has types we are going to clear it
        typesDiv.firstChild.remove();

 
      }

    //update types now
    let types = pokedex[this.id]["types"]; //will return array
    for (let i=0; i <types.length; i++){
        let type= document.createElement("span"); //could be one or two types
        type.innerText = types[i]["type"]["name"].toUpperCase(); //we retrieved i earlier types is array and in array there is a map  and in the map there is a name so we indes
        type.classList.add("type-box");
        type.classList.add(types[i]["type"]["name"]); //adds background color
        typesDiv.append(type); //append span
    }

    //update description
    document.getElementById("pokemon-description").innerText = pokedex[this.id]["desc"];
}