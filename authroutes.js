// routes.js

const express = require('express');
const router = express.Router();
const { getAuthURL, getAccessToken, getMetrics } = require('./authcontroller');

// Route to get the Facebook authentication URL
router.get('/auth/facebook', getAuthURL);

// Route for Facebook OAuth callback to exchange code for access token
router.get('/auth/facebook/callback', getAccessToken);

// Route to fetch metrics using the access token
router.get('/metrics', getMetrics);

module.exports = router;
