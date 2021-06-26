const mongoose = require('mongoose');
const Review = require('./reviews')
const Schema = mongoose.Schema;

const ImageSchema = new Schema(
    {
        url : String,
        filename: String
    }
);

ImageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_150,c_scale,h_150')
})

const opts = { toJSON: { virtuals: true } };
const CampgroundSchema = new Schema({
    title: String,
    price: Number,
    images: [ImageSchema], 
    geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },
    description: String,
    location: String,
    author:  {
         type: Schema.Types.ObjectId,
          ref: 'User'  
        },
    review: [
        {type: Schema.Types.ObjectId,
         ref: 'Review'
        }
    ]
}, opts);

CampgroundSchema.virtual('properties.popUpMarkup').get(function() {
    return `<strong><a href = "/campgrounds/${this._id}">${this.title}</a></strong>
            <p>${this.description.substring(0, 30)}</p>`
})

CampgroundSchema.post('findOneAndDelete', async function(doc) {
    if(doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.review
            }
        })
    }
})

const Campground = mongoose.model('Campground', CampgroundSchema);
module.exports = Campground;
