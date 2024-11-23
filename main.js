///====================================================
// @param
//    cells [Node[]] : 
//   active [Node]   : 
class Board {
  constructor() {
    this.cells = document.querySelectorAll('button.index');
    this.active = null;
  }
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// @param
//   length [int] : 
//     last [int] : 
//      now [int] : 
//     next [int] : 
//    cond [Node] : 
class Condition {
  constructor() {
    this.length = 9;
    this.last = 1;
    this.now = 2;
    this.next = 3;

    this.cond = undefined;
  }
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// @param
//       level [int]       : 
//    levelMax [int]       : 
//      finish [int]       : 
//       board [Board]     : 
//   condition [Condition] : 
//        menu [Node]      : 
//        game [Node]      : 
//        tile [Node]      : 
//        cond [Node[]]    : 
//         ans [String]    : 
class GameFrame {
  constructor(config) {
    this.finish = 0;
    this.level = 0;
    this.levelMax = undefined;
    this.time = undefined;
    this.menuPos = 0;
    this.board = new Board(this);
    this.condition = new Condition(this);
    
    this.menu = document.querySelector('#main-menu');
    this.game = document.querySelector('#game-container');
    this.tile = undefined;
    this.cond = document.querySelectorAll('#condition');
    this.ans = null;
    this.diff = 0;
  }
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// function: theme_toggle (darkMode <> lightMode)
document.querySelector('#theme-toggle').addEventListener('click', ()=> {
  document.querySelector('#theme-toggle span').toggleAttribute('dark');
  document.querySelector('body').classList.toggle('dark');
})

const frame = new GameFrame({})
window.onload = function() {
  // save();
  gameMenu_init();
  gameBoard_init();
}