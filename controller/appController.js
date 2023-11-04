const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')
const {EMAIL, PASSWORD} = require('../env')


const getOrder = (req, res) => {
    const {name, email, text} = req.body
    if (!name || !email) {
        return res.status(404).json({message: 'Wrong data'})
    }


    console.log(name, email, text)

    let config = {
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config)

    let MailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'New order',
            link: 'https://mailgen.js',
        }
    })

    let response = {
        body: {
            name: 'Dmytro',
            intro: 'New order',
            table: {
                data:[
                    {
                        name: name,
                        email: email,
                        description: text
                    }
                ]
            }

        }
    }
    let mail = MailGenerator.generate(response)

    let message =  {
        from: EMAIL,
        to: EMAIL,
        subject: 'Place order',
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            message: "Mail has been sending"
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })
    // res.status(201).json('GetBill succes')
}

module.exports = {
    getOrder
}