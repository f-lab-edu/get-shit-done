export default class TodoNote extends HTMLElement {
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
            font-weight: bold;
            opacity: 50%;
          }
          .note-cancel-button {
            width: 45%;
            text-align: center;
            background-color: #f8863c;
            border-radius: 5px;
            border: 1px solid gray;
            font-weight: bold;
          }
        </style>
        <textarea class="note-input" placeholder="Get shit done"></textarea>
        <div class="note-buttons">
          <div class="note-add-button">Add</div>
          <div class="note-cancel-button">Cancel</div>
        </div>
    `;
  }

  connectedCallback() {
    // 1. Add 버튼 클릭 시 새로운 메모 생성
    const $noteAddButton = this.shadowRoot.querySelector('.note-add-button');
    const $noteInput = this.shadowRoot.querySelector('.note-input');
    $noteAddButton.addEventListener('click', (event) => {
      // 1-1. input이 없을 때는 메모 생성 막기
      if (!$noteInput.value) return;

      const $todoItem = document.createElement('todo-item');
      $todoItem.dataset.containerTitle = this.dataset.containerTitle;
      $todoItem.dataset.itemTitle = $noteInput.value;
      this.nextElementSibling.shadowRoot.append($todoItem);

      // 1-2. 메모 추가 후 입력칸 초기화
      $noteInput.value = '';

      // 1-3. 메모 갯수 더하기
      const $noteCount =
        this.previousElementSibling.shadowRoot.querySelector('.count-item');
      $noteCount.textContent = +$noteCount.textContent + 1;

      // 1-4. Add 버튼 비활성화
      $noteAddButton.style.opacity = '50%';
    });

    // 2. Cancel 버튼 클릭 시 todoNote 닫기
    const $noteCancelButton = this.shadowRoot.querySelector(
      '.note-cancel-button'
    );
    $noteCancelButton.addEventListener('click', (event) => {
      this.style.display = 'none';

      // 2-1. 메모 닫은 후 입력칸 초기화
      $noteInput.value = '';
    });

    // 3. 메모 입력 시 Add 버튼 활성화
    $noteInput.addEventListener('input', (event) => {
      $noteAddButton.style.opacity =
        event.target.value.length === 0 ? '50%' : '100%';
    });
  }
  disconnectedCallback() {}

  static get observedAttributes() {
    return [];
  }
  attributeChangedCallback(name, oldValue, newValue) {}
}

customElements.define('todo-note', TodoNote);
