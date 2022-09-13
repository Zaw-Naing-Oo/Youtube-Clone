
const createError = require('../error');
const User = require('../models/User');
const Viedos = require('../models/Viedos');

const getUser = async ( req, res, next ) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    
  }
} 


const updateUser = async ( req, res, next ) => {

  // console.log(req.params.id);
  // console.log(req.user.id);
  // console.log(typeof(req.user.id));
  // console.log(typeof(req.user.id));
    if(req.params.id === req.user.id) {

      try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, {

            // The $set operator replaces the value of a field with the specified value.
            $set: req.body
        },
        { new: true }
        );
        res.status(200).json(updateUser);
      } catch (error) {
        next(error);
      } 

    } else {
        // console.log(req.body);
        return next(createError(404, "You can only update your account"));
    }
} 


const deleteUser = async ( req, res, next ) => {
  // console.log(req.params);
  // console.log(req.user);
  if(req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (error) {
      next(error);
    } 

  } else {
      return next(createError(404, "You can delete  only your account"));
  }
} 


const subscribe = async ( req, res, next ) => {
  try {

     // it is for login user
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subScribedUsers: req.params.id }
    })
     
    // it is for user who was subscribed by another user
    // The $inc operator increments and decrement a field by a specified value
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subScribers: 1 }
    })

    res.status(200).json("Subscribtion successful.")

  } catch (error) {
    
  }
}


const unSubscribe = async ( req, res, next ) => {
  try {

    await User.findByIdAndUpdate(req.user.id, {
      // The  $pull operator removes from an existing array all instances of a value or values that match a specified condition.
      $pull: { subScribedUsers: req.params.id }
    })
     
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subScribers: -1 }
    })

    res.status(200).json("Subscribtion successful.")
  } catch (error) {
    
  }
} 


const like = async ( req, res, next ) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Viedos.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id }
    })
    res.status(200).json("The video hass been like")
  } catch (error) {
    next(error)
  }
} 


const disLike = async ( req, res, next ) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Viedos.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id }
    })
    res.status(200).json("The video hass been like")
  } catch (error) {
    next(error)
  }
}


module.exports =  { getUser, updateUser, deleteUser, subscribe, unSubscribe, like, disLike }