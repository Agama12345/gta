// Obsługa klawiatury, myszy i ekranów dotykowych.

export class Input {
  constructor(canvas) {
    this.canvas = canvas;
    this.keys = new Set();
    this.pressed = new Set();
    this.mouseDX = 0;
    this.mouseDY = 0;
    this.locked = false;
    this.enabled = true;
    this.sensitivity = 0.0022;
    this.listeners = [];
    this.mouseDown = false;
    this.touch = { active: false, moveId: null, lookId: null, moveX: 0, moveY: 0, startX: 0, startY: 0, lookX: 0, lookY: 0 };
    this._bind();
  }

  on(handler) {
    this.listeners.push(handler);
  }

  _emit(type, data) {
    for (const l of this.listeners) l(type, data);
  }

  _bind() {
    const ka = (e) => {
      if (!this.enabled) return;
      const k = e.code;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'Tab'].includes(k)) e.preventDefault();
      if (!this.keys.has(k)) this.pressed.add(k);
      this.keys.add(k);
      this._emit('keydown', k);
    };
    const kr = (e) => {
      this.keys.delete(e.code);
      this._emit('keyup', e.code);
    };
    window.addEventListener('keydown', ka);
    window.addEventListener('keyup', kr);

    window.addEventListener('blur', () => {
      this.keys.clear();
      this.pressed.clear();
    });

    this.canvas.addEventListener('mousedown', (e) => {
      if (!this.enabled) return;
      this.mouseDown = true;
      if (!this.locked && e.button === 0) this.requestLock();
      this._emit('mousedown', e.button);
    });
    window.addEventListener('mouseup', (e) => {
      this.mouseDown = false;
      this._emit('mouseup', e.button);
    });

    document.addEventListener('mousemove', (e) => {
      // Gdy blokada kursora jest niedostępna (np. w iframe), rozglądamy się
      // przeciągnięciem przy wciśniętym przycisku myszy.
      if (!this.locked && !this.mouseDown) return;
      this.mouseDX += e.movementX || 0;
      this.mouseDY += e.movementY || 0;
    });

    document.addEventListener('pointerlockchange', () => {
      this.locked = document.pointerLockElement === this.canvas;
      this._emit('lockchange', this.locked);
    });

    window.addEventListener('contextmenu', (e) => e.preventDefault());

    // dotyk — lewa strona: ruch, prawa: rozglądanie
    const el = this.canvas;
    el.addEventListener('touchstart', (e) => {
      if (!this.enabled) return;
      for (const t of e.changedTouches) {
        if (t.clientX < window.innerWidth * 0.42 && this.touch.moveId === null) {
          this.touch.moveId = t.identifier;
          this.touch.startX = t.clientX;
          this.touch.startY = t.clientY;
          this.touch.moveX = 0;
          this.touch.moveY = 0;
        } else if (this.touch.lookId === null) {
          this.touch.lookId = t.identifier;
          this.touch.lookX = t.clientX;
          this.touch.lookY = t.clientY;
        }
      }
      this.touch.active = true;
      this._emit('touchstart', e);
    }, { passive: true });

    el.addEventListener('touchmove', (e) => {
      for (const t of e.changedTouches) {
        if (t.identifier === this.touch.moveId) {
          this.touch.moveX = Math.max(-1, Math.min(1, (t.clientX - this.touch.startX) / 60));
          this.touch.moveY = Math.max(-1, Math.min(1, (t.clientY - this.touch.startY) / 60));
        } else if (t.identifier === this.touch.lookId) {
          this.mouseDX += (t.clientX - this.touch.lookX) * 0.55;
          this.mouseDY += (t.clientY - this.touch.lookY) * 0.55;
          this.touch.lookX = t.clientX;
          this.touch.lookY = t.clientY;
        }
      }
    }, { passive: true });

    const endTouch = (e) => {
      for (const t of e.changedTouches) {
        if (t.identifier === this.touch.moveId) {
          this.touch.moveId = null;
          this.touch.moveX = 0;
          this.touch.moveY = 0;
        }
        if (t.identifier === this.touch.lookId) this.touch.lookId = null;
      }
      if (this.touch.moveId === null && this.touch.lookId === null) this.touch.active = false;
    };
    el.addEventListener('touchend', endTouch, { passive: true });
    el.addEventListener('touchcancel', endTouch, { passive: true });
  }

  requestLock() {
    if (!this.canvas.requestPointerLock) return;
    try {
      const p = this.canvas.requestPointerLock();
      if (p && p.catch) p.catch(() => {});
    } catch (e) {
      // iframe bez allow-pointer-lock — zostaje rozglądanie przeciąganiem
    }
  }

  exitLock() {
    if (!this.locked) return;
    try {
      if (document.exitPointerLock) document.exitPointerLock();
    } catch (e) {
      /* ignorujemy */
    }
  }

  isDown(code) {
    return this.keys.has(code);
  }

  wasPressed(code) {
    return this.pressed.has(code);
  }

  consumeMouse() {
    const d = { x: this.mouseDX, y: this.mouseDY };
    this.mouseDX = 0;
    this.mouseDY = 0;
    return d;
  }

  endFrame() {
    this.pressed.clear();
  }

  // osie ruchu: W/S i A/D + dotyk
  axes() {
    let x = 0;
    let y = 0;
    if (this.isDown('KeyW') || this.isDown('ArrowUp')) y -= 1;
    if (this.isDown('KeyS') || this.isDown('ArrowDown')) y += 1;
    if (this.isDown('KeyA') || this.isDown('ArrowLeft')) x -= 1;
    if (this.isDown('KeyD') || this.isDown('ArrowRight')) x += 1;
    if (this.touch.moveId !== null) {
      x += this.touch.moveX;
      y += this.touch.moveY;
    }
    const len = Math.hypot(x, y);
    if (len > 1) {
      x /= len;
      y /= len;
    }
    return { x, y };
  }
}
