const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const config = require('config')
const mongoose = require('mongoose')

const production = process.env.NODE_ENV == "production"

PRODUCTION_PORT = (production) ? 80 : 5000

const PORT = config.get('port') || PRODUCTION_PORT

if (production) {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    
    app.get('/', (req, res) => {

        res.sendFile(path.resolve(__dirname, 'client', 'build'))
    })

    app.get('*', (req, res) => {
        res.redirect('/')
    })
}
 

const start = async () => {

    try {

        await mongoose.connect( config.get('mongoUrl'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        
        http.listen(PORT, () => {
            console.log(`Server has been started on port ${ PORT }...`)
        })
        
    } catch (e) {
        console.log('Server error')
        console.warn(e)

        process.exit(1)
    }
}

start()


