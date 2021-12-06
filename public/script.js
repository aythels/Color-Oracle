const colorThief = new ColorThief();

function disableButton() {
  const button = document.getElementById("submit-button");
  button.innerHTML = "LOADING...";
  button.classList.add('disabled');

  const progressBar = document.getElementById("progress-bar-visiblity");
  progressBar.style.opacity = '100%';
}

function enableButton() {
  const button = document.getElementById("submit-button");
  button.innerHTML = "GO";
  button.classList.remove('disabled');

  const progressBar = document.getElementById("progress-bar-visiblity");
  progressBar.style.opacity = '0%';
}

function toggleErrorMessage(bool) {
  const msg = document.getElementById("title");

  if (bool === true) msg.style.opacity = '100%';
  else if (bool === false) msg.style.opacity = '0%';
}

function onGoClick() {
  disableButton();
  toggleErrorMessage(false);

  const username = document.querySelectorAll('input')[0].value;
  if (username.length <= 0) {
    enableButton();
    toggleErrorMessage(true);
    return;
  }

  const url = `${window.location.origin}/api/profile/${username}`;
  const newUrl = `https://izoomyou.app/api/v1/resources/user/${username}`;

  // Sending request
  axios.get(url)
  .then((response) => {
    console.log(response.data);
    processImage(response.data.url)
      .then((image) => { 
        appendImages([image], [[255, 0, 10]]);
        enableButton();
      });
  }, (error) => {
    enableButton();
    toggleErrorMessage(true);
    console.log(error);
  });

}

async function processImage(url) {   
  try {
    const imageUrl = url;
    const proxyUrl = `https://api.allorigins.win/raw?url=`;

    const response = await fetch(`${proxyUrl}${encodeURIComponent(imageUrl)}`);
    if(!response.ok) throw new Error('Network response was not ok.');

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = response.url;

    img.addEventListener('load', function() {
      //const element = document.querySelector(`[src="${response.url}"]`);
      const allPalettes = colorThief.getPalette(img, 3);
      const words = [];

      allPalettes.forEach(palette => {
        const available = predict(palette, 1);
        const choosen = choose(available);
        words.push(choosen);
      });

      const element = document.querySelector(".card-content.center-align");
      element.innerHTML = `<p>${words.toString()}</p>`;
    });

    return img;
  } catch (error) {
    console.log(error);
  }
}

async function processImages(urlArray) {
  const allImages = [];

  for await (let url of urlArray) {      
    const imageUrl = url;
    const proxyUrl = `https://api.allorigins.win/raw?url=`;

    const response = await fetch(`${proxyUrl}${encodeURIComponent(imageUrl)}`);
    if(!response.ok) throw new Error('Network response was not ok.');

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = response.url;

    allImages.push(img);
  };

  return allImages;

}

function appendImages(array, text) {
  const grid = document.getElementById("img_grid");
  grid.innerHTML = '';

  // Creating row
  let rowElement = document.createElement("div");
  rowElement.className = "row";
  
  let counter = 0;
  array.forEach((image, index) => {
    // Inner
    const cardImage = document.createElement("div");
    cardImage.className = "card-image";
    cardImage.appendChild(image);

    const cardContent = document.createElement("div");
    cardContent.className = "card-content center-align";
    cardContent.innerHTML = `<p>${text[index].toString()}</p>`;

    const card = document.createElement("div");
    card.className = "card";
    card.appendChild(cardImage);
    card.appendChild(cardContent);

    const column = document.createElement("div");
    column.className = "col s3";
    column.appendChild(card);

    // Appending entry to row
    rowElement.appendChild(column);
    counter += 1;

    // Appending row to grid
    if (counter === 4) {
      grid.append(rowElement);

      rowElement = document.createElement("div");
      rowElement.className = "row";

      counter = 0;
    }

  });

  if (counter !== 0) grid.append(rowElement);
}

/*
processImageTest(
  ["https://picsum.photos/200", 
  "https://picsum.photos/200", 
  "https://picsum.photos/200", 
  "https://picsum.photos/200", 
  "https://picsum.photos/200"])
  .then((imageArray) => appendImages(imageArray));
*/

//appendImage(["https://picsum.photos/200", "https://picsum.photos/200", "https://picsum.photos/200", "https://picsum.photos/200", "https://picsum.photos/200"]);