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

/*
loadJSON('r.json', (data) => {
    rData = data;
});

loadJSON('g.json', (data) => {
    gData = data;
});

loadJSON('b.json', (data) => {
    bData = data;
});
*/

/*
function predict(color, tolerance=0, direction=null) {
    let available = [];
    let [r, g, b] = color;

    if (r < 0) r = 0;
    if (r > 255) r = 255;
    if (g < 0) g = 0;
    if (g > 255) g = 255;
    if (b < 0) b = 0;
    if (b > 255) b = 255;
    if (tolerance === -1) return available;

    console.log(`searching`, r, g, b, direction);

    const rNames = rData[r];
    const gNames = gData[g];
    const bNames = bData[b];

    for (const word in rNames) {
        if (gNames.hasOwnProperty(word) && bNames.hasOwnProperty(word)) {
            available.push(word);
        }
    }

    
    console.log("recursion");

    let lowerTol = [];
    let upperTol = [];

    if (!direction || direction === "DOWN")  lowerTol = predict([r-1, g-1, b-1], tolerance-1, "DOWN");
    if (!direction || direction === "UP") upperTol = predict([r+1, g+1, b+1], tolerance-1, "UP");

    lowerTol = lowerTol.filter(e => !available.includes(e));
    upperTol = upperTol.filter(e => !available.includes(e));

    available = available.concat(lowerTol);
    available = available.concat(upperTol);

    if (available.length < 10 && !direction) return predict(color, tolerance+1);

    return available;
}*/

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

    return available;
}

function choose(array) {
    const indexA = Math.floor(Math.random() * array.length);
    //const indexB = Math.floor(Math.random() * array.length - 1);
    //const indexC = Math.floor(Math.random() * array.length - 2);

    const a = array.splice(indexA, 1);
    //const b = array.splice(indexB, 1);
    //const c = array.splice(indexC, 1);

    return a;
}

//const available = predict([255, 100, 255], 0);
//const choosen = choose(available);
//console.log(available);