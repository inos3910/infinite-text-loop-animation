export default class Main {
  constructor() {
    this.init();
  }

  init() {
    this.copyText();
    this.calculateLoopAnimationSpeed();
    this.resizeRefresh();
  }

  //リサイズ時にアニメーションの速度を再計算
  resizeRefresh() {
    const target = document.body;
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        this.calculateLoopAnimationSpeed();
      });
    });
    resizeObserver.observe(target);
  }

  //アニメーションの速度を計算してCSS変数に
  calculateLoopAnimationSpeed() {
    const targets = document.querySelectorAll('.js-tick');
    if (!targets.length) {
      return;
    }

    const distance = window.innerWidth;
    const mql = window.matchMedia('(min-width: 801px)');
    const time = mql.matches ? 18 : 9;
    const speed = distance / time;

    targets.forEach((target) => {
      const tickElems = target.querySelectorAll('.js-tick-item');
      if (!tickElems.length) {
        return;
      }

      const total = tickElems.length - 1;

      tickElems.forEach((el, i) => {
        const elWidth = el.clientWidth;
        const elTime = Math.floor(elWidth / speed);
        el.style.setProperty('--tick-duration', `${elTime}s`);
        el.style.setProperty('--tick-delay', `${elTime / -2}s`);

        if (i === total) {
          el.parentNode.classList.remove('no-tick');
        }
      });
    });
  }

  //テキストをコピーする
  copyText() {
    const targets = document.querySelectorAll('.js-tick');
    if (!targets.length) {
      return;
    }

    targets.forEach((target) => {
      const tickElems = target.querySelectorAll('.js-tick-item');
      if (!tickElems.length) {
        return;
      }

      let length = 0;
      tickElems.forEach((el) => {
        length += el.clientWidth;
        el.insertAdjacentHTML('afterend', el.outerHTML);
        if (length > window.innerWidth) {
          return;
        }
      });
    });
  }
}

new Main();
