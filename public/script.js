const colorThief = new ColorThief();

function disableButton() {
  const button = document.getElementById("submit-button");
  button.innerHTML = "LOADING...";
  button.classList.add('disabled');

  const progressBar = document.getElementById("progress-bar-visiblity");
  progressBar.style.opacity = '100%';

  const dataContainer = document.getElementsByClassName("data-container")[0];
  dataContainer.style.opacity = "0%";
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
		processImage(response.data.url, response.data.username).then((image) => { 
			enableButton();
		});
	},(error) => {
		enableButton();
		toggleErrorMessage(true);
		console.log(error);
	});

}

async function processImage(url, username) {   
  try {
    const imageUrl = url;
	const proxyUrl = `https://api.allorigins.win/raw?url=`;

    const response = await fetch(`${proxyUrl}${encodeURIComponent(imageUrl)}`);
    if(!response.ok) throw new Error('Network response was not ok.');

    const img = new Image();
    img.crossOrigin = 'Anonymous';
	img.className = "image-src";
    img.src = response.url;

    img.addEventListener('load', function() {
		const allPalettes = colorThief.getPalette(img, 3);
		const words = [];

		allPalettes.forEach(palette => {
			const available = predict(palette, 1);
			const choosen = choose(available);
			words.push(choosen);
		});

	  appendImage(img, words, allPalettes);

    });

    return img;
  } catch (error) {
    console.log(error);
  }
}

const appendImage = function (element, words, palette) {
	const dataContainer = document.getElementsByClassName("data-container")[0];
	dataContainer.style.opacity = "100%";

	const container = document.getElementsByClassName("image-container")[0];

	container.innerHTML = "";
	container.append(element);

	const a = document.getElementById("color1");
	a.innerHTML = `<span class="dot" id="dot1"></span>${words[0]}`;
	a.style.color = `rgb(${palette[0][0]}, ${palette[0][1]}, ${palette[0][2]})`;

	const ad = document.getElementById("dot1");
	ad.style.backgroundColor = `rgb(${palette[0][0]}, ${palette[0][1]}, ${palette[0][2]})`;

	const b = document.getElementById("color2");
	b.innerHTML = `<span class="dot" id="dot2"></span>${words[1]}`;
	b.style.color = `rgb(${palette[1][0]}, ${palette[1][1]}, ${palette[1][2]})`;
	
	const bd = document.getElementById("dot2");
	bd.style.backgroundColor = `rgb(${palette[1][0]}, ${palette[1][1]}, ${palette[1][2]})`;

	const c = document.getElementById("color3");
	c.innerHTML = `<span class="dot" id="dot3"></span>${words[2]}`;
	c.style.color = `rgb(${palette[2][0]}, ${palette[2][1]}, ${palette[2][2]})`;
	
	const cd = document.getElementById("dot3");
	cd.style.backgroundColor = `rgb(${palette[2][0]}, ${palette[2][1]}, ${palette[2][2]})`;
}