export default class ScreenManager {
  constructor (screensArray) {
    this.screens = screensArray;
    this._showScreen(0);
  }

  _showScreen (position) {
    if (!this.screens) return;
    // if (typeof position !== "number") return; // se o codigo for chamado com arg sem ser numero, nao dá erro nenhum e é dificil perceber pq app nao funciona. É melhor deixar o error explodir na cara do dev!

    this.visibleScreenIndex = position > 3 ? (position = 0) : position;
    for (const [index, entry] of this.screens.entries()) {
      index === position ? entry.show() : entry.hide();
    }
  }

  showNext () {
    if (this.visibleScreenIndex === undefined) return;
    this._showScreen(this.visibleScreenIndex + 1);
  }
}
