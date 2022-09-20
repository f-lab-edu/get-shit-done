export default class TodoItem extends HTMLElement {
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
            flex-direction: row;
            justify-content: flex-start;
            background-color: white;
            border-radius: 5px;
          }
        </style>
        <div class="item-icon">
          <i class="fa-light fa-calendar-lines"></i>
        </div>
        <div class="item-information">
          <p class="item-content">헬스 1시간 반</p>
          <p class="item-writer">Added by<span class="writer"></span></p>
        </div>
        <div class="item-delete-button">X</div>
        <script src="https://kit.fontawesome.com/5a97a57cc7.js" crossorigin="anonymous"></script>
    `;
  }

  connectedCallback() {}
  disconnectedCallback() {}

  static get observedAttributes() {
    return [];
  }
  attributeChangedCallback(name, oldValue, newValue) {}
}

customElements.define('todo-item', TodoItem);
