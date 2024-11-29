// controller.js

const axios = require('axios');
require('dotenv').config();

// Controller to handle Facebook authentication and getting access token
const getAuthURL = (req, res) => {
  const { FACEBOOK_CLIENT_ID, FACEBOOK_REDIRECT_URI } = process.env;
  const authURL = `https://www.facebook.com/v14.0/dialog/oauth?client_id=${FACEBOOK_CLIENT_ID}&redirect_uri=${FACEBOOK_REDIRECT_URI}&scope=public_profile,email`;
  res.json({ authURL });
};

// Controller to handle the callback from Facebook after authentication
const getAccessToken = async (req, res) => {
  const { code } = req.query;
  const { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET, FACEBOOK_REDIRECT_URI } = process.env;

  try {
    // Exchange the authorization code for an access token
    const response = await axios.get(`https://graph.facebook.com/v14.0/oauth/access_token`, {
      params: {
        client_id: FACEBOOK_CLIENT_ID,
        redirect_uri: FACEBOOK_REDIRECT_URI,
        client_secret: FACEBOOK_CLIENT_SECRET,
        code,
      },
    });

    const { access_token } = response.data;
    res.json({ access_token });

  } catch (error) {
    res.status(500).json({ error: 'Failed to get access token', message: error.message });
  }
};

// Controller to fetch metrics after obtaining the access token
const getMetrics = async (req, res) => {
  const { access_token } = req.query;

  try {
    // Get the user's page metrics (followers, engagement, etc.)
    const response = await axios.get(`https://graph.facebook.com/v14.0/me?fields=id,name,followers_count,engagement`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    res.json(response.data);

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch metrics', message: error.message });
  }
};

module.exports = {
  getAuthURL,
  getAccessToken,
  getMetrics,
};
