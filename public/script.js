    const button = document.getElementById("searchBtn");
    const tableBody = document.getElementById("resultsBody");
    const errorBox = document.getElementById("error");
    const status = document.getElementById("status");

    button.addEventListener("click", downloadData);

    async function downloadData() {
      errorBox.style.display = "none";
    
      try {
        const res = await fetch("/datasets");

        if (!res.ok) {
          const t = await res.text();
          throw new Error(`Błąd serwera: ${res.status} ${t}`);
        }
        const data = await res.json();

        tableBody.innerHTML = "";
        data.results.forEach(dataset => {
          const id = dataset.id || "-";
          const name = dataset.name || "-";
          const datacoverage = dataset.datacoverage || "-";
          const mindate = dataset.mindate || "-";
          const maxdate = dataset.maxdate || "-";

          const row = `
            <tr>
              <td>${id}</td>
              <td>${name}</td>
              <td>${datacoverage}</td>
              <td>${mindate}</td>
              <td>${maxdate}</td>
            </tr>`;
          tableBody.innerHTML += row;
        });
      } catch (err) {
        tableBody.innerHTML = `<tr><td colspan="5">Błąd: ${err.message}</td></tr>`;
      }
    }
