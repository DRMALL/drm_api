const TableStore = require('tablestore')
  , client = new TableStore.Client({
    accessKeyId: process.env.TABLEKEYID,
    secretAccessKey: process.env.TABLEKEYSECRET,
    endpoint: process.env.TABLEENDPOINT,
    instancename: process.env.INSTANCE,
  })

class OTStable {
  constructor() {
    this.client = client
  }

  createTable(obj) {
    var newtable = new Promise((resolve, reject)=> {
      var params = {
        tableMeta: {
          tableName: obj.tableName,
          primaryKey: obj.primaryKey,
        },
        reservedThroughput: {
          capacityUnit: {
            read: 0,
            write: 0,
          }
        },
        tableOptions: {
          timeToLive: -1,
          maxVersions: obj.maxVersions,
        }
      }
      this.client.createTable(params, (err, data)=> {
        if(err) return reject({TableStoreError: err})
        resolve(data)
      })
    })
    return newtable
  }

  describeTable(tableName) {
    var oldtable = new Promise((resolve, reject)=> {
      var params = {
        tableName: tableName
      }
      this.client.describeTable(params, (err, data)=> {
        if(err) return reject({TableStoreError: err})
        resolve(data)
      })
    })
    return oldtable
  }

  putRow(obj) {
    var putrow = new Promise((resolve, reject)=> {
      var params = {
        tableName: obj.tableName,
        condition: new TableStore.Condition(TableStore.RowExistenceExpectation.IGNORE, null),
        primaryKey: obj.primaryKey,
        attributeColumns: obj.attributeColumns,
        returnContent: { returnType: TableStore.ReturnType.Primarykey }
      }
      this.client.putRow(params, (err, data)=> {
        if(err) return reject({TableStoreError: err})
        resolve(data)
      })
    })
    return putrow
  }

  updateRow(obj) {
    var updaterow = new Promise((resolve, reject)=> {
      var params = {
        tableName: obj.tableName,
        condition: new TableStore.Condition(TableStore.RowExistenceExpectation.IGNORE, null),
        primaryKey: obj.primaryKey,
        updateOfAttributeColumns: [
          { 'PUT': obj.updateColumns },
        ]
      }
      this.client.updateRow(params, (err, data)=> {
        if(err) return reject({TableStoreError: err})
        resolve(data)
      })
    })
    return updaterow
  }

  getRow(obj) {
    var getrow = new Promise((resolve, reject)=> {
      var params = {
        tableName: obj.tableName,
        primaryKey: obj.primaryKey,
        maxVersions: obj.maxVersions,
      }
      // var condition = new TableStore.CompositeCondition(TableStore.LogicalOperator.AND)
      // condition.addSubCondition(new TableStore.SingleColumnCondition('ent_air_pressure_pv', 1783, TableStore.ComparatorType.EQUAL))
      // condition.addSubCondition(new TableStore.SingleColumnCondition('ent_air_pressure_sv', 1841, TableStore.ComparatorType.EQUAL))
      // params.columnFilter = condition
      this.client.getRow(params, (err, data)=> {
        if(err) return reject({TableStoreError: err})
        resolve(data.row)
      })
    })
    return getrow
  }

}

module.exports = OTStable