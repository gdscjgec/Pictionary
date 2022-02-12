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
    //clear current div, and generate 
    //new list after searching and sorting
    const container = document.querySelector(".pokemons");
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    //fetch pokemons
    const response = await fetchPokemon();
    const res = response.results;

    //sort and search
    sortPokemon(res);
    const pokemons = searchPokemon(res);

    //check if no such pokemon
    if (pokemons.length === 0) {
        const noResult = document.createElement("h4");
        noResult.innerHTML = "No result";
        container.appendChild(noResult);
    } else {
        //render a card for each pokemon in list
        pokemons.forEach(async (pokemon) => {
            const name = document.createElement("h3");
            name.classList.add("name");
            name.innerText = pokemon.name;

            const image = document.createElement("img");
            image.classList.add("image");
            let pokemonData = await fetchSinglePokemon(pokemon.url.split("/")[6]);
            image.src = pokemonData.sprites.front_default;

            const div = document.createElement("div");
            div.classList.add("pokemon")
            div.id = `pokemon-${pokemon.url.split("/")[6]}`

            div.appendChild(image);
            div.appendChild(name);
            container.appendChild(div);

            //add event listener on every div of pokemon
            //on clicking set singlepokemon to pokemon 
            //and display the detailed card
            document.getElementById(`pokemon-${pokemon.url.split("/")[6]}`)
                .addEventListener('click', (e) => {
                    displayPokemonModal(pokemonData);
                })
        })
    }
}

const displayPokemonModal = (data) => {
    clearModals();    
    //header
    const name = document.createElement("h3");
    name.innerText = data.name.toUpperCase() + "-" + data.order; 
    const weight = document.createElement("h5");
    weight.innerText ="Weight: " + data.weight;
    const height = document.createElement("h5");
    height.innerText ="Height: " + data.height;
    const singlePokemonHeader = document.createElement('div');
    singlePokemonHeader.classList.add("singlePokemonHeader");
    singlePokemonHeader.appendChild(name);
    singlePokemonHeader.appendChild(weight);
    singlePokemonHeader.appendChild(height);

    const image = document.createElement("img");
    image.style.width = "10rem";
    image.style.height = "10rem";
    image.src = data.sprites.front_default;
    
    const close = document.createElement("button");
    close.innerHTML="x"
    close.addEventListener('click', () => {
        clearModals();
    })

    const singlePokemonModal = document.createElement('div');
    singlePokemonModal.classList.add("singlePokemonModal");
    singlePokemonModal.appendChild(singlePokemonHeader);
    singlePokemonModal.appendChild(image);
    singlePokemonModal.appendChild(close);
    //insert this modal before everything in body
    //set its style to sticky and complete dimensions
    document.body.insertBefore(singlePokemonModal, document.body.firstChild);
}

const clearModals = () => {
    const modals = document.querySelectorAll('.singlePokemonModal')
    for (const modal of modals) {
        modal.parentNode.removeChild(modal);
    }
}

displayPokemon()