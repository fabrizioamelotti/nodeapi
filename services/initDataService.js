const User = require('../models/user')
const Article = require('../models/article')

class InitDataService {
  async initData () {
    console.log('START - Init data')

    this.createUsers()
    this.createArticles()

    console.log('END - Init data')
  }

  async createUsers () {
    console.log('Create Users')
    const data = require('../json/users')
    for (const userData of data.users) {
      let user = User.findOne({ name: userData.name }).exec()
      if (user == null) {
        user = await User.create(userData)
        console.log(`User created: ${user}`)
      }
    }
  }

  async createArticles () {
    console.log('Create Articles')
    const data = require('../json/articles')
    for (const articleData of data.articles) {
      const user = await User.findOne({ name: articleData.owner }).select({ _id: true }).exec()
      if (user == null) {
        console.error("User doesn't exist")
      } else {
        articleData.userId = user._id
        delete articleData.owner

        const article = await Article.create(articleData)
        console.log(`Article created: ${article}`)
      }
    }
  }
}

module.exports = new InitDataService()
