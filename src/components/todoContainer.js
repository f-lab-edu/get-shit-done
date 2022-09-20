export default class TodoContainer extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.shadow.innerHTML = this.getTemplate();
  }

  getTemplate() {
    return `
        <style>
          :host {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            background-color: #ebebeb;
            width: 30vw;
            height: 70vh;
            margin: 5px;
            border-radius: 5px;
          }
          todo-list {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
          }
        </style>
        <todo-toolbar></todo-toolbar>
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
