const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let smtp_login = process.env.SMTP_LOGIN || '-----'
let smtp_password = process.env.SMTP_PASSWORD || '-----'


let transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 25,
    secure: false,
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: smtp_login,
        pass: smtp_password
    }
})

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.post('/sendMessage', async function (req, res) {
    let {name, email, message} = req.body

    let info = await transporter.sendMail({
        from: 'Message from my portfolio contact form',
        to: 'ekaterina.yurchyk.s@gmail.com',
        subject: 'Message from my portfolio contact form',
        //text: '',
        html: `<b>Привет. Тебе письмо</b>
<div>
${name}
</div>\`
<div>
${email}
</div>\`
<div>
${message}
</div>`
    })
    res.send('ok!')
})

let port = process.env.PORT || 3010

app.listen(port, function () {
    console.log('Example app listening on port 3000!')
})



