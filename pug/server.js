const express = require('express');
const router = require('./modules/expressRoutes')


const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('views', './views')
app.set('view engine', 'pug')

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.render('index')
})
app.use("/productos", router)

app.listen(PORT, () => {
    console. log(`listening on port ${PORT}`)
})