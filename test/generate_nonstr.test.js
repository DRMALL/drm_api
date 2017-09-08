
const generate_nonstr = require('../reset/generate_nonstr')
const assert = require('assert')

// const chai = require('chai')
// const expect = chai.expect

describe('generate_nonstr test', () => {

  for(let num =1; num < 10; num++) {
    it(`when num is Number ${num} should be return ${num} length`, () => {
      assert.equal(generate_nonstr(num).length, num)
    })
  }

  it('when num is string should be throw typeError', () => {
    assert.throws(() => generate_nonstr('str'), TypeError)
  })

  it('when there is no params should be throw Error', () => {
    assert.throws(() => generate_nonstr(), Error)
  })

})
