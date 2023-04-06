let getPokemon = async () => {
    let response = await axios.get('https://pokeapi.co/api/v2/pokemon');
    if (response.status == 200) {
        console.log('Pokemon Name ', response.data)
        return response.data
    }
    return 'API call broken'
}



let loadData = async () =>{
    let data = await getData();
    console.log(data);

    let new_row = `<tr><td scope='row'>${data.name}</td></tr>`;
    document.getElementById('pokemonInfo').insertAdjacentHTML('afterbegin', new_row)

    let new_row2 = `<tr><td scope='row'>${data.picture}</td><tr>`;
    document.getElementById('pokemonInfo').insertAdjacentHTML('afterbegin',new_row2)
}

let clearData = () => {
    document.getElementById('pokemonInfo').innerHTML= ''
}