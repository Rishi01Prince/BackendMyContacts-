const mongoose = require('mongoose')
const mongoURI = "mongodb+srv://rishi01raj:990538@rishicontacts.cg4w5gz.mongodb.net/MyContact?retryWrites=true&w=majority"
console.log("Hello we are connected");


const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {

        if (err) console.log("---" + err)

        else {
            console.log("Connected to MongoDB");
        }
    });
};

module.exports = mongoDB();
