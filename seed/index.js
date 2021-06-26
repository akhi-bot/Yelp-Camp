const mongoose = require('mongoose')
const cities = require('./cities')
const {descriptors, places} = require('./seedHelpers')
const Campground = require('../models/campground')
mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database Connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)]
const seedDb = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++ ) {
        const rand1000 = Math.floor(Math.random() * 1000 + 1)
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // Your user Id
            author: "60c9d22d02402a34f87ca249",
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry : { 
                type : "Point", 
                coordinates : [ cities[rand1000].longitude, cities[rand1000].latitude ] 
            },
            images : [ 
                { 
                    url : "https://res.cloudinary.com/dtbbnohuz/image/upload/v1624169489/Yelp-Camp/zfmcvf5f1q3dv7x00mpl.jpg",
                    filename : "Yelp-Camp/zfmcvf5f1q3dv7x00mpl"
                },
                {
                    url : "https://res.cloudinary.com/dtbbnohuz/image/upload/v1624169492/Yelp-Camp/emq7w6qen9r8gkjfkdnt.jpg",
                    filename : "Yelp-Camp/emq7w6qen9r8gkjfkdnt"
                }
            ],
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati blanditiis nobis totam repudiandae soluta excepturi consequuntur consectetur libero deleniti, sint voluptatem expedita provident nisi voluptate est perferendis corrupti autem cum.`,
            price
        })
        await camp.save()
    }
}
seedDb().then(() => {
    mongoose.connection.close()
})
