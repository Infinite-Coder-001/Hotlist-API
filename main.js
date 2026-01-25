// This is the main file, that is loading in the <head> of your HTML page
// Link to this file is 'https://cdn.jsdelivr.net/gh/Infinite-Coder-001/Hotlist-API@latest/main.js'

function HotlistAPI(callback) {
    /* Gets current timestamp */
    var date = new Date(Date.now() - 1000 * 60 * 60);
    var year = date.getUTCFullYear();
    var month = date.getUTCMonth();
    var day = date.getUTCDate();
    var hours = date.getUTCHours();

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

    var filename = "data/hotlist-" + String(year) + "-" + String(month) + "-" + String(day) + "-" + String(hours) + ".js";

    /* Loads the data */
    var script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/gh/Infinite-Coder-001/Hotlist-API@main/" + filename;
    script.onload = function() {
        callback(loadHotlistData());
    };
}