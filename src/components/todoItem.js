import { activityLog } from './todoApp';
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
          justify-content: flex-start;
          align-items: flex-start;
          background-color: white;
          border: 1px solid black;
          border-radius: 5px;
          margin: 1vh 1vw;
          padding: 1vw;
        }
        .item-information {
          width: 60%;
          position: relative;
          left: 1vw;
        }
        .item-delete-button {
          position: relative;
          left: 30%;
        }
        .item-writer {
          font-size: 14px;
          padding-top: 5px;
          color: #5a5a5a;
        }
        .writer {
          font-size: 12px;
          color: #a5a5a5;
        }
        .item-modal-outer {
          display: none;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          position: fixed;
          background-color: rgba(0, 0, 0, 0.3);
          z-index: 1;
        }
        .item-modal-inner {
          display: none;
          flex-direction: column;
          top: 25vh;
          left: 25vw;
          width: 50vw;
          height: 50vh;
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
          height: 40vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 2vh 2vw;
          font-weight: bold;
        }
        .modal-input {
          height: 30vh;
          width: 46vw;
        }
        .modal-save-button {
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

      <div class="item-icon">🗒️</div>
      <div class="item-information">
        <div class="item-content"></div>
        <div class="item-writer">
          Written by <span class="writer">Jayden</span>
        </div>
      </div>
      <div class="item-delete-button">X</div>
      <div class="item-modal-outer"></div>
      <div class="item-modal-inner">
        <div class="modal-header">
          <span>Edit note</span>
          <span class="modal-close-button">X</span>
        </div>
        <div class="modal-main">
          <div>Note</div>
          <textarea class="modal-input"></textarea>
          <div class="modal-save-button">Save Note</div>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    // 추가) 드래그 앤 드랍된 태그는 이벤트 중복되는 것 방지
    if (this.className) return;

    // 1. item이 생성되고 DOM에 추가될 때 그 안에 텍스트를 바꿔주기
    this.shadowRoot.querySelector('.item-content').textContent =
      this.dataset.itemTitle;
    // 추가) 모달 창 input value에도 같은 값 할당
    this.shadowRoot.querySelector('.modal-input').value =
      this.dataset.itemTitle;

    // 2. item X button 클릭 시 item 삭제 및 count 빼기
    const $itemDeleteButton = this.shadowRoot.querySelector(
      '.item-delete-button'
    );
    $itemDeleteButton.addEventListener('click', (event) => {
      // 2-0. 컨펌 메시지 false인 경우 early return
      if (!confirm('선택하신 카드를 삭제하시겠습니까?')) return;

      // 2-1. item 삭제
      this.remove();

      // 2-2. count 빼기
      // ✅다시: shadow dom 바깥으로 가는 다른 루트는 없는지 확인
      const containerTitle = this.dataset.containerTitle;
      const $noteCount = document
        .querySelector('todo-app')
        .shadowRoot.querySelector(
          `[
            data-container-title=${containerTitle}
          ]`
        )
        .shadowRoot.querySelector('todo-toolbar')
        .shadowRoot.querySelector('.count-item');
      $noteCount.textContent = +$noteCount.textContent - 1;

      // 2-3. 활동 기록에 삭제 활동 추가
      const $record = document.createElement('div');
      $record.className = 'record';
      $record.innerHTML = `<span class="record-important">@Jayden</span> deleted <span class="record-item">${this.dataset.itemTitle}</span> from <span class="record-container">${this.dataset.containerTitle}</span>`;

      const now = Date.now();
      $record.dataset.timeMakeNote = now;
      activityLog.push($record);
    });

    // 3. 아이템 더블 클릭 시 수정 모달 생성
    this.addEventListener('dblclick', (event) => {
      this.shadowRoot.querySelector('.item-modal-outer').style.display =
        'block';
      this.shadowRoot.querySelector('.item-modal-inner').style.display = 'flex';
    });

    // 4. 모달 창 X 클릭 시 모달 닫기
    const $modalCloseButton = this.shadowRoot.querySelector(
      '.modal-close-button'
    );
    const $modalInner = this.shadowRoot.querySelector('.item-modal-inner');
    const $modalOuter = this.shadowRoot.querySelector('.item-modal-outer');

    $modalCloseButton.addEventListener('click', (event) => {
      $modalInner.style.display = 'none';
      $modalOuter.style.display = 'none';
      $modalInner.querySelector('.modal-input').value = this.dataset.itemTitle;
    });

    // 5. 모달 창 save button 클릭 시 내용 변경
    const $modalSaveButton =
      this.shadowRoot.querySelector('.modal-save-button');
    const $modalInput = this.shadowRoot.querySelector('.modal-input');
    const $itemContent = this.shadowRoot.querySelector('.item-content');
    $modalSaveButton.addEventListener('click', (event) => {
      $modalInner.style.display = 'none';
      $modalOuter.style.display = 'none';

      // 5-1. 활동 기록에 수정 활동 추가
      const $record = document.createElement('div');
      $record.className = 'record';
      $record.innerHTML = `<span class="record-important">@Jayden</span> changed <span class="record-item">${$itemContent.textContent}</span> to <span class="record-item">${$modalInput.value}</span> in <span class="record-container">${this.dataset.containerTitle}</span>`;

      const now = Date.now();
      $record.dataset.timeMakeNote = now;
      activityLog.push($record);

      $itemContent.textContent = $modalInput.value;
    });

    // 6. 드래그 앤 드랍
    this.setAttribute('draggable', 'true');

    this.addEventListener('dragstart', (event) => {
      const containerTitle = event.target.dataset.containerTitle;
      const itemTitle = event.target.dataset.itemTitle;
      const $todoApp = document.querySelector('todo-app');
      const $targetContainer = $todoApp.shadowRoot.querySelector(
        `[data-container-title=${containerTitle}]`
      );
      const $targetList =
        $targetContainer.shadowRoot.querySelector('todo-list');
      event.target.classList.add('drag-target', 'already');
      $targetList.classList.add('drag-target');
      $targetContainer.classList.add('drag-target');
    });

    this.addEventListener('drop', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const $todoApp = document.querySelector('todo-app');
      const $targetContainer =
        $todoApp.shadowRoot.querySelector('.drag-target');
      const $targetList =
        $targetContainer.shadowRoot.querySelector('.drag-target');
      const $targetItem = $targetList.shadowRoot.querySelector('.drag-target');
      $targetItem.remove();
      const dropTargetClientTop = event.target.getBoundingClientRect().top;
      const dropTargetClientBottom =
        event.target.getBoundingClientRect().bottom;
      const dropTargetClientMiddle =
        (dropTargetClientTop + dropTargetClientBottom) / 2;
      if (event.clientY < dropTargetClientMiddle) {
        event.target.parentNode.insertBefore($targetItem, event.target);
      } else {
        event.target.parentNode.insertBefore(
          $targetItem,
          event.target.nextElementSibling
        );
      }
      $targetItem.dataset.containerTitle = event.target.dataset.containerTitle;

      const $targetToolbar =
        $targetContainer.shadowRoot.querySelector('todo-toolbar');
      const $noteCountBefore =
        $targetToolbar.shadowRoot.querySelector('.count-item');
      $noteCountBefore.textContent = +$noteCountBefore.textContent - 1;

      const $noteCountAfter = document
        .querySelector('todo-app')
        .shadowRoot.querySelector(
          `[
            data-container-title=${event.target.dataset.containerTitle}
          ]`
        )
        .shadowRoot.querySelector('todo-toolbar')
        .shadowRoot.querySelector('.count-item');
      $noteCountAfter.textContent = +$noteCountAfter.textContent + 1;

      const $record = document.createElement('div');
      $record.className = 'record';
      $record.innerHTML = `<span class="record-important">@Jayden</span> moved <span class="record-item">${$targetItem.dataset.itemTitle}</span> to <span class="record-container">${event.target.dataset.containerTitle}</span> from <span class="record-container">${$targetContainer.dataset.containerTitle}</span>`;

      const now = Date.now();
      $record.dataset.timeMakeNote = now;
      activityLog.push($record);

      $targetContainer.classList.remove('drag-target');
      $targetList.classList.remove('drag-target');
      $targetItem.classList.remove('drag-target');
    });
  }
  disconnectedCallback() {}

  static get observedAttributes() {
    return [];
  }
  attributeChangedCallback(name, oldValue, newValue) {}
}

customElements.define('todo-item', TodoItem);
