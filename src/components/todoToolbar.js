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
            font-weight: bold;
          }
          .count-item {
            width: 20px;
            height: 20px;
            text-align: center;
            background-color: lightgray;
            border-radius: 50%;
            line-height: 20px;
          }
        </style>
        <div class="count-item">0</div>
        <div class="container-name">${this.dataset.containerTitle}</div>
        <div class="open-note-button">+</div>
        <div class="delete-container-button">X</div>
    `;
  }

  connectedCallback() {
    // 툴바 + 버튼 클릭 시, todoNote open/close
    const $openNoteButton = this.shadowRoot.querySelector('.open-note-button');
    const $todoNote = this.nextElementSibling;

    $openNoteButton.addEventListener('click', (event) => {
      if ($todoNote.style.display === 'none') {
        $todoNote.style.display = 'flex';
      } else {
        $todoNote.style.display = 'none';
      }
    });
  }
  disconnectedCallback() {}

  static get observedAttributes() {
    return [];
  }
  attributeChangedCallback(name, oldValue, newValue) {}
}

customElements.define('todo-toolbar', TodoToolbar);
