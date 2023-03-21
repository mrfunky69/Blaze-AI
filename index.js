const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const router = express.Router();


app.get("/",(req,res)=>{
  console.log("hello");
})

app.get('/opensea/followers', async (req, res) => {
  try {
    // Set up authentication with Twitter API
    const bearerToken = 'fkjdskfhkjadfjkkjadjfh';
    const headers = { Authorization: Bearer ${bearerToken} };

    // Make request to Twitter API to get list of followers
    const userId = 'opensa';
    const endpoint = "https://api.twitter.com/2/users/${userId}/followers";
    const response = await axios.get(endpoint, { headers });
    const response_data = response.data;

    // Extract follower data from response
    const followers = response_data.data.map(follower => ({
      verified: follower.verified,
      follower_count: follower.public_metrics.followers_count,
      following_count: follower.public_metrics.following_count,
      location: follower.location,
      description: follower.description,
    }));

    // Return follower data as JSON response
    res.json(followers);
  }, catch(error){
    console.error(error);
    res.status(500).send('Server Error');
  }
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
