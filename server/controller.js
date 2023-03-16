const mtg = require('mtgsdk')

module.exports = {
    getFilteredCards: (req,res) => {
        console.log(req.body)
        mtg.card.where(req.body)
        .then(result => {
            console.log(result)
            res.status(200).send(result)
        })
        .catch(err => console.log(err))
    }
}