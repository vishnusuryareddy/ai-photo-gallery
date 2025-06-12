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

// ✅ CHATBOT FUNCTION
async function askChatbot() {
  const question = document.getElementById("chatInput").value;
  const responseBox = document.getElementById("chatbotResponse");
  responseBox.innerText = "Thinking...";

  const apiKey = "YOUR_API_KEY_HERE"; // <-- Don't expose real key!

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }]
      })
    });

    const data = await res.json();

    let reply = "Sorry, no reply from AI.";
    if (data.choices && data.choices.length > 0) {
      reply = data.choices[0].message.content;
    }

    responseBox.innerText = "💡 " + reply;
  } catch (error) {
    responseBox.innerText = "❌ Error talking to AI: " + error.message;
    console.error("API Error:", error);
  }
}
