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
    // 1. 툴바 + 버튼 클릭 시, note 열기/닫기
    const $openNoteButton = this.shadowRoot.querySelector('.open-note-button');
    const $todoNote = this.nextElementSibling;

    $openNoteButton.addEventListener('click', (event) => {
      if ($todoNote.style.display === 'none') {
        $todoNote.style.display = 'flex';
      } else {
        $todoNote.style.display = 'none';
      }
    });

    // 2. X 버튼 클릭 시, container 삭제
    const $deleteContainerButton = this.shadowRoot.querySelector(
      '.delete-container-button'
    );
    $deleteContainerButton.addEventListener('click', (event) => {
      if (!confirm('정말 삭제하시겠습니까?')) return;
      const containerTitle = this.dataset.containerTitle;
      const $todoApp = document.querySelector('todo-app');
      const $containerSelected = $todoApp.shadowRoot.querySelector(
        `[
            data-container-title=${containerTitle}
          ]`
      );
      $containerSelected.remove();

      // 2-1. 컨테이너 5개 미만일 때, add column 재생성
      const $appMain = $todoApp.shadowRoot.querySelector('.main');
      const $createContainerButton = $appMain.querySelector(
        '.create-container-button'
      );
      if ($createContainerButton.style.display === 'none') {
        $createContainerButton.style.display = 'block';
      }
    });

    // 3. add column 클릭 시 입력값을 name으로 갖는 container 생성
    const $containerName = this.shadowRoot.querySelector('.container-name');
    $containerName.textContent = this.dataset.containerTitle;
  }
  disconnectedCallback() {}

  static get observedAttributes() {
    return [];
  }
  attributeChangedCallback(name, oldValue, newValue) {}
}

customElements.define('todo-toolbar', TodoToolbar);
