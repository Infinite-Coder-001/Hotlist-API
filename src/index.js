const { exec } = require("child_process");
const fs = require("fs"); 
const path = require("path"); 

const dataFilePath = path.resolve(__dirname, "../data/hotlist-data.js"); 

function execWithLog(command) {
    /* Executes a command and logs any errors */
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
    });
}

function commitAndPush() {
    execWithLog("git fetch");
    execWithLog("git pull"); 
    // execWithLog(`git add ${dataFilePath}`);
}

function writeFile(programs) {
    let stringifiedPrograms = JSON.stringify(programs, null, 4); 

    // Add 4 spaces to the beginning of each line to keep the formatting
    let lineSplitStringifiedPrograms = stringifiedPrograms.split("\n");
    stringifiedPrograms = lineSplitStringifiedPrograms[0]; // "["
    for (let i = 1; i < lineSplitStringifiedPrograms.length; i ++) {
        stringifiedPrograms += "\n    " + lineSplitStringifiedPrograms[i];
    }

    let updateTime = new Date(); 

    let fileContents = `/* This file was generated via \`node ../src/index.js\` */
/* Last update: ${updateTime} */
let loadHotlistData = function() {
    return ${stringifiedPrograms};
}
    
let getLastUpdate = function() {
    return new Date("${updateTime}"); 
}`;

    fs.writeFileSync(dataFilePath, fileContents, encoding="utf-8"); 
    commitAndPush();
}

function formatResponse(response) {
    // Formatting the hotlist output into the API
    let programs = []; 
    for (let i = 0; i < 100; i ++) {
        programs.push({
            title: response.data.listTopPrograms.programs[i].translatedTitle, 
            author: response.data.listTopPrograms.programs[i].authorNickname, 
            votes: response.data.listTopPrograms.programs[i].sumVotesIncremented, 
            forks: response.data.listTopPrograms.programs[i].displayableSpinoffCount, 
            thumbnail: "https://www.khanacademy.org" + response.data.listTopPrograms.programs[i].imagePath, 
            link: "https://www.khanacademy.org" + response.data.listTopPrograms.programs[i].url, 
            authorLink: "https://www.khanacademy.org/profile/" + response.data.listTopPrograms.programs[i].authorKaid,
            programType: response.data.listTopPrograms.programs[i].userAuthoredContentType
        }); 
    }

    writeFile(programs); 
}

function queryHotlist() {
    fetch("https://www.khanacademy.org/api/internal/graphql/hotlist?lang=en&app=khanacademy", {
        "body": "{\"operationName\":\"hotlist\",\"query\":\"query hotlist($curationNodeId: String, $onlyOfficialProjectSpinoffs: Boolean!, $sort: ListProgramSortOrder, $pageInfo: ListProgramsPageInfo, $userAuthoredContentTypes: [UserAuthoredContentType!]) {\\n  listTopPrograms(\\n    curationNodeId: $curationNodeId\\n    onlyOfficialProjectSpinoffs: $onlyOfficialProjectSpinoffs\\n    sort: $sort\\n    pageInfo: $pageInfo\\n    userAuthoredContentTypes: $userAuthoredContentTypes\\n  ) {\\n    complete\\n    cursor\\n    programs {\\n      id\\n      key\\n      authorKaid\\n      authorNickname\\n      displayableSpinoffCount\\n      imagePath\\n      sumVotesIncremented\\n      translatedTitle: title\\n      url\\n      userAuthoredContentType\\n      __typename\\n    }\\n    __typename\\n  }\\n}\",\"variables\":{\"onlyOfficialProjectSpinoffs\":false,\"curationNodeId\":\"x45aed616\",\"sort\":\"HOT\",\"userAuthoredContentTypes\":[\"PJS\",\"PYTHON\",\"SQL\",\"WEBPAGE\"],\"pageInfo\":{\"itemsPerPage\":100}}}",
        "method": "POST",
        "mode": "cors"
    })
        .then(data => data.json())
        .then(response => {
            formatResponse(response); 
        })
}

queryHotlist(); 