if typeof require is 'function'
  polator = require '../lib/polator'
  chai = require 'chai'

{expect, assert} = chai

describe "Polator", ->
  it "existential", ->
    assert polator?, "polator exists"
  
  describe "defaults", ->
    it "linear, extend", ->
      expect(polator(   .5, 0,1, -100,100 )).to.equal 0
      expect(polator(    2, 0,1,    0,100 )).to.equal 200
      expect(polator( -100, 0,1,    0,100 )).to.equal -10000
  
  describe "linear", ->
    penner = "linear"
    it "extend", ->      
      bound = "extend"
      expect(polator(   .5, 0,1, -100,100, penner,bound )).to.equal 0
      expect(polator(    2, 0,1,    0,100, penner,bound )).to.equal 200
      expect(polator( -100, 0,1,    0,100, penner,bound )).to.equal -10000
    
    it "extend 2", ->      
      bound = "extend"
      expect(polator(   .5, -1,1, -100,100, penner,bound )).to.equal 50
      expect(polator(  -.5, -1,1, -100,100, penner,bound )).to.equal -50
      expect(polator(    2, -1,1,    0,100, penner,bound )).to.equal 150
      expect(polator(   -2, -1,1,    0,100, penner,bound )).to.equal -50
      
    it "hold", ->      
      bound = "hold"
      expect(polator(   .5, 0,1, -100,100, penner,bound )).to.equal 0
      expect(polator(    2, 0,1,    0,100, penner,bound )).to.equal 100
      expect(polator( -100, 0,1,    0,100, penner,bound )).to.equal 0

    it "repeat", ->      
      bound = "repeat"
      expect(polator(   .5, 0,1, -100,100, penner,bound )).to.equal 0
      expect(polator( 1.25, 0,1,    0,100, penner,bound )).to.equal 25
      expect(polator(   -1, 0,1,    0,100, penner,bound )).to.equal 100
      expect(polator(   -2, 0,1,    0,100, penner,bound )).to.equal 100
      expect(polator(   -3, 0,1,    0,100, penner,bound )).to.equal 100