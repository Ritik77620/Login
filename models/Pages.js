const mongoose = require('mongoose')

const PageSchema = mongoose.Schema({
    html:String,
    css:String
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('PageModel', PageSchema)