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
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        </style>
        
    `;
  }

  connectedCallback() {}
  disconnectedCallback() {}

  static get observedAttributes() {
    return [];
  }
  attributeChangedCallback(name, oldValue, newValue) {}
}

customElements.define('todo-list', TodoList);
