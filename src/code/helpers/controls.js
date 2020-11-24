import { emitEvent, registerEvents } from './events'
import { addHtmlFunc } from './bfunctions'
import { randName } from './utils'

export const effectPcText = (text, onEvent, thenEvent, delay = 35) => {
  const elId = randName("effectPcText");
  let el, int;
  registerEvents(
    onEvent,
    () => typeof text == 'function' && (text = text()),
    () => el = document.getElementById(elId),
    () => {if(!el) throw 'daje'},
    () => int = setInterval(() => {
      if(!el) {
        clearInterval(int)
        int = undefined;
        return;
      }
      const cLength = (el.innerHTML || '').length;
      if (cLength >= text.length) {
        clearInterval(int)
        int = undefined;
        thenEvent && (emitEvent(thenEvent))
      } else {
        el.innerHTML += text[cLength];
      }
    }, delay)
  )
  return `<span id="${elId}" class="text-center"></span>`;
}

export const effectNumberInput = (label, thenEvent, ...args) => {
  return `
    <div class="d-flex bd-highlight">
      <div class="p-2 mt-2">${label}:</div>
      <div class="p-2 mr-1 flex-grow-1">
        <input id="elUserWeight" type="number" class="w-100" onkeyup="${addHtmlFunc(event => {
          const { keyCode } = event;

          if (keyCode === 13) {
            event.preventDefault();
            emitEvent(thenEvent, ...args.map(arg => typeof arg === 'function' ? arg(event) : arg))
          } else {
            args
            .filter(arg => typeof arg == 'function')
            .forEach(arg => arg(event))
          }
        })}" />
      </div>
    </div>
  `;
}

export const htmlFactoryBtn = ({ onClick, label }) => {
  return `
    <div class="d-flex bd-highlight">
      <div class="p-2 flex-grow-1">
        <div class="start-btn w-100" onclick="${addHtmlFunc(onClick)}">${label}</div>
      </div>
    </div>
  `;
}