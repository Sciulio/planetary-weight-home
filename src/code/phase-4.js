import { effectPcText } from './helpers/controls'

const labels = {
  title: 'Il tuo peso su',
  is: 'è',
}

export const className = "phase-4";

export function render({ userData }) {
  return `
    <div class="row">
      <h1 class="text-center">
        ${effectPcText(labels.title, 'phase-4.starting', 'phase-4.started')}
      </h1>
    </div>
    <div id="phase-4.content" class="row hidden">
      <br/>
      
      <h3 class="text-center text-uppercase">
        ${effectPcText(() => userData.planet.name, 'phase-4.started-content', 'phase-4.started-content-2')}
      </h3>
      <h4 class="text-center">
        ${effectPcText(labels.is, 'phase-4.started-content-2', 'phase-4.started-content-3')}
      </h4>
      <h4 class="text-center">
        ${effectPcText(() => userData.computeWeight().toString() + ' kg!', 'phase-4.started-content-3', 'phase-4.started-content-4')}
      </h4>
    </div>
  `;
}