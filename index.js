// Importeer express uit de node_modules map
import express from 'express'

const baseURL = 'https://api.vervoerregio-amsterdam.fdnd.nl/api/v1'
const principes = 'https://api.vervoerregio-amsterdam.fdnd.nl/api/v1/principes'
const partnerSlug = '/websites'
const postSlug = '/urls'

const partner_data = await fetch(baseURL + partnerSlug). then((response) => response.json())
const principe_data = await fetch(principes). then((response) => response.json())

// Maak een nieuwe express app aan
const app = express()

// Stel ejs in als template engine en geef de 'views' map door
app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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
  res.render('toolboard', {principe_data, active: '/toolboard'})
  console.log(principe_data);
})

app.get('/urltoevoegen', function (req, res) {
  res.render('urltoevoegen', {partner_data, active: '/urltoevoegen'})
})

app.post('/urltoevoegen', function(req, res) {
  const formURL = baseURL + postSlug
  postJson(formURL, req.body).then((data) => {
    let newURL = { ... req.body }
    console.log(JSON.stringify(data))
    if (data.data) {
      res.redirect('/projectboard') 
    } else {
      const errormessage = `${req.body.url}: URL bestaat al.`
      const newdata = { error: errormessage, values: newURL }
      
      res.render('urltoevoegen', {newdata, partner_data, active: '/urltoevoegen' })
    }
  })
})

// Stel het poortnummer in waar express op gaat luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal het ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})

async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error)
}

/**
 * postJson() is a wrapper for the experimental node fetch api. It fetches the url
 * passed as a parameter using the POST method and the value from the body paramater
 * as a payload. It returns the response body parsed through json.
 * @param {*} url the api endpoint to address
 * @param {*} body the payload to send along
 * @returns the json response from the api endpoint
 */

async function postJson(url, body) {
  return await fetch(url, {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .catch((error) => error)
}