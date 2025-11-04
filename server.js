import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Twój token NOAA
const API_TOKEN = "pZ6q49H4GSbxiLYEaibvB58XMvm3I2vc";
const API_BASE = "https://api.giphy.com/v1/gifs/random";

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));


async function proxyFetch(params = {}) {
  const url = new URL(API_BASE);
  url.searchParams.append("api_key", API_TOKEN);
  url.searchParams.append("rating", params.rating || "g");
  if (params.tag) url.searchParams.append("tag", params.tag);

  const response = await fetch(url);



  if (!response.ok) {
    const text = await response.text();
    throw new Error(`NOAA ${response.status}: ${text}`);
  }

  return await response.json();
}


app.get("/gif", async (req, res) => {
  try {
    const data = await proxyFetch(req.query);
    res.json(data);
  } catch (err) {
    console.error("Błąd proxy /gif:", err.message);
    res.status(500).json({ error: err.message });
  }
});




app.listen(PORT, "0.0.0.0", () => {
  console.log(`Proxy działa na http://localhost:${PORT}`);
});
