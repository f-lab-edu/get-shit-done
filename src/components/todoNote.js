export default class TodoNote extends HTMLElement {
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
            display: flex; // none;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            padding: 0 5px;            
          }
          .note-input {
            width: 90%;
          }
          .note-buttons {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 90%;
            padding: 5px;
          }
          .note-add-button {
            width: 45%;
            text-align: center;
            background-color: #00c471;
            border: 1px solid gray;
            border-radius: 5px;
            color: white;
          }
          .note-cancel-button {
            width: 45%;
            text-align: center;
            border-radius: 5px;
            border: 1px solid gray;
          }
        </style>
        <textarea class="note-input" placeholder="Enter a note"></textarea>
        <div class="note-buttons">
          <div class="note-add-button">Add</div>
          <div class="note-cancel-button">Cancel</div>
        </div>
    `;
  }

  connectedCallback() {}
  disconnectedCallback() {}

  static get observedAttributes() {
    return [];
  }
  attributeChangedCallback(name, oldValue, newValue) {}
}

customElements.define('todo-note', TodoNote);
