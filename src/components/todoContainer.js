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
          todo-toolbar {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            padding: 10px;
          }
          todo-note {
            display: none;
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
