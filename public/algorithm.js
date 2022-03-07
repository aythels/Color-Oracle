console.log("starting algorithm");

function loadJSON(file, callback) {   
    /* https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript */

    const xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(JSON.parse(xobj.responseText));
          }
    };

    xobj.send(null);  
}

function wordBlacklisted(word) {
    const blacklist = [
        "blue",
        "black",
        "red",
        "white",
        "yellow",
        "green",
        "orange",
        "purple",
        "brown",
        "pink",
        "lfrc",
        "tg",
        "mr",
        "coral",
        "beige",
        "grey",
        "gray",
        "rc",
        "ntersee",
        "lilac",
    ];

    if (blacklist.includes(word)) return true;

    return false;
}

function predict(colorArray, tolerance=0) {
    let available = [];
    let [r, g, b] = colorArray;

    const rNames = rData[r];
    const gNames = gData[g];
    const bNames = bData[b];

    for (let i = -tolerance; i <= tolerance; i++) {
        const newR = r+i;
        const newG = g+i;
        const newB = b+i;

        if (newR >= 0 && newR < 256) Object.assign(rNames, rData[r+i]);
        if (newG >= 0 && newG < 256) Object.assign(gNames, gData[g+i]);
        if (newB >= 0 && newB < 256) Object.assign(bNames, bData[b+i]);
    }

    for (const word in rNames) {
        if (wordBlacklisted(word)) continue;
        if (gNames.hasOwnProperty(word) && bNames.hasOwnProperty(word))
            available.push(word);
    }


    if (available.length < 10) return predict(colorArray, tolerance+1);
    console.log(available);
    console.log(`
        All words: ${12913},
        Words in range: ${Object.keys(rNames).length + Object.keys(gNames).length + Object.keys(bNames).length},
        Words cross referenced: ${available.length},
        Final words chosen: 3,
    `)

    return available;
}

function choose(array) {
    const indexA = Math.floor(Math.random() * array.length);

    const a = array.splice(indexA, 1);

    return a;
}
