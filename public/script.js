const button = document.getElementById("searchBtn");
const tableBody = document.getElementById("resultsBody");
const errorBox = document.getElementById("error");
const status = document.getElementById("status");

button.addEventListener("click", downloadData);

async function downloadData() {
  const q = document.getElementById("q").value;
  const limit = document.getElementById("limit").value;
  const gifContainer = document.getElementById("gifContainer");
  gifContainer.innerHTML = "";

  try {
    const res = await fetch(`/search?q=${encodeURIComponent(q)}&limit=${limit}`);
    if (!res.ok) throw new Error(`Błąd serwera: ${res.status}`);
    const data = await res.json();

    if (!data.data?.length) {
      gifContainer.textContent = "Nie znaleziono GIF";
      return;
    }

    data.data.forEach((gif) => {
      const url = gif.images?.downsized_medium?.url;
      if (url) {
        const img = document.createElement("img");
        img.src = url;
        img.style.maxWidth = "200px";
        img.style.borderRadius = "8px";
        gifContainer.appendChild(img);
      }
    });
  } catch (err) {
    gifContainer.textContent = `Błąd: ${err.message}`;
  }
}


