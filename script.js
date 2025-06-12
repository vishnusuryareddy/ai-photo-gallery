let images = [];

document.getElementById("upload").addEventListener("change", function(event) {
  const files = event.target.files;

  for (let file of files) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const image = {
        src: e.target.result,
        name: file.name
      };
      images.push(image);
      displayImages(images);
    };
    reader.readAsDataURL(file);
  }
});

function displayImages(imagesToShow) {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";
  imagesToShow.forEach(img => {
    const imageElement = document.createElement("img");
    imageElement.src = img.src;
    gallery.appendChild(imageElement);
  });
}

// VOICE RECOGNITION
function startListening() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';

  recognition.onresult = function(event) {
    const voiceText = event.results[0][0].transcript.toLowerCase();
    alert("You said: " + voiceText);

    const filtered = images.filter(img => img.name.toLowerCase().includes(voiceText));
    displayImages(filtered);
  };

  recognition.start();
}
