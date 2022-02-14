const fetchData = async() => {
    return await fetch(
            'https://api.github.com/repos/gdscjgec/Pictionary/contributors'
        )
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            return res;
        })
        .catch((error) => {
            console.log(error);
        });
};

const fetchFollower = async(username) => {
    return await fetch(`https://api.github.com/users/${username}`)
        .then((res) => {
            return res.json().followers;
        })
        .then((res) => {
            // alert(res.followers);
            return res.followers;
        });
};
const displayCards = async() => {
    const box = document.querySelector('.cards');
    const cards = await fetchData();
    const num = document.querySelector('.num');
    num.innerText = cards.length;
    // console.log(cards[0])
    // for (const card in cards) {
    cards.map((card) => {
        // console.log(card);
        const div = document.createElement('div');
        div.classList.add('card');
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('image');
        const img = document.createElement('img');
        img.src = card.avatar_url;
        const name = document.createElement('div');
        name.classList.add('name');
        const nameh = document.createElement('h1');
        nameh.innerText = card.login;
        const data = document.createElement('div');
        data.classList.add('data');
        // const list = document.createElement("div");
        // list.classList.add("list");
        // const numb = document.createElement("div");
        // numb.classList.add("number");
        // const h1 = document.createElement("h1");
        // h1.innerText = fetchFollower(card.login);
        // const text = document.createElement("div")
        // text.classList.add("text");
        // const textpara = document.createElement("p");
        // textpara.innerText = "Followers";
        const list1 = document.createElement('div');
        list1.classList.add('list');
        const numb1 = document.createElement('div');
        numb1.classList.add('number');
        const num2 = document.createElement('h1');
        num2.innerText = card.contributions;
        const text1 = document.createElement('div');
        text1.classList.add('text');
        const textpara1 = document.createElement('p');
        textpara1.innerText = 'Contributions';
        const a = document.createElement('a');
        a.href = card.html_url;
        const i = document.createElement('i');
        i.classList.add('fab', 'fa-github');
        const outline = document.createElement('div');
        outline.classList.add('outline');

        name.appendChild(nameh);
        div.appendChild(name);
        imgContainer.appendChild(img);
        div.appendChild(imgContainer);
        // numb.appendChild(h1)
        // text.appendChild(textpara);
        // list.appendChild(numb);
        // list.appendChild(text);
        // data.appendChild(list);
        numb1.appendChild(num2);
        text1.appendChild(textpara1);
        list1.appendChild(numb1);
        list1.appendChild(text1);
        data.appendChild(list1);
        div.appendChild(data);
        a.appendChild(i);
        div.appendChild(a);
        box.appendChild(div);
    });
};
displayCards();