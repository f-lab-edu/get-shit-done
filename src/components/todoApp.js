export default class TodoApp extends HTMLElement {
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
        .header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          background-color: #202632;
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
          <todo-container data-container-title="해야할일"></todo-container>
          <todo-container data-container-title="하는중"></todo-container>
          <todo-container data-container-title="완료"></todo-container>
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
