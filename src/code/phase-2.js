import { emitEvent, registerAllowers } from './helpers/events'
import { effectPcText, effectNumberInput, htmlFactoryBtn } from './helpers/controls'

const labels = {
  title: 'Qual è il tuo peso?',
  okButton: 'Ok!',
}

export const className = "phase-2";

export function render({ userData }) {
  return `
    <div class="row">
      <h1 class="text-center">
        ${effectPcText(labels.title, 'phase-2.starting', 'phase-2.started', 0)}
      </h1>
    </div>
    <div id="phase-2.content" class="row hidden mx-auto content-centered">
      <hr size/>
      <br/>

      ${effectNumberInput('kg', 'phase-3.entering', ({ keyCode, target: { value } }) => {
        userData.weight = value;
        return { weight: userData.weight }
      })}
      
      ${htmlFactoryBtn({
        onClick: () => {
          emitEvent('phase-3.entering', { weight: userData.weight })
        },
        label: labels.okButton
      })}
    </div>
  `;
}

registerAllowers('phase-3.entering', ({ weight }) => !isNaN(weight) && weight > 0)