const express = require('express');
const router = express.Router();

router.get('/', async (req,res) => {
    const { input } = req.query;

    
    const response = await fetch(
    `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${input}&types=(cities)&components=country:in&key=${process.env.PLACES_API}`
  );

  const data = await response.json();

    res.status(200).json({
    success: true,
    predictions: data.predictions
  });

})

module.exports = router; 