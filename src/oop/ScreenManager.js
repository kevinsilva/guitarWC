export default class ScreenManager {
  constructor(screensArray) {
    this.screens = screensArray;
    this._showScreen(0);
  }

  _showScreen(position) {
    if (!this.screens) return;

    this.visibleScreenIndex = position > 3 ? (position = 0) : position;
    for (const [index, entry] of this.screens.entries()) {
      index === position ? entry.show() : entry.hide();
    }
  }

  showNext() {
    if (this.visibleScreenIndex === undefined) return;
    this._showScreen(this.visibleScreenIndex + 1);
  }
}
