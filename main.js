// This is the main file, that is loading in the <head> of your HTML page
// Link to this file is 'https://cdn.jsdelivr.net/gh/Infinite-Coder-001/Hotlist-API@latest/main.js'

function HotlistAPI(callback) {
    /* Loads the data */
    var script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/gh/Infinite-Coder-001/Hotlist-API@latest/data/hotlist-data.js";
    document.head.appendChild(script); 
    script.onload = function() {
        callback(loadHotlistData());
    };
}