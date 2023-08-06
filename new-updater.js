/** 
Current updater written in node.js and hosted on Replit. 
Requires octokat library, line 225 in 'node_modules/octokat/dist/node/requester.js' was changed to 'return;'. 
*/

/** Octokat setup */
var Octokat = require('octokat'); // Importing octokat
var oauth_token = process.env['oauth-token']; // Loading the secret oauth token
var octo = new Octokat({token: oauth_token}); // Logging in
var repo = octo.repos('Infinite-Coder-001', 'Hotlist-API'); // Loading the repo

/** Webserver configuration */
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

function githubWrite(filename, content, message) {
  /** Writes a file via git */
  var config = {
    message: message,
    content: Buffer.from(content).toString('base64'),
  }
  
  repo.contents(filename).add(config); 
}
function githubRemove(filename, message, callback) {
  /** Removes a file via git */
  repo.contents(filename).fetch()
  .then((info) => {
    if (info) {
      var config = {
        message: message,
        sha: info.sha,
      }
    
      repo.contents(filename).remove(config);
      callback(true); // Successed
    }
    else {
      callback(false); // Failed
    }
  })
}

function getHotlist(callback) {
  /** Fetches top 100 programs of the hotlist */
  const post = {"operationName":"hotlist","query":"query hotlist($curationNodeId: String, $onlyOfficialProjectSpinoffs: Boolean!, $sort: ListProgramSortOrder, $pageInfo: ListProgramsPageInfo) {\n  listTopPrograms(curationNodeId: $curationNodeId, onlyOfficialProjectSpinoffs: $onlyOfficialProjectSpinoffs, sort: $sort, pageInfo: $pageInfo) {\n    complete\n    cursor\n    programs {\n      id\n      key\n      authorKaid\n      authorNickname\n      displayableSpinoffCount\n      imagePath\n      sumVotesIncremented\n      translatedTitle: title\n      url\n      __typename\n    }\n    __typename\n  }\n}\n","variables":{"curationNodeId":"xffde7c31","onlyOfficialProjectSpinoffs":false,"sort":"HOT","pageInfo":{"itemsPerPage":100,"cursor":""}}};

  fetch('https://cs.khanacademy.org/api/internal/graphql/hotlist', {
    method: "POST",
    body: JSON.stringify(post),
  })
    .then((response) => response.text())
    .then((body) => {
      callback(JSON.parse(body)); // Calling the callback
    });
}

