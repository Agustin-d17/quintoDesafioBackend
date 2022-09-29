const express = require('express');
const hbs = require('express-handlebars')
const router = require('./modules/expressRoutes')


const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('hbs', hbs.engine({
    extname: '.hbs',
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'layout.hbs'
}));

app.set('views', './views')
app.set('view engine', 'hbs')

const PORT = process.env.PORT || 3002

app.get('/', (req, res) => {
    res.render('index')
})
app.use("/productos", router)

app.listen(PORT, () => {
    console. log(`listening on port ${PORT}`)
})