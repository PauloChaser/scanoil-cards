export class SlideToggle {
  constructor(containerId, classname) {
    this.container = containerId && document.getElementById(containerId)
    this.classname = classname || 'active'
  }

  toggle() {
    if (!this.container) {
      return
    }

    if (!this.container.classList.contains(this.classname)) {
      this.container.classList.add(this.classname);
      this.container.style.height = 'auto';

      const height = this.container.clientHeight + 'px';

      this.container.style.height = '0px';

      setTimeout(() => {
        this.container.style.height = height;
      }, 0);
    } else {
      this.container.style.height = '0px';
      this.container.addEventListener('transitionend', () => {
        this.container.classList.remove(this.classname);
      }, {
        once: true,
      });
    }
  }
}
