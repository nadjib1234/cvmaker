const express = require('express')
const app = express()
const db = require('./models')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ strict: false, limit: '15mb' }))
app.use(cors())

const sequelizeAdapter = require('./dbadapters/sequilzeadanter')

app.use(function (req, res, next) {
  req.headers['content-type'] = 'application/json'
  next()
})

const CreateCVUseCase = require('./usecases/createcv')
const GetCVUseCase = require('./usecases/getcv')
const CreateCVController = require('./controllers/createcv.controller')
const GetCVController = require('./controllers/getcv.controller')
const CVEntity = require('./entities/Cv')

const createCVUseCase = new CreateCVUseCase(new sequelizeAdapter())

const getCVUseCase = new GetCVUseCase(new sequelizeAdapter())

const createCVController = new CreateCVController(createCVUseCase, CVEntity)
const getCVController = new GetCVController(getCVUseCase, CVEntity)

const createCVRouteMiddleware = async (req, res) => {
  await createCVController.createCV(req, res)
}

app.post('/createcv', bodyParser.json(), createCVRouteMiddleware)
const getCVRouteMiddleware = async (req, res) => {
  await getCVController.getCV(req, res)
}

app.get('/getcv/:id', bodyParser.json(), getCVRouteMiddleware)

db.sequelize.sync().then(() => {
  const PORT = process.env.PORT || 8323
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
  })
})
module.exports = app // Ensure that you are exporting the app instance
