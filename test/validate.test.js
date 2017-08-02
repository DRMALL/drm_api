
const chai = require('chai')
const {
  isEmail,
  isPhone,
  ifLackPara
} = require('../utils/Validate')
const expect = chai.expect

describe('validate isPhone tests', () => {
  it('the input is a string should no affcts', () => {
    expect(isPhone('13456784321')).to.be.true
  })
  it('the number is less than 11 should be false', () => {
    expect(isPhone('1234567890')).to.be.false
  })
  it('the number is greater than 11 should be false', () => {
    expect(isPhone('123456789011')).to.be.false
  })
  it('the none meaning number should be false', () => {
    expect(isPhone(10054321234)).to.be.false
  })
  it('the normal number should be true', () => {
    expect(isPhone(13535758345)).to.be.true    
  })
  it('the input is empty', () => {
    expect(isPhone()).to.be.false
  })
})

describe('validate isEmail tests', () => {
  it('the normal format should be success', () => {
    expect(isEmail('hhss33@dd.com')).to.be.true
  })
  it('with .com or .cn should be true', () => {
    expect(isEmail('nidasfas@dd.cn')).to.be.true
    expect(isEmail('nidasfas@dd.com')).to.be.true
  })
  it('without @ should be false', () => {
    expect(isEmail('@nidasfasdd.com')).to.be.false
  })
  it('the input is empty', () => {
    expect(isEmail()).to.be.false
  })
})

describe('validate ifLackPara tests', () => {
  it('the input is empty', () => {
    expect(ifLackPara()).to.be.an('error');

  })
})


