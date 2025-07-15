import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import GEMINI from "./gemini.js";
import geminiVoice from "./geminiVoice.js";
dotenv.config();
const app = express();
app.use(express.json());
const port = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/audio', express.static(path.join(__dirname, 'audio')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/ask', async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await GEMINI(prompt);
        await geminiVoice(response);

        const audio = path.join(__dirname, 'audio', 'out.wav');
        res.sendFile(audio, {
            headers: {
                'Content-Type': 'audio/wav',
                'Accept-Ranges': 'bytes',
                'Content-Disposition': 'inline; filename="out.wav"',
            }
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, (req, res) => {
    console.log("server is running on the port : ", port);
});