export const repeat = (funcs) => (...args) => funcs
.reduce((accum, func) => ([
  ...accum,
  func(...args)
]), []);

export const repeatWithin = (funcs) => (...args) => funcs
.reduce((accum, func, id) => id ? func(accum) : func(...accum), args);

export const entries = (...funcs) => objOrList => (
  Array.isArray(objOrList) ?
    objOrList.map(repeatWithin(funcs.reverse())) :
    Object.entries(objOrList).map(repeatWithin(funcs.reverse()))
).join('')