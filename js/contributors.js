const searchButton = document.getElementById("search");
const cards = document.getElementById('cards');
const numberOfContributors = document.querySelector('.num');
let contributors = [];
searchButton.addEventListener('keyup',(e)=>{
    const searchInputData = e.target.value.toLowerCase();
    const filterContrib = contributors.filter(contributor=>{
       return contributor.login.toLowerCase().includes(searchInputData);
    });
    displayCards(filterContrib);
})
const fetchData = async() => {
  var pg = 1;//page no.
  while(true){
    try {
        const response = await fetch(`https://api.github.com/repos/gdscjgec/Pictionary/contributors?page=${pg}`);
        var resp = await response.json();
        console.log(resp)
        if(resp===[]) break;
        contributors.push(...resp);
        displayCards(contributors);
        pg++;
    } catch (err) {
        console.error(err);
    }
  }
  
};

const displayCards = (contributorsData) => {
    const htmlString = contributorsData
    .map((contributorData) => {
        return `
        <div class="card">
        <div class="name"><h1>${contributorData.login}</h1></div>
        <div class="image"><img src="${contributorData.avatar_url}"></div>
        <div class="data"><div class="list"><div class="number"><h1>${contributorData.contributions}</h1></div><div class="text"><p>Contributions</p></div></div></div><a href="${contributorData.html_url}" ><i class="fab fa-github"></i></a></div>
        `;
    })
    .join('');
    numberOfContributors.textContent = contributorsData.length;
    cards.innerHTML = htmlString;
};
fetchData();
