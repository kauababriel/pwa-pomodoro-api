const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;


app.use(cors());


app.get('/api', (req, res) => {
  res.json({ message: 'API do Pomodoro está funcionando!' });
});


app.get('/api/get-quote', async (req, res) => {
  try {
    
    const response = await fetch('https://api.quotable.io/random');
    if (!response.ok) {
      throw new Error('Erro ao buscar citação.');
    }
    const data = await response.json();
    
    
    res.json({
      content: data.content,
      author: data.author
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Falha interna ao buscar citação.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});