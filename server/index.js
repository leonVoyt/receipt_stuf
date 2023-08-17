require('dotenv').config()
const express = require('express')
const models = require('./models/models')
const cors = require('cors')

const router = require('./routes/mainRoute')
const sequelize = require('./db')
const errorHandler = require('./midlware/ErrorHandlerMidleware')

const PORT = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Working!' })
})
app.use(errorHandler)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () =>
      console.log(`Server started on : http://localhost:${PORT}`)
    )
  } catch (error) {
    console.log(error)
  }
}
start()
// { force: true }
