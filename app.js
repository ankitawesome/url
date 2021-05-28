const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const port = process.end.PORT || 3000
const app = express()
app.use(express.urlencoded({extended:false}))
mongoose.connect('mongodb://localhost:27017/urlShortnerDb', {   
    useNewUrlParser: true, 
    useUnifiedTopology: true
}); 
app.set('view engine', 'ejs')

app.get('/', async (req, res) =>{
    const shortUrl = await ShortUrl.find()
    res.render('index', {shortUrl})
})
app.post('/shortUrls', async (req, res) =>{
    await ShortUrl.create({full: req.body.fullUrl})
    res.redirect('/')
})
app.get('/:shortUrl', async (req, res) =>{
    const shortUrl = await ShortUrl.findOne({short: req.params.shortUrl})
    if(shortUrl === null) return res.sendStatus(404)
    shortUrl.click++
    shortUrl.save()
    res.redirect(shortUrl.full)
})

app.listen(port, ()=>{
    console.log('listening on port 3000')
})