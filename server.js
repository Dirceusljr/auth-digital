import "dotenv/config";
import app from "./src/app.js";

const porta = process.env.PORT || 3000;

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`)
})