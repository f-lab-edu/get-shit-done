export default class TodoToolbar extends HTMLElement {
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
            flex-direction: row;
            justify-content: space-around;
            padding: 10px;
          }
          .count-item {
            width: 20px;
            height: 20px;
            text-align: center;
            background-color: lightgray;
            border-radius: 50%;
          }
        </style>
        <div class="count-item">1</div>
        <div class="container-name">해야할 일</div>
        <div class="open-note-button">+</div>
        <div class="delete-container-button">X</div>
    `;
  }

  connectedCallback() {}
  disconnectedCallback() {}

  static get observedAttributes() {
    return [];
  }
  attributeChangedCallback(name, oldValue, newValue) {}
}

customElements.define('todo-toolbar', TodoToolbar);
