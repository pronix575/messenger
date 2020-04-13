const express = require('express')
const app = express()

const path = require('path')
const http = require('http').createServer(app)
const config = require('config')
const mongoose = require('mongoose')

//production
const production = process.env.NODE_ENV == "production"
PRODUCTION_PORT = (production) ? 80 : 5000
const PORT = config.get('port') || PRODUCTION_PORT

//static
app.use(express.static('files'));
app.use(express.json({ extended: true }))

//api
app.use('/api/auth', require('./src/routes/auth.routes'))
app.use('/api/upload', require('./src/routes/staticFiles.routes'))
app.use('/api/users', require('./src/routes/users.routes'))


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


