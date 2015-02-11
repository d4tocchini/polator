module.exports =
  
  extend: (i,i1,i2,o1,o2,penner) ->
    return penner i-i1, o1, o2-o1, i2-i1
  
  hold: (i,i1,i2,o1,o2,penner) ->
    t = i-i1
    if i >= i2
      return o2
    else if i <= i1
      return o1
    return penner t, o1, o2-o1, i2-i1
  
  repeat: (i,i1,i2,o1,o2,penner) ->
    t = i-i1
    d = i2-i1
    if t > d
      t = t % d
    else if t < 0
      t = d + (t % d)
    if t is 0
      return o1
    else if t is d
      return o2
    return penner t, o1, o2-o1, d
  
  silent: (i,i1,i2,o1,o2,penner) ->
    t = i-i1
    d = i2-i1
    if t is 0
      return o1
    else if t is d
      return o2
    else if i > i2
      return undefined
    else if i < i1
      return undefined
    return penner t, o1, o2-o1, d
    
  mirror: (i,i1,i2,o1,o2,penner) ->
    t = i-i1
    d = i2-i1
    if t < 0
      t = d + t
      
    if t is 0
      return o1
    else if t is d
      return o2
      
    phase = Math.round(t / d) % 2
    if phase is 0 # normal
      t = t % d
    else          # invert
      t = d - t % d
    return penner t, o1, o2-o1, d