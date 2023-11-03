const nodemailer = require('nodemailer')

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
            res.status(201).json({msg:'you should receive an email'})
        })
        .catch(() => {
            
        })

    res.status(201).json('Signup succes')
}
const getBill = (req, res) => {
    res.status(201).json('GetBill succes')
}

module.exports = {
    signup,
    getBill
}