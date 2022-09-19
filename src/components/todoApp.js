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
        <header class="header">
          <span>TODO 서비스</span>
          <span class="header__menu">menu</span>
        </header>
        <main class="main">
          <todo-container></todo-container>
          <todo-container></todo-container>
          <todo-container></todo-container>
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
