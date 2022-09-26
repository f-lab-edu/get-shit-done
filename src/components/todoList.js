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
          }
        </style>
    `;
  }

  connectedCallback() {
    // 1. 드래그 앤 드랍
    function onDragOver(event) {
      event.preventDefault();
    }

    this.addEventListener('dragover', onDragOver);
  }
  disconnectedCallback() {}

  static get observedAttributes() {
    return [];
  }
  attributeChangedCallback(name, oldValue, newValue) {}
}

customElements.define('todo-list', TodoList);
