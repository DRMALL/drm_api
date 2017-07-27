/**
解耦
*/
const nodeExcel = require('excel-export')
const cols = [{
  caption: 'name',
  type: 'string'
}, {
  caption: 'date',
  type: 'date'
}, {
  caption: 'date',
  type: 'date'  
}]

class NodeExcel {

  constructor(conf) {
    this.conf = conf
  }

  static initConf() {
    this.conf = {}
    this.conf.stylesXmlFile = 'styles.xml'
    this.conf.name = 'mysheet'
  }

  transforExcel(sourceArr) {
    const inArr = []

    arr.map((obj, index) => {
      inArr.length = 0
      Object.keys(obj).map((key, index) => {
        inArr.push(obj[key])
      })
      this.array.push(inArr)
    })
  }

}