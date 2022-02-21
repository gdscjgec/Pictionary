const { default: axios } = require('axios');
const { writeJson } = require('./utils/writeJson');

const dotenv = require('dotenv');
dotenv.config();
const ACCESS_TOKEN = process.env.GH_ACCESS_TOKEN;

const fetchRepoData = async (repoName = 'gdscjgec/Pictionary') => {
  let pageCount = 1;
  let pageAvailabe = true;
  let allData = [];
  //   const db = client.db("github");
  //   const contrib = db.collection("contrib");
  while (pageAvailabe) {
    const reqUrl = `https://api.github.com/repos/${repoName}/contributors?page=${pageCount}`;
    try {
      // counter++;
      console.log(
        ` Fetching data for: ${repoName} and pageCount: ${pageCount}`
      );
      const res = await axios.get(reqUrl, {
        headers: {
          authorization: `token ${ACCESS_TOKEN}`,
          'User-Agent': 'request',
          Accept: 'application/vnd.github.v3+json',
        },
      });
      const resData = res.data;

      console.log(
        `Data has been fetched for: ${repoName} and pageCount: ${pageCount}`
      );
      // await sleep(2000);
      console.log('_____________');

      if (resData.length !== 0) {
        //   const jwocData = filterJwoc(resData);
        allData = [...allData, ...resData];
        pageCount++;
      } else {
        pageAvailabe = false;
      }
    } catch (error) {
      console.log(error.message);
      pageAvailabe = false;
      process.exit(1);
    }
  }
  //populate followers data
  for(let i=0;i<allData.length;i++){
    console.log(i);
    const userName = allData[i].login;
    const url = `https://api.github.com/users/${userName}`;
    const resp = await axios.get(url, {
      headers: {
        authorization: `token ${ACCESS_TOKEN}`,
        'User-Agent': 'request',
        Accept: 'application/vnd.github.v3+json',
      },
    });
    // console.log(resp.data);
    const val= resp.data["followers"];
    // console.log(val);
    allData[i]["followers"]=val;
  }
  writeJson({
    lastUpdated: new Date(),
    data: allData,
  });
  // return allData;
};

fetchRepoData();
