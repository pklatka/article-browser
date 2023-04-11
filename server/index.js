const express = require('express')
const app = express();
const { spawn } = require('child_process');
const helmet = require("helmet");
const cors = require('cors')

const PORT = process.env.PORT || 3000;
const PYTHON = process.env.PYTHON || 'python3.10';

// Define middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.static('public'));

// Define routes
app.post('/api/search', async (req, res) => {
    try {
        // Get body
        const idf = req.body?.idf ? "-idf" : "";
        const svd = req.body?.svd ? "-svd" : "";
        const k = req.body?.k ? req.body.k : 10;
        const query = req.body?.query ? req.body.query : "";
        const matrix_filename = `matrix${svd}${idf}`

        // Run search.py and return results
        const pyProg = spawn(PYTHON, ['./core/search.py', query, k, matrix_filename]);

        let receivedData = ""
        let errorData = "";

        pyProg.stdout.on('data', (data) => {
            try {
                receivedData += data.toString();
            } catch (error) {
                res.status(500).send({ error })
            }
        });
        pyProg.stderr.on('data', (data) => {
            try {
                errorData += data.toString();
            } catch (error) {
                res.status(500).send({ error })
            }
        });
        pyProg.on('close', (code) => {
            if (code || errorData) {
                return res.status(500).send({ error: errorData })
            }
            res.send(JSON.parse(receivedData))
        });
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
});

app.get('*', async (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});