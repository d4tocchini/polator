penner = require './penner'
bound = require './bound'

module.exports = (i, i1, i2, o1, o2, pennerName='linear', boundName='extend') ->
  boundMethod = bound[boundName]
  pennerMethod = penner[pennerName]
  if !boundMethod
    throw new Error "Polator: bound method #{boundName} not found"
  if !pennerMethod
    throw new Error "Polator: penner method #{pennerName} not found"
  boundMethod i, i1, i2, o1, o2, pennerMethod