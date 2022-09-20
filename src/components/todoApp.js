export default class TodoApp extends HTMLElement {
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
        .header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          background-color: black;
          color: white;
          padding: 5px 10px;
        }
        .main {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
        }
        </style>
        <header class="header">
          <span>TODO 서비스</span>
          <span class="header__menu">menu</span>
        </header>
        <main class="main">
          <todo-container class="todo-container--will-do"></todo-container>
          <todo-container class="todo-container--doing"></todo-container>
          <todo-container class="todo-container--done"></todo-container>
        </main>
    `;
  }

  connectedCallback() {}
  disconnectedCallback() {}

  static get observedAttributes() {
    return [];
  }
  attributeChangedCallback(name, oldValue, newValue) {}
}

customElements.define('todo-app', TodoApp);
