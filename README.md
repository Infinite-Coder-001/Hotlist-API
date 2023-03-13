# Hotlist API
This repository downloads data from Khan Academy hotlist every minute. You can easily access it from any KA sketch. 

## Versions
| **Version** |                                             **Description**                                             | **Still works**? |
|:-----------:|:-------------------------------------------------------------------------------------------------------:|:----------------:|
|<1.3.0       |These version were just tests, they didn't work.                                                         |NO                |
|1.3.0        |This version worked, but the data were sometimes old + only 30 scratchpads from hotlist.                 |**YES**           |
|1.4.0        |This is the current version, the data is updating every minute + 100 scratchpad from hotlist.            |**YES**           |

## Importing
**1**. Create a new **webpage** on Khan Academy. 

**2**. Add `<script src = "https://cdn.jsdelivr.net/gh/Infinite-Coder-001/Hotlist-API@latest/main.js"></script>` to `<head>` of your HTML page. *Note*: To import a specific version, add `<script src = "https://cdn.jsdelivr.net/gh/Infinite-Coder-001/Hotlist-API@[REPLACE-WITH-YOUR-VERSION]/main.js"></script>` instead. 

**3**. Create a new `<script>` in the body. Call `HotlistAPI(callback);` in `<script>`. The `callback` is a function, that is called after all data is loaded. The function will be called with an argument - the API output. **Example**: 

```
<!DOCTYPE html>
<!-- This is an example of using Hotlist API -->
<html>
    <head>
        <title>HotlistAPI example</title>
        <script src = "https://cdn.jsdelivr.net/gh/Infinite-Coder-001/Hotlist-API@latest/main.js"></script> <!-- Including the script -->
    </head>
    <body>
        <p id = "demo"></p>
        <script>
            function myCallback(data) {
                // This function is called, when the data is loaded
                document.getElementById("demo").innerHTML = JSON.stringify(data); // Showing the raw JSON
            }
            function loadData() {
                HotlistAPI(myCallback); // Loading the data
            }
            loadData(); // Loading the data
            setInterval(loadData, 60 * 1000); // Updating the page every 60 seconds (60 * 1000 milliseconds)
        </script>
    </body>
</html>
```

*This example loads data from hotlist*, *then shows it as JSON*. 

## Callback
The callback function is called after all data is loaded. The function is called with an argument - an array with 100 arguments - the top 100 programs on Hotlist. Each argument in the array is an object, that contains: 
 - `title`: The title of the program
 - `author`: Author of the program
 - `votes`: Amount of votes, that the program has
 - `forks`: Amount of forks of the program
 - `thumbnail`: A link to the thumbnail of the program
 - `link`: A link to the program
 - `authorLink`: A link to the author of the program

**One of the objects can look like**: 
```
{
    title: 'My program', 
    author: 'User001', 
    votes: 56, 
    forks: 3, 
    thumbnail: 'https://www.khanacademy.org/computer-programming/my-program/4562858687048265/3027863059364320.png', 
    link: 'https://www.khanacademy.org/computer-programming/cloud-interesting-effects/4562858687048265', 
    authorLink: 'https://www.khanacademy.org/profile/kaid_1254789652148759632501203'
}, 
```

*Don't forget, that there are 100 in total*. 

**Example program**: 
```
<!DOCTYPE html>
<!-- This program loads data from Khan Academy and puts it in a table -->
<html>
    <head>
        <title>HotlistAPI example 2</title>
        <script src = "https://cdn.jsdelivr.net/gh/Infinite-Coder-001/Hotlist-API@latest/main.js"></script> <!-- Including the script -->
        <style>
            table {
                font-family: arial, sans-serif;
                border-collapse: collapse;
                white-space: nowrap;
            }

            td, th {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;
            }

            th {
                text-align: center;
            }

            tr:nth-child(even) {
                background-color: #dddddd;
            }
        </style>
    </head>
    <body>
        <table id = "demo"></table>
        <script>
            function myCallback(data) {
                // This function is called, when the data is loaded
                var data2 = "";
                
                for (var i = 0; i < data.length; i ++) {
                    data2 += "<tr>";
                    data2 += "<td>" + data[i].title + "</td>";
                    data2 += "<td>" + data[i].author + "</td>";
                    data2 += "<td>" + data[i].votes + "</td>";
                    data2 += "<td>" + data[i].forks + "</td>";
                    data2 += "<td>" + data[i].thumbnail + "</td>";
                    data2 += "<td>" + data[i].link + "</td>";
                    data2 += "<td>" + data[i].authorLink + "</td>";
                    data2 += "</tr>";
                }
                
                document.getElementById("demo").innerHTML = "<tr><th>Title</th><th>Author</th><th>Votes</th><th>Forks</th><th>Thumbnail</th><th>Link</th><th>Author link</th></tr>" + data2; // Updating the table
            }
            function loadData() {
                HotlistAPI(myCallback); // Loading the data
            }
            loadData(); // Loading the data
            setInterval(loadData, 60 * 1000); // Updating the page every 60 seconds (60 * 1000 milliseconds)
        </script>
    </body>
</html>
```

## Credits
Please give link to this repository (or ideally to this project: https://www.khanacademy.org/computer-programming/hotlist-api/5234045946740736), when you're using it. The link can be in included code or on the webpage, that you make. 

## Questions
If you have any questions about this project, fell free to ask in Discussion section. You can also check my second documentation with examples here: https://www.khanacademy.org/computer-programming/hotlist-api/5234045946740736

## Bug reporting
If you find any bugs, please report them in Issues. 
