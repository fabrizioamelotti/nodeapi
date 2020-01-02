const mongoose = require('mongoose')

class Database {
  constructor () {
    // https://mongoosejs.com/docs/deprecations.html
    mongoose.set('useNewUrlParser', true)
    mongoose.set('useFindAndModify', false)
    mongoose.set('useCreateIndex', true)
    mongoose.set('useUnifiedTopology', true)
  }

  async connect () {
    try {
      await mongoose.connect(`mongodb+srv://${process.env.SERVER}/${process.env.DATA_BASE}`)
      console.info('Database connection successful')
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = new Database()
