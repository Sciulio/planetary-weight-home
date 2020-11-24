import "./assets/libs/bootstrap.min.css";
import "./styles/main.scss";

import imgPlanetEarth from './assets/images/planet_earth.png';
import imgCloud1 from './assets/images/cloud_1.png';
import imgCloud2 from './assets/images/cloud_2.png';

import { emitEvent, registerEvents } from './code/helpers/events'
import { entries, repeat, repeatWithin } from './code/helpers/funcs'
import { addBindedFuncs, addHtmlFunc } from './code/helpers/bfunctions'
import { planets } from './code/planets'
import * as phase1 from './code/phase-1'
import * as phase2 from './code/phase-2'
import * as phase3 from './code/phase-3'
import * as phase4 from './code/phase-4'


const phasesSet = {
  phase1,
  phase2,
  phase3,
  phase4
}

const dayPhaseNameFromId = id => "day-phase-" + id
const phaseNameFromId = (id, prefix = '') => prefix + "phase-" + id

const dayPhasesCount = 12;
const dayPhases = Array.from(Array(dayPhasesCount))
.map((_, id) => ++id)
.map(dayPhaseNameFromId);
//const dayPhases = ["day-phase-1"];

const phasesCount = 4;
const phases = Array.from(Array(phasesCount)).reduce((accum, _, id) => ({
  ...accum,
  [phaseNameFromId(id + 1)]: {}
}), {});

const dayPhaseId = new Date().getHours() < 13 ? 1 : 0;

const imgCloud = dayPhaseId < 1 ? imgCloud1 : imgCloud2;

const ctx = {
  userData: {
    planet: null,
    weight: 0,
    computeWeight: () => {
      const { planet: { factor }, weight } = ctx.userData;
      return (weight * factor).toFixed(2);
    }
  }
}

registerEvents('phase-2.entering', ({ planet }) => ctx.userData.planet = planet);
registerEvents('phase-3.entering', ({ weight }) => ctx.userData.weight = weight);
registerEvents('phase-2.entering', console.log.bind(console));
registerEvents('phase-3.entering', console.log.bind(console));

document.body.innerHTML = `
  <div class="back">
    ${entries(([key, value]) => `<div class="${key}"></div>`)(phases)}
  </div>
  <div class="infra">
    <div class="planets anim-bounce-infinite-a">
      <img class="earth animate__animated" src="${imgPlanetEarth}" />
    </div>
    <div class="clouds anim-bounce-infinite-c">
      <div class="clouds_1 anim-bounce-infinite-b">
        <img class="cloud anim-bounce-infinite-c cloud_1" src="${imgCloud}" />
        <img class="cloud anim-bounce-infinite-a cloud_2" src="${imgCloud}" />
        <img class="cloud anim-bounce-infinite-b cloud_3" src="${imgCloud}" />
      </div>
      <!--div class="clouds_2">
        <img class="cloud anim-bounce-infinite-c cloud_1" src="${imgCloud}" />
        <img class="cloud anim-bounce-infinite-a cloud_2" src="${imgCloud}" />
      </div>-->
    </div>
  </div>
  <div class="phases">
    ${entries(([key, { className, render }]) => `
      <div class="${className}">
        <div class="container">
          ${render(ctx)}
        </div>
      </div>
    `)(phasesSet)}
  </div>
`;

setTimeout(() => {
  emitEvent('phase-1.entering')
}, 0)

Object.entries(phases)
.forEach(([key, value], id) => {
  const idNext = id + 1;
  registerEvents('phase-' + idNext + '.entering', () => {
    document.body.classList.remove(phaseNameFromId(id));
    document.body.classList.add(phaseNameFromId(idNext));
    document.body.classList.add(phaseNameFromId(idNext, 'back-'));

    setTimeout(() => emitEvent('phase-' + idNext + '.starting'), 1000)
  })
  registerEvents('phase-' + idNext + '.starting', () => {
    document.body.classList.remove('invert-text-color');
    if (dayPhaseId != 0 && id >= 2) {
      document.body.classList.add('invert-text-color');
    }
  })
  registerEvents('phase-' + idNext + '.started', () => {
    const elContent = document.getElementById('phase-' + idNext + '.content');
    elContent.classList.remove('hidden')

    emitEvent('phase-' + idNext + '.started-content')
  })
  registerEvents('phase-' + idNext + '.started-content', () => { })

  if (!id) {
    document.body.className = dayPhases[dayPhaseId];
    document.body.classList.add(phaseNameFromId(1));
  }
})