const button = document.getElementById("searchBtn");
const tableBody = document.getElementById("resultsBody");
const errorBox = document.getElementById("error");
const status = document.getElementById("status");
let currentPage = 1;
let lastQuery = "";
let lastLimit = 5;

button.addEventListener("click", downloadData);

async function downloadData(page = 1) {
  if (page instanceof PointerEvent) page = 1;
  
  const q = document.getElementById("q").value;
  const limit = parseInt(document.getElementById("limit").value);
  const gifContainer = document.getElementById("gifContainer");

  lastQuery = q;
  lastLimit = limit;
  currentPage = page;

  const offset = (page - 1) * limit;
  gifContainer.innerHTML = "";

  try {
    const res = await fetch(`/search?q=${encodeURIComponent(q)}&limit=${limit}&offset=${offset}`);
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

    paginacja(data.pagination.total_count);
  } catch (err) {
    gifContainer.textContent = `Błąd: ${err.message}`;
  }
}


function paginacja(totalCount) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(totalCount / lastLimit);

  if (totalPages <= 1) return;

  const prev = document.createElement("button");
  prev.textContent = "wstecz";
  prev.disabled = currentPage === 1;
  prev.onclick = () => downloadData(currentPage - 1);

  const next = document.createElement("button");
  next.textContent = "dalej";
  next.disabled = currentPage >= totalPages;
  next.onclick = () => downloadData(currentPage + 1);

  const info = document.createElement("span");
  info.textContent = ` Strona ${currentPage} z ${totalPages} `;
  info.style.margin = "0 10px";

  pagination.appendChild(prev);
  pagination.appendChild(info);
  pagination.appendChild(next);
}



