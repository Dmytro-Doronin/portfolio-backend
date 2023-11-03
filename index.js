

const express = require('express')
const app = express()
const appRout = require('./routes/route.js')

const PORT = 5000

app.use(express.json())

// routes
app.use('/api', appRout)

app.listen(PORT, () => {
    console.log('server is running')
})
