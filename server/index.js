require('dotenv').config()
const express = require('express') 
const cors = require('cors')
const morgan = require('morgan') 
const app = express()
const restaurantRoutes = require('./routes/routes')

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

app.use('/api/restaurants', restaurantRoutes)

const port = process.env.PORT || 3005
app.listen(port, () => {
    console.log(`app is running on port ${port}`)
})