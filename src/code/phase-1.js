import { entries, repeat, repeatWithin } from './helpers/funcs'
import { registerEvents, emitEvent } from './helpers/events'
import { addHtmlFunc } from './helpers/bfunctions'
import { planets } from './planets'
import { effectPcText } from './helpers/controls'

const labels = {
  title: 'Qual\'è il tuo peso?',
  question: 'Su quale pianete vuoi avventurarti:'
}

const htmlFactoryCellContent = content => `<div class="col-sm-6 col-lg-6 col-xl-4">${content}</div>`
const htmlFactoryPlanetBtn = (planet) => {
  const { name } = planet;

  return `<div class="planet-${name} start-btn w-100 mt-sm-3 mb-sm-2" onclick="${addHtmlFunc(() => {
    emitEvent('phase-2.entering', { planet })
  })}">${name}</div>`;
}

export const className = "phase-1";

export function render({ userData }) {
  return `
    <div class="row">
      <div class="col-sm">
        <h1 class="text-center pt-4 pb-3">
          ${effectPcText(labels.question, 'phase-1.starting', 'phase-1.started')}
        </h1>
      </div>
    </div>
    <div id="phase-1.content" class="row hidden">
      <hr size/>
      ${entries(htmlFactoryCellContent, htmlFactoryPlanetBtn)(planets)}
    </div>
  `;
}

registerEvents('phase-2.entering', () => {
  /*const elEarth = document.querySelector('.earth');
  elEarth.classList.add('animate__fadeOutDownBig', 'animate__animated', 'animate__bounce', 'animate__delay-2s');
  elEarth.addEventListener('animationend', () => {
    elEarth.remove();
  }, { once: true });

  const clouds1 = document.querySelector('.clouds_1 > .cloud')
  Array(clouds1).forEach(cl => {
    cl.classList.add('animate__fadeOutDownBig');
    cl.addEventListener('animationend', () => {
      cl.remove();
    }, { once: true });
  });*/
});