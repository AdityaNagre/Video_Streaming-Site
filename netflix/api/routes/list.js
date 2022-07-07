const express= require('express')
const router= express.Router()
const List= require('../models/List')
const verify  = require('../middlewares/verifyToken');

//CREATE
router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newList= new List(req.body)
      try {
        const list=await newList.save()
        res.status(200).json(list)
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
        const list=await List.findByIdAndDelete(req.params.id)
        res.status(200).json("Deleted Successfully")
      } catch (error) {
        res.status(500).json({error: error.message})
      }
    } else {
      res.status(403).json("Not Allowed");
    }
  });

//GET
router.get("/", async (req, res) => {
    const typeQuery= req.query.type
    const genreQuery= req.query.genre
    let list=[]
    try {
      if(typeQuery){
        if(genreQuery){
        list= await List.aggregate([
          { $sample: {size:10} },
          { $match: {type:typeQuery, genre: genreQuery}}
        ])
        }
        else{
          list= await List.aggregate([
            {$sample: {size:10}},
            {$match: {type:typeQuery}}
          ])
        }
      }
      else{
        list= await List.aggregate([{$sample: {size:10}}])
      }
      res.status(200).json(list)
    } catch (error) {
      res.status(500).json({error: error.message})
    }
  });

//GET ALL
router.get("/all", verify, async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const lists=await List.find()
        res.status(200).json(lists.reverse())
      } catch (error) {
        res.status(500).json({error: error.message})
      }
    } else {
      res.status(403).json("Not Allowed");
    }
  });


 
module.exports = router
