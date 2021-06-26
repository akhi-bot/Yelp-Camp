const Campground = require('../models/campground');
const Review = require('../models/reviews');

module.exports.createReview = async (req, res, next) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review)
    review.author = req.user._id
    campground.review.push(review)
    await campground.save()
    await review.save()
    req.flash('success', 'Create a new review')
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteReview =  async (req, res, next) => {
    const {id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: {review: reviewId}})
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', 'Successfully Deleted Campground')
    res.redirect(`/campgrounds/${id}`)
}