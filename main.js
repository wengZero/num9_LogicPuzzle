class Board {
  constructor() {
    this.cells = document.querySelectorAll('button.index');
    this.active = null;
  }
}
class Condition {
  constructor() {
    this.length = 9;
    this.last = 1;
    this.now = 2;
    this.next = 3;

    this.cond = undefined;
  }
}

class GameFrame {
  constructor(config) {
    this.level = 0;
    this.board = new Board(this);
    this.condition = new Condition(this);
    
    this.menu = document.querySelector('#main-menu');
    this.game = document.querySelector('#game-container');
    this.cond = document.querySelector('#condition');
    this.ans = undefined;
  }
}

const frame = new GameFrame({})

window.onload = function() {
  gameMenu_init();
  gameBoard_init();
}


// function: theme_toggle (darkMode <> lightMode)
document.querySelector('#theme-toggle').addEventListener('click', ()=> {
  document.querySelector('#theme-toggle span').toggleAttribute('dark');
  document.querySelector('body').classList.toggle('dark');
})