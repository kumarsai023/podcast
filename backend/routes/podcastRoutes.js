const express = require('express');
const Podcast = require('../models/Podcast');

const router = express.Router();


router.post('/upload', (req, res) => {
  const { title, description, genre, image} = req.body;

  if (!title || !description || !genre || !image) {
      return res.status(400).json({ message: 'All fields are required.' });
  }

  const newPodcast = new Podcast({
      title,
      description,
      genre,
      image, 
  });

  newPodcast.save()
  .then((podcast) => {
      res.status(201).json({ message: 'Podcast uploaded successfully!', podcast });
  })
  .catch((err) => {
      res.status(500).json({ message: 'Error uploading podcast', error: err });
  });
});


// Get all podcasts
router.get('/', async (req, res) => {
  try {
    const podcasts = await Podcast.find();
    res.json(podcasts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get podcasts by genre
router.get('/genre/:genre', async (req, res) => {
  const podcasts = await Podcast.find({ genre: req.params.genre });
  res.json(podcasts);
});

module.exports = router;

//get single podcast by name
router.get('/:id', (req, res) => {
  const podcastId = req.params.id;

  Podcast.findById(podcastId)
  .then((podcast) => {
      if (!podcast) {
          return res.status(404).json({ message: "Podcast not found" });
      }
      res.json(podcast);
  })
  .catch((err) => {
      res.status(500).json({ message: "Error fetching podcast", error: err });
  });
});





// const express = require('express');
// const Podcast = require('../models/Podcast');
// const multer = require('multer');
// const path = require('path');

// const router = express.Router();

// // Configure storage for multer
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'assets/'); // Set the upload destination to your assets folder
//     },
//     filename: function (req, file, cb) {
//         const podcastTitle = req.body.title.replace(/\s+/g, '-').toLowerCase(); // Create a slug from the title
//         const ext = path.extname(file.originalname); // Get the file extension
//         cb(null, `${podcastTitle}${ext}`); // Save the file with the podcast title
//     }
// });

// const upload = multer({ storage: storage });

// // Handle podcast upload
// router.post('/upload', upload.single('audio'), (req, res) => {
//     const { title, description, genre, image } = req.body;

//     if (!title || !description || !genre || !image || !req.file) {
//         return res.status(400).json({ message: 'All fields are required, including the audio file.' });
//     }

//     const newPodcast = new Podcast({
//         title,
//         description,
//         genre,
//         image,
//         audioPath: req.file.path // Store the audio file path
//     });

//     newPodcast.save()
//         .then((podcast) => {
//             res.status(201).json({ message: 'Podcast uploaded successfully!', podcast });
//         })
//         .catch((err) => {
//             res.status(500).json({ message: 'Error uploading podcast', error: err });
//         });
// });

// // Get all podcasts
// router.get('/', async (req, res) => {
//     try {
//         const podcasts = await Podcast.find();
//         res.json(podcasts);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // Get podcasts by genre
// router.get('/genre/:genre', async (req, res) => {
//     const podcasts = await Podcast.find({ genre: req.params.genre });
//     res.json(podcasts);
// });

// // Get single podcast by name
// router.get('/:id', (req, res) => {
//     const podcastId = req.params.id;

//     Podcast.findById(podcastId)
//         .then((podcast) => {
//             if (!podcast) {
//                 return res.status(404).json({ message: "Podcast not found" });
//             }
//             res.json(podcast);
//         })
//         .catch((err) => {
//             res.status(500).json({ message: "Error fetching podcast", error: err });
//         });
// });

// module.exports = router;
