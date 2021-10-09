const fetchDogs = async () => {
    return await fetch("https://dog.ceo/api/breeds/list/all").then((res) => {
        return res.json();
    }).then((res) => {
        return res;
    }).catch((error) => {
        console.log(error)
    })
}

const fetchImage = async (breed) => {
    return await fetch(`https://dog.ceo/api/breed/${breed}/images/random`).then((res) => {
        return res.json();
    }).then((res) => {
        return res.message;
    })
}

const displayDogs = async () => {
    const container = document.querySelector(".dogs");
    const response = await fetchDogs();
    const dogs = response.message;

    for(const dog in dogs){

        const div = document.createElement("div");
        div.classList.add("dog")
        const image = document.createElement("img");
        image.classList.add("image");
        const name = document.createElement("h3");
        name.classList.add("name");
        name.innerText = dog;
        image.src = await fetchImage(dog);

        div.appendChild(image);
        div.appendChild(name);
        container.appendChild(div);
    }
}

displayDogs();