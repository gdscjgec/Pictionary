const fetchData = async() => {
    return await fetch("https://api.github.com/repos/gdscjgec/Pictionary/contributors").then((res) => {
        return res.json();

    }).then((res) => {
        return res;
    }).catch((error) => {
        console.log(error)
    })
}

const fetchFollower = async(username) => {
    return await fetch(`https://api.github.com/users/${username}`).then((res) => {
        return res.json();
    }).then((res) => {
        return res.followers;
    })

}
const displayCards = async() => {
    const box = document.querySelector(".cards");
    const cards = await fetchData();

    for (const card in cards) {

        const div = document.createElement("div");
        div.classList.add("card");
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("image");
        const img = document.createElement("img");
        img.src = card.avatar_url;
        const name = document.createElement("div");
        name.classList.add("name");
        name.innerHTML = (`<h1>${card.login}</h1>`);
        const data = document.createElement("div");
        data.classList.add("data");
        const list = document.createElement("div");
        list.classList.add("list");
        const numb = document.createElement("div");
        numb.classList.add("number");
        const h1 = document.createElement("h1");
        h1.innerText = await fetchFollower(card.login);
        const text = document.createElement("div")
        text.classList.add("text");
        const textpara = document.createElement("p");
        textpara.innerText = "Followers";
        const list1 = document.createElement("div");
        list1.classList.add("list");
        const numb1 = document.createElement("div");
        numb1.classList.add("number");
        const num2 = document.createElement("h1");
        num2.innerText = (`<h1>${card.contributions}</h1>`);
        const text1 = document.createElement("div")
        text1.classList.add("text");
        const textpara1 = document.createElement("p");
        textpara1.innerText = "Contributions";
        const a = document.createElement("a");
        a.href = card.html_url;
        const i = document.createElement("i");
        i.classList.add("fab fa-github");
        const outline = document.createElement("div");
        outline.classList.add("outline");
        // outline.innerHTML = ('<span><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="0 -3 1080 586" preserveAspectRatio="xMinYMin meet"><rect id="svgEditorBackground" x="0" y="0" width="1080" height="580" style="fill: none; stroke: none;"/><defs id="svgEditorDefs"><line id="svgEditorLineDefs" style="fill:none;stroke:black;stroke-width:1px;"/><polygon id="svgEditorPolygonDefs" style="stroke:black;stroke-width:1px;fill:rosybrown;"/><text id="svgEditorTextDefs" style="fill:black;font-family:Arial;font-size:20px;"/><polygon id="svgEditorIconDefs" style="fill:rosybrown;"/><polygon id="svgEditorShapeDefs" style="fill:rosybrown;stroke:black;vector-effect:non-scaling-stroke;stroke-width:1px;"/></defs><style type="text/css" id="draw-svg-hightlight">#svgEditorTargetHighlightPoint{cursor:pointer;stroke:black;fill:lavender;fill-opacity:0.8;}#svgEditorTargetHighlightPoint:hover{fill:blue;fill-opacity:1;}.GCO2KGCCPK{cursor:pointer;stroke:none;cursor:pointer;fill:lavender;fill-opacity:0.8;}.GCO2KGCCAL{cursor:pointer;stroke:lavender;cursor:pointer;fill:none;stroke-opacity:0.8;}</style><defs id="draw-svg-v1-0-js">
        // </defs><text dy="-0.5em" style="fill:black;font-family:Arial;font-size:20px;" id="e4_text"/><path d="M370.26,158.55a149.19,149.19,0,1,1,173.59,196.67" style="fill:none;stroke:gold;stroke-width:4px;" id="e5_circleArc"/></svg></span>')
        div.appendChild(name);
        imageContainer.appendChild(img);
        div.appendChild.(imageContainer);
        numb.appendChild(h1)
        text.appendChild(textpara);
        list.appendChild(numb);
        list.appendChild(text);
        data.appendChild(list);
        numb1.appendChild(num2);
        text1.appendChild(textpara1);
        list1.appendChild(numb1);
        list1.appendChild(text1);
        data.appendChild(list1);
        div.appendChild(data);
        a.appendChild(i);
        div.appendChild(a);
        box.appendChild(div);


    }

}
displayCards();