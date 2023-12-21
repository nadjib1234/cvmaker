// dbAdapter.js
/**
 * @interface
 */
function DBAdapter () {}

DBAdapter.prototype.getCVById = function (id) {
  throw new Error('Method not implemented')
}

DBAdapter.prototype.postCV = function (cvData) {
  throw new Error('Method not implemented')
}

module.exports = DBAdapter
