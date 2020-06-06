const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');
require('dotenv').config();

const db = process.env.MONGO_DATABASE;
// mongoose.Promise = global.Promise;
mongoose.connect(db, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false})
.then(()=>{
  console.log('Connected to DB');
})
.catch((err)=>{
  console.log(`there is a problem with: ${err.message}`);
  process.exit(-1)
})


router.get('/videos', (req, res) => {
  Video.find()
  .then(videos => res.json(videos))
  .catch(err => console.log(err))
})

router.get('/videos/:id', (req, res) => {
  Video.findById(req.params.id)
  .then(video => res.json(video))
  .catch(err => console.log(err))
})

router.post('/videos', (req, res)=> {
  let videoData = req.body;
  const video = new Video(videoData);
  video.save()
  .then(insertedVideo => res.json(insertedVideo))
  .catch(err => res.json({message: err}))

})

router.put('/videos/:id', async (req, res) => {

  try {
    const updatedVideo = await Video.updateOne(
      {_id: req.params.id}, 
      {$set: {
        title: req.body.title,
        url: req.body.url,
        description: req.body.description
      }})
      res.json(updatedVideo)
  } catch (err) {
    res.json({message: err})
  }

})

router.delete('/videos/:id', (req, res) => {
  // Video.remove({_id: req.params.id})
  Video.findByIdAndRemove(req.params.id)
  .then(deletedVideo => res.json(deletedVideo))
  .catch(err => res.json({message: err}))
})

module.exports = router;