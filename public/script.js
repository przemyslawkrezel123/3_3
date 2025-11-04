    const button = document.getElementById("searchBtn");
    const tableBody = document.getElementById("resultsBody");
    const errorBox = document.getElementById("error");
    const status = document.getElementById("status");

    button.addEventListener("click", downloadData);

    async function downloadData() {
      errorBox.style.display = "none";
    
      try {
        const res = await fetch("/stations");

        if (!res.ok) {
          const t = await res.text();
          throw new Error(`Błąd serwera: ${res.status} ${t}`);
        }
        const data = await res.json();

        tableBody.innerHTML = "";
        data.results.forEach(station => {
          const id = station.id || "-";
          const name = station.name || "-";
          const latitude = station.latitude || "-";
          const longitude = station.longitude || "-";

          const row = `
            <tr>
              <td>${id}</td>
              <td>${name}</td>
              <td>${latitude}</td>
              <td>${longitude}</td>
            </tr>`;
          tableBody.innerHTML += row;
        });
      } catch (err) {
        tableBody.innerHTML = `<tr><td colspan="5">Błąd: ${err.message}</td></tr>`;
      }
    }
