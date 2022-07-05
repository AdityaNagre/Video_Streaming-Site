const express= require('express')
const router= express.Router()
const Movie= require('../models/Movie')
const verify  = require('../middlewares/verifyToken');

//CREATE
router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newMovie= new Movie(req.body)
      try {
        const movie=await newMovie.save()
        res.status(200).json(movie)
      } catch (error) {
        res.status(500).json({error: error.message})
      }
    } else {
      res.status(403).json("Not Allowed");
    }
  });

//UPDATE
router.put("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const updatedMovie=await Movie.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updatedMovie)
      } catch (error) {
        res.status(500).json({error: error.message})
      }
    } else {
      res.status(403).json("Not Allowed");
    }
  });

//DELETE
router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const updatedMovie=await Movie.findByIdAndDelete(req.params.id)
        res.status(200).json("Movie is deleted")
      } catch (error) {
        res.status(500).json({error: error.message})
      }
    } else {
      res.status(403).json("Not Allowed");
    }
  });

//GET
router.get("/find/:id", async (req, res) => {
      try {
        const movie=await Movie.findById(req.params.id)
        res.status(200).json(movie)
      } catch (error) {
        res.status(500).json({error: error.message})
      }
    });

//GET RANDOM
router.get("/random", async (req, res) => {
    const type= req.query.type
    let movie;
      try {
        if(type==='series'){
            movie= await Movie.aggregate([
                { $match: {isSeries: true}},
                {$sample: {size: 1}}
            ]);
        }
        else{
            movie= await Movie.aggregate([
                { $match: {isSeries: false}},
                {$sample: {size: 1}}
            ]);
        }
        res.status(200).json(movie)
      } catch (error) {
        res.status(500).json({error: error.message})
      }
    });

//GET ALL
router.get("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const movies=await Movie.find()
        res.status(200).json(movies.reverse())
      } catch (error) {
        res.status(500).json({error: error.message})
      }
    } else {
      res.status(403).json("Not Allowed");
    }
  });
 
module.exports = router
