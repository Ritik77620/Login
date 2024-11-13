const User = require('../models/User');

const router = require('express').Router()

router.get('/verify', async (req, res) => {

    try {

        const { id } = req.query
        const user = await User.findOne({ _id: id })
        if (user) {

            const updateInfo = await User.updateOne({ _id: id }, { $set: { isVerified: true } })
            if (updateInfo) {
                res.render("verified")
            }
        }

    } catch (error) {
        console.log(error)
    }
})

module.exports = router