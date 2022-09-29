import { activityLog } from './todoApp';

export default class TodoList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = this.getTemplate();
  }

  getTemplate() {
    return `
        <style>
          :host {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            margin: 0 auto;
            flex-grow: 8;
          }
        </style>
    `;
  }

  connectedCallback() {
    this.addEventListener('dragover', (event) => {
      event.preventDefault();
    });

    this.addEventListener('drop', (event) => {
      event.preventDefault();
      const $todoApp = document.querySelector('todo-app');
      const $targetContainer =
        $todoApp.shadowRoot.querySelector('.drag-target');
      const $targetList =
        $targetContainer.shadowRoot.querySelector('todo-list');
      const $targetItem = $targetList.shadowRoot.querySelector('.drag-target');
      $targetItem.remove();
      event.target.shadowRoot.appendChild($targetItem);
      $targetItem.dataset.containerTitle = event.target.dataset.containerTitle;

      const $targetToolbar =
        $targetContainer.shadowRoot.querySelector('todo-toolbar');
      const $noteCountBefore =
        $targetToolbar.shadowRoot.querySelector('.count-item');
      $noteCountBefore.textContent = +$noteCountBefore.textContent - 1;

      const $noteCountAfter =
        event.target.previousElementSibling.previousElementSibling.shadowRoot.querySelector(
          '.count-item'
        );
      $noteCountAfter.textContent = +$noteCountAfter.textContent + 1;

      const $record = document.createElement('div');
      $record.className = 'record';
      $record.innerHTML = `<span class="record-important">@Jayden</span> moved <span class="record-item">${$targetItem.dataset.itemTitle}</span> to <span class="record-container">${event.target.dataset.containerTitle}</span> from <span class="record-container">${$targetContainer.dataset.containerTitle}</span>`;

      const now = Date.now();
      $record.dataset.timeMakeNote = now;
      activityLog.push($record);

      $targetContainer.classList.remove('drag-target');
      $targetList.classList.remove('drag-target');
      $targetItem.classList.remove('drag-target');
    });
  }
  disconnectedCallback() {}

  static get observedAttributes() {
    return [];
  }
  attributeChangedCallback(name, oldValue, newValue) {}
}

customElements.define('todo-list', TodoList);
