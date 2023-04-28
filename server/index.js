import express from 'express'
import bodyParser from 'body-parser'
import connection from './model/db.js'
import cors from 'cors'

import product from './routes/product.js'
import user from './routes/user.js'

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res)=> {
    res.send('hello')
})


app.use('/api/products', product)
app.use('/api/user', user)

app.listen(3000, () => {
    console.log('server is running at port 3000')
    connection.connect((err) => {
        if (err) {
            throw err
        }
        console.log("MySQL Connected!")
    })
})