const express = require('express')
const { engine } = require('express-handlebars')

const app = express()

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main.hbs',
}))

app.set('view engine', 'hbs')
app.set('views', './views')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const products =[
    {name: "Vela aromática", category: "Deco&home", price: 200, img: "https://media.istockphoto.com/vectors/aromatic-candle-vector-sketch-drawn-illustration-in-engraving-style-vector-id1302457530?s=612x612"},
    {name: "Espejo circular", category: "Deco&home", price: 1500, img: "https://cdn1.iconfinder.com/data/icons/prettycons-furniture-and-households-vol-1-flat/58/60-Mirror-furniture_room_appliance_household-256.png"},
    {name: "Almohadones decorativos",category:"Deco&home", price: 1000, img: "https://cdn2.iconfinder.com/data/icons/interior-homedecor-vol-1-outline/512/chusions_chusion_pillow_fabric-256.png"},
    {name: "Lampara de escritorio", category: "Iluminacion", price: 2500, img: "https://cdn1.iconfinder.com/data/icons/interior-homedecor-vol-2/512/table_lamp_light_desk-256.png"}
]

app.get('/', (req, res) => {
    res.render('index', {products} )
})

app.get('/productos', (req, res) => {
    res.render('products', {
        products: products,
        listExist: false
    } )
})

app.post('/productos', (req, res) => {
    products.push(req.body)
    console.log(req.body, 'added to products')
    res.render('products.hbs', {products})
})


const server = app.listen(8080, () => { console.log( "Server listening..." ) })
server.on('error', e => { console.log( "Error on server", e ) })