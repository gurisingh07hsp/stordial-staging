const express = require('express');
const router = express.Router();

router.get('/', async (req,res, next) => {
  try {
    const { input } = req.query;
    //   const response = await fetch(
    //   `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${input}&types=(cities)&components=country:in&key=${process.env.PLACES_API}`
    // );
    
    const response = await fetch(
      `https://api.locationiq.com/v1/autocomplete?key=pk.9611cbd13c44120529368e3857f1afe6&q=${input}&limit=5&dedupe=1&countrycodes=in`
    );
    
    const data = await response.json();
    if(!data.error){
      res.status(200).json({
      success: true,
      predictions: data
      });
    }
  } catch(error){
    next(error);
  }

})

module.exports = router; 