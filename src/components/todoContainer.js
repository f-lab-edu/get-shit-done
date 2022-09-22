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
            width: 30vw;
            height: 85vh;
            margin: 5px;
            border-radius: 5px;
          }
        </style>
        <todo-toolbar data-container-title="${this.dataset.containerTitle}"></todo-toolbar>
        <todo-note></todo-note>
        <todo-list></todo-list>
    `;
  }

  connectedCallback() {}
  disconnectedCallback() {}

  static get observedAttributes() {
    return [];
  }
  attributeChangedCallback(name, oldValue, newValue) {}
}

customElements.define('todo-container', TodoContainer);
