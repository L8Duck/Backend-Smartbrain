import dotenv from "dotenv";

dotenv.config();

const handleApi = () => (req, res) => {
const MODEL_ID = 'face-detection';
const PAT =  process.env.PAT; 
const USER_ID = process.env.USER_ID      
const APP_ID = process.env.APP_ID;     

const returnRequestOption = (imageURL) => {
const IMAGE_URL = imageURL;
const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
});
const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
};
return requestOptions;
}
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", returnRequestOption(req.body.imageURL))
    .then(response =>response.json())
    .then(data => res.json(data))
    .catch(err => console.log(err))
}

export default handleApi;