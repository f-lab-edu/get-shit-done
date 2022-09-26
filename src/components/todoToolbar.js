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
          .delete-container-button:hover {
            color: #f8863c;
          }
          .container-modal-outer {
            display: none;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            position: fixed;
            background-color: rgba(0, 0, 0, 0.3);
            z-index: 1;
          }
          .container-modal-inner {
            display: none;
            flex-direction: column;
            top: 25vh;
            left: 25vw;
            width: 50vw;
            height: 30vh;
            position: fixed;
            background-color: white;
            z-index: 2;
          }
          .modal-header {
            height: 2vh;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            background-color: #f1f1f1;
            padding: 2vh 2vw;
            border-bottom: 1px solid lightgray;
            font-weight: bold;
          }
          .modal-main {
            height: 20vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 2vh 2vw;
            font-weight: bold;
          }
          .modal-input {
            height: 5vh;
            width: 46vw;
          }
          .modal-update-button {
            padding: 1vh 1vw;
            border-radius: 5px;
            background-color: #00c471;
            color: white;
            text-align: center;
          }
          .item-delete-button:hover, .modal-close-button:hover {
            color: #f8863c;
          }
        </style>
        <div class="count-item">0</div>
        <div class="container-name">${this.dataset.containerTitle}</div>
        <div class="open-note-button">+</div>
        <div class="delete-container-button">X</div>
        <div class="container-modal-outer"></div>
        <div class="container-modal-inner">
          <div class="modal-header">
            <span class="modal-target">Edit</span>
            <span class="modal-close-button">X</span>
          </div>
          <div class="modal-main">
            <div>Container name</div>
            <input class="modal-input">
            <div class="modal-update-button">Update Container</div>
          </div>
        </div>
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
      console.log($containerSelected);
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

    // 4. 컨테이너 이름 변경
    const $modalOuter = this.shadowRoot.querySelector('.container-modal-outer');
    const $modalInner = this.shadowRoot.querySelector('.container-modal-inner');
    const $modalCloseButton = this.shadowRoot.querySelector(
      '.modal-close-button'
    );
    const $modalUpdateButton = this.shadowRoot.querySelector(
      '.modal-update-button'
    );
    const $modalInput = this.shadowRoot.querySelector('.modal-input');
    $containerName.addEventListener('dblclick', (event) => {
      $modalOuter.style.display = 'block';
      $modalInner.style.display = 'flex';
      $modalInput.value = this.dataset.containerTitle;
    });
    $modalCloseButton.addEventListener('click', (event) => {
      $modalOuter.style.display = 'none';
      $modalInner.style.display = 'none';
      $modalInput.value = this.dataset.containerTitle;
    });
    $modalOuter.addEventListener('click', (event) => {
      $modalOuter.style.display = 'none';
      $modalInner.style.display = 'none';
      $modalInput.value = this.dataset.containerTitle;
    });
    $modalUpdateButton.addEventListener('click', (event) => {
      $modalOuter.style.display = 'none';
      $modalInner.style.display = 'none';
      $containerName.textContent = $modalInput.value;
      this.dataset.containerTitle = $modalInput.value;
    });
  }
  disconnectedCallback() {}

  static get observedAttributes() {
    return [];
  }
  attributeChangedCallback(name, oldValue, newValue) {}
}

customElements.define('todo-toolbar', TodoToolbar);
