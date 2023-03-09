# Hotlist-API
This repository downloads data from Khan Academy hotlist every 5-10 minutes. You can easily access it from any KA sketch. 

## Working versions
| **Version** | **Works** |
|:-----------:|:---------:|
|<1.1.0       |❌         |
|1.1.0        |✔️         |

## Importing
**1**. Add `<script src = "https://cdn.jsdelivr.net/gh/Infinite-Coder-001/Hotlist-API@main/main.js"></script>` to `<head>` of your HTML page. 

**2**. Call `HotlistAPI(callback);` in `<script>` tag. The `callback` is the function, that is called after the data is loaded. The function will be called with an argument, that contains raw JSON - the API output. **Example**: 

```
<!DOCTYPE html>
<!-- This is an example of using Hotlist API -->
<html>
    <head>
        <title>HotlistAPI example</title>
        <script src = "https://cdn.jsdelivr.net/gh/Infinite-Coder-001/Hotlist-API@main/main.js"></script> <!-- Including the script -->
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

## Callback
The callback function is called after all data is loaded. The function is called with an argument. The argument is an array with 30 arguments - the top 30 programs on Hotlist. Each argument in the array is an object and each object contains: 
 - `title`: The title of the program
 - `author`: Author of the program
 - `votes`: Amount of votes, that the program has
 - `forks`: Amount of forks of the program
 - `thumbnail`: A link to the thumbnail of the program
 - `link`: A link to the program
 - `authorLink`: A link to the author of the program

**Example program scratchpad**: 
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
**Example program**: 
```
<!DOCTYPE html>
<!-- This program loads data from Khan Academy and puts it in a table -->
<html>
    <head>
        <title>HotlistAPI example 2</title>
        <script src = "https://cdn.jsdelivr.net/gh/Infinite-Coder-001/Hotlist-API@main/main.js"></script> <!-- Including the script -->
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
Please give link to this repository, when you're using it. The link can be in included code or on the webpage, that you make. 

## Questions
If you have any questions about this project, fell free to ask in Discussion section. 

## Bug reporting
If you find any bugs, please report them in Issues. 
