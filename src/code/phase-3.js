import { registerEvents, emitEvent } from './helpers/events'
import { effectPcText } from './helpers/controls'

const labels = {
  title: 'Lo sapevi che...',
  okButton: 'Ok!',
}

export const className = "phase-3";

const random = items => items[Math.floor(Math.random() * items.length)];

export function render({ userData }) {
  return `
    <div class="row">
      <h1 class="text-center">
        ${effectPcText(labels.title, 'phase-3.starting', 'phase-3.started')}
      </h1>
    </div>
    <div id="phase-3.content" class="row hidden">
      <hr size/>
      <br/>
      
      <p class="text-justify">
        ${effectPcText(() => random(userData.planet.curiosities), 'phase-3.started-content')}
      </p>
    </div>
  `;
}

registerEvents('phase-3.started-content', () => {
  setTimeout(() => {
    emitEvent('phase-4.entering')
  }, process.env.NODE_ENV === 'development' ? 2500 : 10000);
})