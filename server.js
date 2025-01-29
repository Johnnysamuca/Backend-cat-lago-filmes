require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors()); // Permite requisições do front-end

// Rota para buscar filmes
app.get("/movies", async (req, res) => {
  const { t, y } = req.query; // Parâmetros recebidos (título e ano)
  const API_KEY = process.env.OMDB_API_KEY;
  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&t=${t}&y=${y}`;

  try {
    const response = await axios.get(url); // Requisição à API OMDb
    res.json(response.data); // Retorna os dados para o front-end
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar dados na API." });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
