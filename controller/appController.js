const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')
const {EMAIL, PASSWORD} = require('../env')

const signup = async (req, res) => {

    let testAccount = await nodemailer.createTestAccount()
    const transporter = nodemailer.createTransport({
        host: "smtp.forwardemail.net",
        port: 465,
        secure: true,
        auth: {
            user: testAccount.user,
            pass: testAccount.password,
        },
    });

    let message ={
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    }

    transporter.sendMail(message)
        .then(() => {
            res.status(201).json({message:'you should receive an email'})
        })
        .catch(() => {
            res.status(500).json({error:'you should receive an email'})
        })

    // res.status(201).json('Signup succes')
}


const getOrder = (req, res) => {

    const {name, email, text} = req.body

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

    transporter.sendMail(message)
        .then(() => {
            return res.status(201).json({
                message: 'Mail has been sending'
            })
        .catch((err) => {
            return res.status(500).json({err})
        })
    })
    // res.status(201).json('GetBill succes')
}

module.exports = {
    signup,
    getOrder
}