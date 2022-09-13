const createError = require('../error');
const User = require('../models/User');
const Video = require('../models/Viedos')

const addVideo = async (req, res, next) => {

   const newVideo = new Video({ userId: req.user.id, ...req.body })
   try {
     const savedVideo = await newVideo.save();
     res.status(200).json(savedVideo);

   } catch (error) {
      next(error)
   }

} 


const updateVideo = async (req, res, next) => {

   try {
      const video = await Video.findById(req.params.id);
      if(!video) return next(createError(404, "Video Not Found"));

      if(req.params.id === video.userId) {
         const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
            $set: req.body
         }, { 
             new: true
            }
         );
         res.status(200).json(updatedVideo)
      } else {
         return next(createError(403, "You can update only your video"))
      }
   } catch (error) {
       next(error)
   } 

} 


const deleteVideo = async (req, res, next) => {
   try {
      const video = await Video.findById(req.params.id);
      if(!video) return next(createError(404, "Video Not Found"));

      if(req.params.id === video.userId) {
         await Video.findByIdAndDelete(req.params.id);
         res.status(200).json("You has been successfully deleted")
      } else {
         return next(createError(403, "You can delete only your video"))
      }
   } catch (error) {
       next(error)
   } 
}


const getVideo = async (req, res, next) => {
   try {
      // const video = await User.findById(req.params.id);
      const video = await Video.findById(req.params.id);
      res.status(200).json(video);
   } catch (error) {
      next(error)
   }
} 


const addView = async (req, res, next) => {
   try {
      await Video.findByIdAndUpdate(req.param.id, {
         $inc: { views: 1 }
      })
      res.status(200).json("The view has been increased")
   } catch (error) {
      next(error);
   }
} 


const random = async (req, res, next) => {
   try {
     const videos = await Video.aggregate([{
      $sample: { size: 40 }
     }])
     res.status(200).json(videos)
   } catch (error) {
      next(error);
   }
} 


const trend = async (req, res, next) => {
   try {
      // for lastest videos
      const videos = await Video.find().sort({ views: -1 });
      res.status(200).json(videos)
    } catch (error) {
       next(error);
    }
} 


const sub = async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      const subscribeChannel = user.subScribedUsers;

      const list = await Promise.all( subscribeChannel.map( channelId => {
         return Video.find({ userId: channelId})
      }))

      // flat method return just one array for nested array
      res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt ));
    } catch (error) {
       next(error)
    }
} 


const getByTags = async (req, res, next) => {

   // console.log(req.query.tags);   in postman you can try /tags?tags=py,js,something
   const tags = req.query.tags.split(",");

   try {

      // The $in operator selects the documents where the value of a field equals any value in the specified array.
      const videos = await Video.find({ tags: { $in: tags }}).limit(20);
      res.status(200).json(videos);
    } catch (error) {
       next(error);
    }

} 


const search = async (req, res, next) => {
   const query = req.query.q
   console.log(query);
   try {
      // Provides regular expression capabilities for pattern matching strings in queries.
      const videos =await Video.find({
         title: { $regex: query, $options: "i" }
      }).limit(20);
      res.status(200).json(videos);
    } catch (error) {
       next(error);
    }
} 

module.exports =  { addVideo, updateVideo, deleteVideo, getVideo, addView, random, trend, sub, getByTags, search }