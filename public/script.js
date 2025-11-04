const button = document.getElementById("searchBtn");
const tableBody = document.getElementById("resultsBody");
const errorBox = document.getElementById("error");
const status = document.getElementById("status");

button.addEventListener("click", downloadData);

async function downloadData() {
  const tag = document.getElementById("tag").value;
  const gifContainer = document.getElementById("gifContainer");
  gifContainer.innerHTML = "";

  try {
    const res = await fetch(`/gif?tag=${encodeURIComponent(tag)}`);
    if (!res.ok) throw new Error(`Błąd serwera: ${res.status}`);
    const data = await res.json();

    const gifUrl = data.data?.images?.downsized_medium?.url;
    if (!gifUrl) {
      gifContainer.textContent = "Nie znaleziono GIFa 😕";
      return;
    }

    gifContainer.innerHTML = `<img src="${gifUrl}" alt="Losowy GIF" style="max-width:100%;border-radius:8px;">`;
  } catch (err) {
    gifContainer.textContent = `Błąd: ${err.message}`;
  }
}


