

const express = require('express')
const app = express()
const appRout = require('./routes/route.js')

const PORT = 5000

app.use(express.json())

//CORS
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['https://portfolio-dmytro-doronin.vercel.app']); //http://localhost:5173
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


// routes
app.use('/api', appRout)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
