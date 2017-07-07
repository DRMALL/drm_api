
// var mongoose = require('mongoose')



class App {
  static async Index (ctx) {
    ctx.body = 'app is coming'
  }

  static async session (ctx) {
    const { name, password } = ctx.request.body
    // ctx.body = 
  }


}

export default App