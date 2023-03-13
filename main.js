// This is the main file, that is loading in the <head> of your HTML page
// Link to this file is 'https://cdn.jsdelivr.net/gh/Infinite-Coder-001/Hotlist-API@latest/main.js'

function HotlistAPI(callback) {
    function loadHotlistData2(delay) {
        var timeoutVariable;
        function timeout(delay) {
            loadHotlistData2(delay + 1);
        }
        function finished() {
            clearTimeout(timeoutVariable);
            callback(LoadHotlistAPI());
        }
        var script = document.createElement('script');
        var date = new Date(Date.now() - 1000 * 60 * delay);
        var year = date.getUTCFullYear();
        var month = date.getUTCMonth();
        var day = date.getUTCDate();
        var hours = date.getUTCHours();
        var minutes = date.getUTCMinutes();

        if (String(month).split("").length === 1) {
            month = "0" + String(parseInt(month) + 1);
        }
        if (String(day).split("").length === 1) {
            day = "0" + day;
        }
        if (String(hours).split("").length === 1) {
            hours = "0" + hours;
        }
        minutes = String(minutes).split("")[0];

        script.src = "https://cdn.jsdelivr.net/gh/Infinite-Coder-001/Hotlist-API@main/api-" + year + month + day + hours + minutes + "0.js";
        script.onload = function() {
            finished();
        };

        document.head.appendChild(script); 
        if (delay < 160) {
            timeoutVariable = setTimeout(function() {
                timeout(delay);
            }, 1000);
        }
    }
    loadHotlistData2(0);
}

