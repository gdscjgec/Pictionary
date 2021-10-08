
const fetchPokemon = async () => {
    return await fetch("https://pokeapi.co/api/v2/pokemon?limit=151").then((res) => {
        return res.json();
    }).then((res) => {
        return res;
    }).catch((error) => {
        console.log(error)
    })
}

const displayPokemon = async () => {
    const container = document.querySelector(".pokemons");
    const response = await fetchPokemon();
    const pokemons = response.results;

    pokemons.forEach((pokemon, index) => {
        index++;
        const div = document.createElement("div");
        div.classList.add("pokemon")
        const image = document.createElement("img");
        image.classList.add("image");
        const name = document.createElement("h3");
        name.classList.add("name");
        name.innerText = pokemon.name;
        const imageNumber = (index >= 10 && index < 100) ? "0"+index : index < 10 ? "00"+index : index;
        image.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imageNumber}.png`;

        div.appendChild(image);
        div.appendChild(name);
        container.appendChild(div);
    })
}
displayPokemon()