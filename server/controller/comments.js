const createError = require("../error");
const Comments = require("../models/Comments");
const Viedos = require("../models/Viedos");

const addComment = async (req, res, next) => {
    const newComment = new Comments({
        userId: req.user.id,
        ...req.body
       })
    try {
        const saveComment = await newComment.save();
        res.status(200).json(saveComment)
    } catch (error) {
        next(error);
    }
} 


const getComment = async (req, res, next) => {
    try {
        const comments = await Comments.find({ videoId: req.params.videoId });
        // console.log(req.params.id);
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
}


const deleteComment = async (req, res, next) => {
    try {
       const comment = await Comments.findById(req.params.id);
       const video = await Viedos.findById(req.params.id);
    //    if(!comment) return next(createError(404, "Comment not found"));

       if(req.params.id === comment.userId || req.params.id === video.userId) {
         await Comments.findByIdAndDelete(req.params.id);
         res.status(200).json("Comment is successfully deleted");
       }else {
         return next(createError(403, "You can delete only you comment"))
       }

    } catch (error) {
        next(error);
    }
}


module.exports =  { addComment, getComment, deleteComment }