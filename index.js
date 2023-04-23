// Importeer express uit de node_modules map
import express from 'express'

const baseURL = 'https://api.vervoerregio-amsterdam.fdnd.nl/api/v1'
const partnerSlug = '/websites'

const partner_data = await fetch(baseURL + partnerSlug). then((response) => response.json())


// Maak een nieuwe express app aan
const app = express()

// Stel ejs in als template engine en geef de 'views' map door
app.set('view engine', 'ejs')
app.set('views', './views')

// Gebruik de map 'public' voor statische resources
app.use(express.static('public'))

// Maak een route voor de index
app.get('/', function (req, res) {
  res.render('index', {active: '/'})
})

app.get('/projectboard', function (req, res) {
  res.render('projectboard', { partner_data, active: '/projectboard'})
})

app.get('/toolboard', function (req, res) {
  res.render('toolboard', {active: '/toolboard'})
})

app.get('/urltoevoegen', function (req, res) {
  res.render('urltoevoegen', {active: '/urltoevoegen'})
})

// Stel het poortnummer in waar express op gaat luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal het ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})