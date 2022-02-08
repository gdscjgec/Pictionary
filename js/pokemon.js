let sort = document.getElementById("sort").value;
let search = document.getElementById("search").value;

const handleSortChange = () => {
    sort = document.getElementById("sort").value;
    displayPokemon();
}
const handleSearchChange = () => {
    search = document.getElementById("search").value;
    displayPokemon();
}

const fetchPokemon = async () => {
    return await fetch("https://pokeapi.co/api/v2/pokemon?limit=1118").then((res) => {
        return res.json();
    }).then((res) => {
        return res;
    }).catch((error) => {
        console.log(error)
    })
}

const fetchSinglePokemon = async (id) => {
    return await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => {
        return res.json();
    }).then((res) => {
        return res;
    }).catch((error) => {
        console.log(error)
    })
}

const sortPokemon = (pokemons) => {
    if (sort === "alpha") {
        //ascending by name
        pokemons.sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
        });

    } else if (sort === "dealpha") {
        //descending by name
        pokemons.sort((a, b) => {
            if (a.name > b.name) return -1;
            if (a.name < b.name) return 1;
            return 0;
        });
    } else if (sort === "desc") {
        pokemons.reverse();
    }
}

const searchPokemon = (res) => {
    var newPokemon = [];
    res.map((pokemon) => {

        if (pokemon.name.toLowerCase().includes(search.toLowerCase())) {
            newPokemon.push(pokemon);
        }
    });
    return newPokemon;
}

const displayPokemon = async () => {
    const container = document.querySelector(".pokemons");
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    const response = await fetchPokemon();
    const res = response.results;

    //sort
    sortPokemon(res);
    const pokemons = searchPokemon(res);

    if (pokemons.length === 0) {
        const noResult = document.createElement("h4");
        noResult.innerHTML = "No result";
        container.appendChild(noResult);
    } else {
        pokemons.forEach(async (pokemon) => {
            const div = document.createElement("div");
            div.classList.add("pokemon")

            const image = document.createElement("img");
            image.classList.add("image");
            const name = document.createElement("h3");
            name.classList.add("name");
            name.innerText = pokemon.name;

            var pokemonData = await fetchSinglePokemon(pokemon.url.split("/")[6]);
            // console.log(pokemonData)
            image.src = pokemonData.sprites.front_default;

            div.appendChild(image);
            div.appendChild(name);
            container.appendChild(div);
        })
    }
}
displayPokemon()