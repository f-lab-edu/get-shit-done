export const activityLog = [];
export class TodoApp extends HTMLElement {
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
        .activity {
          width: 40vw;
          height: 100vh;
          top: 0;
          right: 0;
          position: fixed;
          display: none;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          padding: 1vh 1vw;
          background-color: #f1f1f1;
          z-index: 1;

        }
        .activity__header {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid black;
          background-color: #f1f1f1;
        }
        .activity__main {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column-reverse;
          justify-content: flex-end;
          align-items: center;
          padding: 1vh 1vw;
          background-color: white;
        }
        .record {
          width: 100%;
          height: 8%;
          margin-bottom: 1vh;
          border-bottom: 1px solid black;
        }
        .record-important {
          font-weight: bold;
          color: #00c471;
        }
        .record-time {
          color: #d3d3d3;
          font-size: 12px;
        }
        </style>
        <header class="header">
          <span>Just Do it!</span>
          <span class="header__menu">Menu</span>
        </header>
        <main class="main">
          <div class="create-container-button">+ Add Container</div>
        </main>
        <aside class="activity">
          <div class="activity__header">
            <div>📓 Activity</div><div class="activity__close-button">X</div>
          </div>
          <div class="activity__main"></div>
        </aside>
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

    // 2. Menu 클릭 시 사용 기록 보기
    const $menuButton = this.shadowRoot.querySelector('.header__menu');
    const $activity = this.shadowRoot.querySelector('.activity');
    const $activityMain = this.shadowRoot.querySelector('.activity__main');
    $menuButton.addEventListener('click', (event) => {
      $activity.style.display = 'flex';
      const now = Date.now();
      activityLog.forEach(($record) => {
        const $recordTime = document.createElement('p');
        $recordTime.className = 'record-time';
        const timeDifferenceSeconds = Math.floor(
          (now - +$record.dataset.timeMakeNote) / 1000
        );
        const timeDifferenceMinutes = Math.floor(timeDifferenceSeconds / 60);
        const timeDifferenceHours = Math.floor(timeDifferenceMinutes / 60);
        const timeDifferenceDays = Math.floor(timeDifferenceHours / 24);
        $recordTime.textContent =
          timeDifferenceSeconds < 60
            ? `${timeDifferenceSeconds}초 전`
            : timeDifferenceMinutes < 60
            ? `${timeDifferenceMinutes}분 전`
            : timeDifferenceHours < 24
            ? `${timeDifferenceHours}시간 전`
            : `${timeDifferenceDays}일 전`;
        if ($record.querySelector('p')) {
          $record.querySelector('p').remove();
        }
        $record.append($recordTime);
        $activityMain.append($record);
      });
    });

    const $activityCloseButton = this.shadowRoot.querySelector(
      '.activity__close-button'
    );
    $activityCloseButton.addEventListener('click', (event) => {
      $activity.style.display = 'none';
      $activityMain.innerHTML = '';
    });
  }
  disconnectedCallback() {}

  static get observedAttributes() {
    return [];
  }
  attributeChangedCallback(name, oldValue, newValue) {}
}

customElements.define('todo-app', TodoApp);