function hotlist() {
  getHotlist((hotlist) => {
    // Getting current date and time
    var date = new Date(Date.now());
    var year = date.getUTCFullYear();
    var month = date.getUTCMonth();
    var day = date.getUTCDate();
    var hours = date.getUTCHours();
    var minutes = date.getUTCMinutes();
  
    // Formatting the date
    if (String(month).split("").length === 1) {
      month = "0" + String(parseInt(month) + 1);
    }
    if (String(day).split("").length === 1) {
      day = "0" + day;
    }
    if (String(hours).split("").length === 1) {
      hours = "0" + hours;
    }
    if (String(minutes).split("").length === 1) {
      minutes = "0" + minutes;
    }
  
    // Formatting the hotlist output into the API
    var programs = []; 
    for (var i = 0; i < 100; i ++) {
      programs.push({
        title: hotlist.data.listTopPrograms.programs[i].translatedTitle, 
        author: hotlist.data.listTopPrograms.programs[i].authorNickname, 
        votes: hotlist.data.listTopPrograms.programs[i].sumVotesIncremented, 
        forks: hotlist.data.listTopPrograms.programs[i].displayableSpinoffCount, 
        thumbnail: "https://www.khanacademy.org" + hotlist.data.listTopPrograms.programs[i].imagePath, 
        link: "https://www.khanacademy.org" + hotlist.data.listTopPrograms.programs[i].url, 
        authorLink: "https://www.khanacademy.org/profile/" + hotlist.data.listTopPrograms.programs[i].authorKaid,
      }); 
    }
  
    // Indenting the JSON
    programs = JSON.stringify(programs, null, 2); 
    programs = programs.split("\n"); 
    var programsString = ""; 
    for (var i = 0; i < 30; i ++) {
      if (i === 0) {
        programsString += programs[i] + "\n"; 
      }
      else if (i === 29) {
        programsString += "  " + programs[i]; 
      }
      else {
        programsString += "  " + programs[i] + "\n"; 
      }
    }
    var programsString2 = ""; 
    for (var i = 0; i < programs.length; i ++) {
      if (i === 0) {
        programsString2 += programs[i] + "\n"; 
      }
      else if (i === programs.length - 1) {
        programsString2 += "  " + programs[i]; 
      }
      else {
        programsString2 += "  " + programs[i] + "\n"; 
      }
    }
    
    // Putting the API into a function
    var toWrite = "var LoadHotlistAPI = function() {\n  return " +  programsString + ";\n};";
    var toWrite2 = "var LoadHotlistAPI = function() {\n  return " +  programsString2 + ";\n};";
  
    // Commiting the files
    if (String(minutes).split("")[1] === "0") {
      githubWrite("api-" + String(year) + String(month) + String(day) + String(hours) + String(minutes) + ".js", toWrite, "Hotlist - 1.3.0 - update - " + String(day) + "-" + String(month) + "-" + String(year) + " " + String(hours) + ":" + String(minutes)); 
      
      console.log("Hotlist - 1.3.0 - update - " + String(day) + "-" + String(month) + "-" + String(year) + " " + String(hours) + ":" + String(minutes)); 
    }

    githubWrite("new-api/new-api-" + String(year) + String(month) + String(day) + String(hours) + String(minutes) + ".js", toWrite2, "Hotlist - 1.6.0 - update - " + String(day) + "-" + String(month) + "-" + String(year) + " " + String(hours) + ":" + String(minutes)); 
    
    console.log("Hotlist - 1.6.0 - update - " + String(day) + "-" + String(month) + "-" + String(year) + " " + String(hours) + ":" + String(minutes)); 
  
    function clearOldHotlistLogs(delay) {
      // Getting date and time before {delay} minutes
      var date = new Date(Date.now() - 1000 * 60 * delay);
      var year = date.getUTCFullYear();
      var month = date.getUTCMonth();
      var day = date.getUTCDate();
      var hours = date.getUTCHours();
      var minutes = date.getUTCMinutes();
    
      // Formatting the date
      if (String(month).split("").length === 1) {
        month = "0" + String(parseInt(month) + 1);
      }
      if (String(day).split("").length === 1) {
        day = "0" + day;
      }
      if (String(hours).split("").length === 1) {
        hours = "0" + hours;
      }
      minutes = String(minutes).split("")[0] + "0"; 
    
      // Removing the files
      githubRemove("api-" + String(year) + String(month) + String(day) + String(hours) + String(minutes) + ".js", "Hotlist - 1.3.0 - remove - " + String(day) + "-" + String(month) + "-" + String(year) + " " + String(hours) + ":" + String(minutes), (success) => {
        if (success) {
          console.log("Hotlist - 1.3.0 - remove - " + String(day) + "-" + String(month) + "-" + String(year) + " " + String(hours) + ":" + String(minutes)); 
        }
        if (delay < 100) {
          clearOldHotlistLogs(delay + 10); 
        }
      }); 
    }

    if (String(minutes).split("")[1] === "0") {
      clearOldHotlistLogs(30); 
    }

    function clearOldHotlistLogs2(delay) {
      // Getting date and time before {delay} minutes
      var date = new Date(Date.now() - 1000 * 60 * delay);
      var year = date.getUTCFullYear();
      var month = date.getUTCMonth();
      var day = date.getUTCDate();
      var hours = date.getUTCHours();
      var minutes = date.getUTCMinutes();
    
      // Formatting the date
      if (String(month).split("").length === 1) {
        month = "0" + String(parseInt(month) + 1);
      }
      if (String(day).split("").length === 1) {
        day = "0" + day;
      }
      if (String(hours).split("").length === 1) {
        hours = "0" + hours;
      }
      if (String(minutes).split("").length === 1) {
        minutes = "0" + minutes;
      }
    
      // Removing the files
      githubRemove("new-api/new-api-" + String(year) + String(month) + String(day) + String(hours) + String(minutes) + ".js", "Hotlist - 1.6.0 - remove - " + String(day) + "-" + String(month) + "-" + String(year) + " " + String(hours) + ":" + String(minutes), (success) => {
        if (success) {
          console.log("Hotlist - 1.6.0 - remove - " + String(day) + "-" + String(month) + "-" + String(year) + " " + String(hours) + ":" + String(minutes)); 
        }
        if (delay < 30) {
          clearOldHotlistLogs2(delay + 1); 
        }
      }); 
    }
  
    clearOldHotlistLogs2(3); 
  }); 
}

hotlist(); 
setInterval(hotlist, 60 * 1000); 

/** Hosting */
app.get('/', (req, res) => {
  res.send('Hello world! '); 
}); 

server.listen(3000, () => {}); // Opening port 3000
