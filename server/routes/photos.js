const router = require("express").Router();
const Unsplash = require('unsplash-js').default;
const unsplashKey = process.env.APP_ACCESS_KEY;
const unsplash = new Unsplash({ accessKey: unsplashKey });
const toJson = require("unsplash-js").toJson;

router.post('/', (req,res) => {
  try {
    const photoSearch = req.body.search;
    unsplash.search.photos(photoSearch, 1, 10, { orientation: "portrait" })
    .then(toJson)
    .then(photos => {
      return res.send(photos);
    });
  } catch(error) {
    console.log(error);
  } 
})

module.exports = router;