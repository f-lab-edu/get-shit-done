export default class TodoItem extends HTMLElement {
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
            align-items: flex-start;
            background-color: white;
            border: 1px solid black;
            border-radius: 5px;
            margin: 10px;
            padding: 5px;
          }
          .item-writer {
            font-size: 14px;
            padding-top: 5px;
          }
          .writer {
            font-size: 12px;
            color: #a5a5a5;

          }
        </style>

        <div class="item-icon">📝</div>
        <div class="item-information">
          <div class="item-content">타이틀</div>
          <div class="item-writer">Added by <span class="writer">Jayden</span></div>
        </div>
        <div class="item-delete-button">X</div>
    `;
  }

  connectedCallback() {
    // todo-item이 생성되고 DOM에 추가될 때 그 안에 텍스트를 바꿔주기
    this.shadowRoot.querySelector('.item-content').textContent =
      this.dataset.itemTitle;
  }
  disconnectedCallback() {}

  static get observedAttributes() {
    return [];
  }
  attributeChangedCallback(name, oldValue, newValue) {}
}

customElements.define('todo-item', TodoItem);
