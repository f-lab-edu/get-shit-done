export default class TodoApp extends HTMLElement {
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
        .header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 1vh 2vw;
          border-radius: 5px;
          background-color: #202632;
          color: white;
          font-weight: bold;
        }
        .main {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
        }
        .create-container-button {
          height: 85vh;
          margin: 1vh 0.5vw;
          border: 3px dashed #202632;
          border-radius: 5px;
          flex-grow: 1;
          text-align: center;
          line-height: 85vh;
          font-size: 1.5vw;
          font-weight: bold;
          color: #202632;
        }
        </style>
        <header class="header">
          <span>Just Do it!</span>
          <span class="header__menu">Menu</span>
        </header>
        <main class="main">
          <div class="create-container-button">+ Add Container</div>
        </main>
    `;
  }

  connectedCallback() {
    // 1. create-container-button 클릭 시 컨테이너 생성
    const $createContainerButton = this.shadowRoot.querySelector(
      '.create-container-button'
    );
    const $appMain = this.shadowRoot.querySelector('.main');
    $createContainerButton.addEventListener('click', (event) => {
      const containerTitleInput = prompt(
        '💥 (띄어쓰기 없이)메모장 이름을 적어주세요.'
      )
        .split(' ')
        .join('');
      if (!containerTitleInput) return;
      const $newContainer = document.createElement('todo-container');
      $newContainer.dataset.containerTitle = containerTitleInput;
      $appMain.insertBefore($newContainer, $createContainerButton);

      // 1-1. 메모 컨테이너 5개 이상 시, Add column 삭제
      if ($appMain.children.length >= 6) {
        $createContainerButton.style.display = 'none';
      }
    });
  }
  disconnectedCallback() {}

  static get observedAttributes() {
    return [];
  }
  attributeChangedCallback(name, oldValue, newValue) {}
}

customElements.define('todo-app', TodoApp);
