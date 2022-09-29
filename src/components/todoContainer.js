export default class TodoContainer extends HTMLElement {
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
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            background-color: #f1f1f1;
            flex-grow: 1;
            height: 85vh;
            margin: 1vh 0.5vw;
            border-radius: 5px;
          }
        </style>
        <todo-toolbar class="todo-toolbar" data-container-title="${this.dataset.containerTitle}"></todo-toolbar>
        <todo-note class="todo-note" data-container-title="${this.dataset.containerTitle}"></todo-note>
        <todo-list class="todo-list" data-container-title="${this.dataset.containerTitle}"></todo-list>
    `;
  }

  connectedCallback() {
    const containerTitle = this.dataset.containerTitle;
    const $toolBar = this.shadowRoot.querySelector('.todo-toolbar');
    $toolBar.dataset.containerTitle = containerTitle;

    const $note = this.shadowRoot.querySelector('.todo-note');
    $note.dataset.containerTitle = containerTitle;

    const $list = this.shadowRoot.querySelector('.todo-list');
    $list.dataset.containerTitle = containerTitle;
  }
  disconnectedCallback() {}

  static get observedAttributes() {
    return [];
  }
  attributeChangedCallback(name, oldValue, newValue) {}
}

customElements.define('todo-container', TodoContainer);
