let autoPlayInterval = null;
async function randomQuote() {
  try {
    const res = await fetch("http://127.0.0.1:3000/");
    const text = await res.text();
    const [quotePart, authorPart] = text.split('"-');
    const quoteValue = document.getElementById("quote");
    const authorValue = document.getElementById("author");

    quoteValue.textContent = quotePart.replace(/^"/, "");
    authorValue.textContent = authorPart;
  } catch (error) {
    console.error("Error fetching quote:", error);
  }
}

randomQuote();

document.getElementById("new-quote").addEventListener("click", randomQuote);

let autoPlayStatus = document.getElementById("autoStatus");

document.getElementById("autoPlay").addEventListener("click", () => {
  let autoPlayObj = document.getElementById("autoPlay");
  if (autoPlayObj.checked) {
    console.log("its true now");
    autoPlayStatus.textContent = "Auto-play: ON";
    autoPlayInterval = setInterval(randomQuote, 3000);
  } else {
    autoPlayStatus.textContent = "Auto-play: OFF";
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
});

document.getElementById("add-quote").addEventListener("click", async () => {
  const quote = document.getElementById("quote-input").value;
  const author = document.getElementById("author-input").value;

  if (!quote || !author) return alert("Both quote and author required.");

  try {
    const res = await fetch("http://127.0.0.1:3000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quote, author }),
    });
    const text = await res.text();
    alert(text);
  } catch (err) {
    console.error(err);
  }
});
