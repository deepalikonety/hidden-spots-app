const express = require('express');
const router = express.Router();
const Spot = require('../models/Spot');
const { parser } = require('../utils/cloudinary'); 

router.post('/add', parser.array('images', 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No images uploaded" });
    }

    const { name, description, vibe, lat, lng, uniqueness, safety, crowd } = req.body;

    if (!name || !description || !vibe || !lat || !lng) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const imageUrls = req.files.map((file) => file.path); 

    const newSpot = new Spot({
      name,
      description,
      vibe,
      imageUrls,
      ratings: {
        uniqueness: Number(uniqueness),
        vibe: 5,
        safety: Number(safety),
        crowd: Number(crowd),
      },
      location: {
        type: 'Point',
        coordinates: [Number(lng), Number(lat)],
      },
    });

    await newSpot.save();
    res.status(201).json({ success: true, spot: newSpot });

  } catch (err) {
    console.error("❌ ERROR IN /add:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// GET all spots (with coordinates)
router.get('/all', async (req, res) => {
  try {
    const spots = await Spot.find();
    res.json(spots);
  } catch (err) {
    console.error("❌ Failed to get all spots:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get('/nearby', async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: "Missing coordinates" });
  }

  try {
    const spots = await Spot.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: 5000, // 5km radius
        },
      },
    });

    res.json(spots);
  } catch (err) {
    console.error("❌ Failed to fetch nearby spots:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE a spot by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Spot.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Spot not found' });
    }
    res.json({ success: true, message: 'Spot deleted' });
  } catch (err) {
    console.error("❌ Delete error:", err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
