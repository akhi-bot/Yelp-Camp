const ExpressError = require('./utils/ExpressError');
const {campgroundSchema, reviewSchema} = require('./schema');
const Campground = require('./models/campground');
const Review = require('./models/reviews');



module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in')
        return res.redirect('/login')
    }
    next()
}

module.exports.validateCampground = (req, res, next) => {
    const {error} = campgroundSchema.validate(req.body);        
    if(error) {
        const msg = error.details.map(el => el.message).join(',')   // error.details is an Array having object inside it,so convert this into 
        throw new ExpressError(msg, 400)                            // single string we used map method and .join if there is more than one object inside it
    } else {
        next()
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const {id} = req.params;
    const campground = await Campground.findById(id) 
    if(!campground.author.equals(req.user._id)) {
        req.flash('error', 'YOU DO NOT HAVE PERMISSION TO THAT')
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}
module.exports.isReviewAuthor = async (req, res, next) => {
    const {id, reviewId} = req.params;
    const review = await Review.findById(reviewId) 
    if(!review.author.equals(req.user._id)) {
        req.flash('error', 'YOU DO NOT HAVE PERMISSION TO THAT')
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}


module.exports.validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body);
    console.log(error)
    if(error) {
        const msg = error.details.map(el => el.message).join(',')
        console.log(msg)
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}