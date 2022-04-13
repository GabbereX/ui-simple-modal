class ModalRoot {
  constructor({ selector, content }) {
    this.button = document.getElementById(selector);
    this.modalRoot = null;
    this.modalContent = content;
    this.clickToOpen();
  }

  get modalRoot() {
    return this._modalRoot;
  }

  set modalRoot(state) {
    this._modalRoot = state;
  }

  clickToOpen() {
    this.button.addEventListener('click', () => {
      if (!this.modalRoot) {
        this.render();
        this.open();
      } else {
        this.modalRoot.remove();
        this.modalRoot = null;
      }
    });
  }

  clickToClose() {
    this.modalRoot.addEventListener('mousedown', e => {
      if (e.target === this.modalRoot || e.target === this.modalCloseButton) {
        this.close();
      }
    });
  }

  open() {
    setTimeout(() => {
      this.modalRoot.classList.add('modal-root-open');
      this.modalWindow.classList.add('modal-window-open');
    }, 1);
  }

  close() {
    this.modalRoot.classList.remove('modal-root-open');
    this.modalWindow.classList.remove('modal-window-open');
    setTimeout(() => {
      this.modalRoot.remove();
      this.modalRoot = null;
    }, 300);
  }

  render() {
    this.modalRoot = document.createElement('div');
    this.modalWindow = document.createElement('div');
    this.modalCloseButton = document.createElement('button');

    this.modalRoot.classList.add('modal-root');
    this.modalWindow.classList.add('modal-window');
    this.modalCloseButton.classList.add('modal-close-button');

    this.modalCloseButton.innerText = 'X';
    this.modalWindow.insertAdjacentHTML('beforeend', this.modalContent);

    this.clickToClose();

    this.modalWindow.append(this.modalCloseButton);
    this.modalRoot.append(this.modalWindow);
    document.body.append(this.modalRoot);
  }
}

export { ModalRoot };
