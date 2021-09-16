const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'hellomoviehunter@gmail.com',
        pass: 'moviehunterapp'
    }
})

module.exports = transporter