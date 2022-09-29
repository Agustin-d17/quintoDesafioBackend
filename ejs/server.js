const express = require('express');
const router = require('./modules/expressRoutes')


const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('views', './views/pages')
app.set('view engine', 'ejs')

const PORT = process.env.PORT || 3001

app.get('/', (req, res) => {
    res.render('index')
})
app.use("/productos", router)

app.listen(PORT, () => {
    console. log(`listening on port ${PORT}`)
})