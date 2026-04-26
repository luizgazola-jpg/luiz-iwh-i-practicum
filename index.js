const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;
const HUBSPOT_TOKEN = process.env.PRIVATE_APP_ACCESS_TOKEN;
const HUBSPOT_OBJECT_TYPE = process.env.HUBSPOT_OBJECT_TYPE;

const CUSTOM_OBJECT_PROPERTIES = ['name', 'author', 'genre'];

app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const hubspotClient = axios.create({
  baseURL: 'https://api.hubapi.com',
  headers: {
    Authorization: `Bearer ${HUBSPOT_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

app.get('/', async (req, res) => {
  try {
    const response = await hubspotClient.get(`/crm/v3/objects/${HUBSPOT_OBJECT_TYPE}`, {
      params: {
        limit: 100,
        properties: CUSTOM_OBJECT_PROPERTIES.join(','),
      },
    });

    res.render('homepage', {
      title: 'Custom Objects Table | Integrating With HubSpot I Practicum',
      records: response.data.results,
    });
  } catch (error) {
   console.error('Error fetching records:', JSON.stringify({
  status: error.response?.status,
  data: error.response?.data,
  message: error.message,
}, null, 2));

    res.status(500).render('homepage', {
      title: 'Custom Objects Table | Integrating With HubSpot I Practicum',
      records: [],
      error: 'There was an error loading the custom object records.',
    });
  }
});

app.get('/update-cobj', (req, res) => {
  res.render('updates', {
    title: 'Update Custom Object Form | Integrating With HubSpot I Practicum',
  });
});

app.post('/update-cobj', async (req, res) => {
  const { name, author, genre } = req.body;

  try {
    await hubspotClient.post(`/crm/v3/objects/${HUBSPOT_OBJECT_TYPE}`, {
      properties: {
        name,
        author,
        genre,
      },
    });

    res.redirect('/');
  } catch (error) {
   console.error('Error creating record:', JSON.stringify({
  status: error.response?.status,
  data: error.response?.data,
  message: error.message,
}, null, 2));

    res.status(500).render('updates', {
      title: 'Update Custom Object Form | Integrating With HubSpot I Practicum',
      error: 'There was an error creating the record.',
      values: req.body,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});