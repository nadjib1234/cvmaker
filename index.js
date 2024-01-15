const express = require('express')
const app = express()
const db = require('./dbadapters/models')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ strict: false, limit: '15mb' }))
app.use(cors())

const sequelizeAdapter = require('./dbadapters/SequilizeAdapter')

app.use(function (req, res, next) {
  req.headers['content-type'] = 'application/json'
  next()
})

const CreateCVUseCaseO= require('./Usecases/createcv')
const GetCVUseCaseO = require('./Usecases/getcv')
const CreateCVControllerO = require('./Controllers/createcv.controller')
const GetCVControllerO = require('./Controllers/getcv.controller')
const CVEntity = require('./Entities/Cv')

const CreateCVUseCase = new CreateCVUseCaseO(new sequelizeAdapter());

const GetCVUseCase = new GetCVUseCaseO(new sequelizeAdapter());

const CreateCVController = new CreateCVControllerO(CreateCVUseCase, CVEntity)
const GetCVController = new GetCVControllerO(GetCVUseCase, CVEntity)

const createCVRouteMiddleware = async (req, res) => {
  await CreateCVController.createCV(req, res)
}

app.post('/createcv', bodyParser.json(), createCVRouteMiddleware)
const getCVRouteMiddleware = async (req, res) => {
  await GetCVController.getCV(req, res)
}

app.get('/getcv/:id', bodyParser.json(), getCVRouteMiddleware)

db.sequelize.sync().then(() => {
  const PORT = process.env.PORT || 8323
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
  })
})
module.exports = app // Ensure that you are exporting the app instance