const router = require("express").Router();
const Unsplash = require('unsplash-js').default;
const unsplashKey = process.env.APP_ACCESS_KEY;
const unsplash = new Unsplash({ accessKey: unsplashKey });
const toJson = require("unsplash-js").toJson;

router.get('/', (req, res) => {
  unsplash.search.photos("mercedes", 1, 10, { orientation: "portrait" })
  .then(toJson)
  .then(photos => {
    // Your code
    return res.json(photos);
  });
})

module.exports = router;