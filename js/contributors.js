const searchButton = document.getElementById('search');
const cards = document.getElementById('cards');
const numberOfContributors = document.querySelector('.num');
let contributors = [];
let count = 0;
searchButton.addEventListener('keyup', (e) => {
  const searchInputData = e.target.value.toLowerCase();
  const filterContrib = contributors.filter((contributor) => {
    return contributor.login.toLowerCase().includes(searchInputData);
  });
  displayCards(filterContrib);
});
const fetchData = async () => {
  await fetch('data.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data["data"][0]["login"]);
      contributors = data['data'];
      count = data['data'].length;
      // console.log(count);
    });
  displayCards(contributors);
};

const displayCards = (contributorsData) => {
  // console.log(contributorsData);
  const htmlString = contributorsData
    .map((contributorData) => {
      return `
        <div class="card">
        <div class="name"><h1>${contributorData.login}</h1></div>
        <div class="image"><div class="outline"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="0 -3 1080 586" preserveAspectRatio="xMinYMin meet"><rect id="svgEditorBackground" x="0" y="0" width="1080" height="580" style="fill: none; stroke: none;"/><defs id="svgEditorDefs"><line id="svgEditorLineDefs" style="fill:none;stroke:black;stroke-width:1px;"/><polygon id="svgEditorPolygonDefs" style="stroke:black;stroke-width:1px;fill:rosybrown;"/><text id="svgEditorTextDefs" style="fill:black;font-family:Arial;font-size:20px;"/><polygon id="svgEditorIconDefs" style="fill:rosybrown;"/><polygon id="svgEditorShapeDefs" style="fill:rosybrown;stroke:black;vector-effect:non-scaling-stroke;stroke-width:1px;"/></defs><style type="text/css" id="draw-svg-hightlight">#svgEditorTargetHighlightPoint{cursor:pointer;stroke:black;fill:lavender;fill-opacity:0.8;}#svgEditorTargetHighlightPoint:hover{fill:blue;fill-opacity:1;}.GCO2KGCCPK{cursor:pointer;stroke:none;cursor:pointer;fill:lavender;fill-opacity:0.8;}.GCO2KGCCAL{cursor:pointer;stroke:lavender;cursor:pointer;fill:none;stroke-opacity:0.8;}</style><defs id="draw-svg-v1-0-js">
        </defs><text dy="-0.5em" style="fill:black;font-family:Arial;font-size:20px;" id="e4_text"/><path d="M370.26,158.55a149.19,149.19,0,1,1,173.59,196.67" style="fill:none;stroke:gold;stroke-width:4px;" id="e5_circleArc"/></svg></div>
        <img src="${contributorData.avatar_url}"></div>
        <div class="data"><div class="list"><div class="number"><h1>${contributorData.followers}</h1></div><div class="text"><p>Followers</p></div></div><div class="list"><div class="number"><h1>${contributorData.contributions}</h1></div><div class="text"><p>Contributions</p></div></div></div><a href="${contributorData.html_url}" ><i class="fab fa-github"></i></a>
        </div>
        `;
    })
    .join('');
  numberOfContributors.textContent = count;
  cards.innerHTML = htmlString;
};
fetchData();
