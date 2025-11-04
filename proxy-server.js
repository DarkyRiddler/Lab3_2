const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint dla stacji
app.get('/api/stations', async (req, res) => {
    try {
        const { limit = 100, offset = 0 } = req.query;
        const url = `https://www.ncei.noaa.gov/cdo-web/api/v2/stations?limit=${limit}&offset=${offset}`;
        
        console.log('Pobieranie stacji z NOAA API:', url);
        
        const response = await fetch(url, {
            headers: {
                'token': 'WaJjaSmUiBFOkXdurskspwnMOVoOKGYV'
            }
        });
        
        if (!response.ok) {
            throw new Error(`NOAA API error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log(`Pobrano ${data.results?.length || 0} stacji`);
        res.json(data);
    } catch (error) {
        console.error('Błąd proxy:', error.message);
        res.status(500).json({ 
            error: 'Błąd pobierania danych z NOAA API',
            details: error.message 
        });
    }
});

// Endpoint dla danych (datasets) - DZIAŁAJĄCY ENDPOINT
app.get('/api/datasets', async (req, res) => {
    try {
        const { limit = 100, offset = 0 } = req.query;
        const url = `https://www.ncei.noaa.gov/cdo-web/api/v2/datasets?limit=${limit}&offset=${offset}`;
        
        console.log('Pobieranie datasetów z NOAA API:', url);
        
        const response = await fetch(url, {
            headers: {
                'token': 'WaJjaSmUiBFOkXdurskspwnMOVoOKGYV'
            }
        });
        
        if (!response.ok) {
            throw new Error(`NOAA API error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log(`Pobrano ${data.results?.length || 0} datasetów`);
        res.json(data);
    } catch (error) {
        console.error('Błąd proxy:', error.message);
        res.status(500).json({ 
            error: 'Błąd pobierania danych z NOAA API',
            details: error.message 
        });
    }
});

// Endpoint dla kategorii danych (datacategories) - DZIAŁAJĄCY ENDPOINT
app.get('/api/datacategories', async (req, res) => {
    try {
        const { limit = 100, offset = 0 } = req.query;
        const url = `https://www.ncei.noaa.gov/cdo-web/api/v2/datacategories?limit=${limit}&offset=${offset}`;
        
        console.log('Pobieranie kategorii danych z NOAA API:', url);
        
        const response = await fetch(url, {
            headers: {
                'token': 'WaJjaSmUiBFOkXdurskspwnMOVoOKGYV'
            }
        });
        
        if (!response.ok) {
            throw new Error(`NOAA API error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log(`Pobrano ${data.results?.length || 0} kategorii danych`);
        res.json(data);
    } catch (error) {
        console.error('Błąd proxy:', error.message);
        res.status(500).json({ 
            error: 'Błąd pobierania danych z NOAA API',
            details: error.message 
        });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Serwer proxy działa na http://localhost:${PORT}`);
    console.log(`📊 API stacji: http://localhost:${PORT}/api/stations`);
    console.log(`📁 API datasetów: http://localhost:${PORT}/api/datasets`);
    console.log(`🗂️ API kategorii danych: http://localhost:${PORT}/api/datacategories`);
});