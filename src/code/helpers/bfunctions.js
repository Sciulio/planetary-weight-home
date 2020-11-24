import { randName } from './utils'


const bindedFuncs = {};

window.execBindedFunc = (funcName, ...args) => bindedFuncs[funcName](...args);

export const addBindedFuncs = (func, funcName = randName()) => {
  if (bindedFuncs[funcName]) {
    throw 'Duplicated function';
  }
  bindedFuncs[funcName] = func;
}

export const addHtmlFunc = (func, funcName = randName()) => {
  addBindedFuncs(func, funcName)
  return `execBindedFunc('${funcName}', event)`;
}