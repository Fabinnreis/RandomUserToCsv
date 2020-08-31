const nodeFetch = require('node-fetch');
const fileSystem = require('fs');

async function makeDir(){
  fileSystem.mkdir("./data", (err) => {
    if (err) throw err;
  })
}

async function makeFile(){
  fileSystem.writeFile("./data/Users.csv", "Name,Last,Email,Age,Gender,User,Password\n", "utf8", err => {
    if (err) throw err;
  })
}
async function reqApiRandomUser(){
  const response = await nodeFetch("https://randomuser.me/api/?results=500");
  const respJson = await response.json();

  respJson.results.forEach( usu => {
    const users = fileSystem.createWriteStream("./data/Users.csv", {flags: "a"})
    users.write(`${usu.name.first}, 
                ${usu.name.last}, 
                ${usu.email}, 
                ${usu.dob.age}, 
                ${usu.gender}, 
                ${usu.login.username}, 
                ${usu.login.password}\n`)
  });
}

async function createCsv() {

  fileSystem.stat("./data", (err) => {
    if (err){
      makeDir();  
    }
    makeFile();
  })
  reqApiRandomUser();
}

createCsv();