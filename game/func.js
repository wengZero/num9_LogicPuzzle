function ans_wrong_effect() {
  frame.board.cells.forEach(element => {
    element.classList.add('error-shake');
  });
  setTimeout(()=> {
    frame.board.cells.forEach(element => {
      element.classList.remove('error-shake');
    });
  }, 500);
}
function ans_success_effect() {
  /*
  (Animation: Flip from left-top to right button with 200ms delay)
  1 2 3
  2 3 4
  3 4 5
  */
  frame.finish = 1;
  for (let i=0; i<3; i++) {
    for(let j=0; j<3; j++) {
      setTimeout(()=> {
        frame.board.cells[3*i+j].classList.add('success');
      }, 200*(i+j));
    }
  }
  frame.tile[frame.level-1].setAttribute('pass', "");
  
}
function gameboard_Reset() {
  if (frame.board.active != null) {
    frame.board.active.removeAttribute('focus');
  }
  frame.board.active = null;
  frame.board.cells.forEach(element => {
    element.classList.remove('success');
    element.innerHTML = "";
  });
}



function add_clickEvent_Init() {
  
  //gameBoard: click -> [ focus <> release ]
  frame.board.cells.forEach(element => {
    element.addEventListener('click', () => {
      if (frame.finish) return;
      if (frame.board.active != null) {
        frame.board.active.removeAttribute('focus');
      }
      if (frame.board.active === element) { //click with same cell
        frame.board.active = null;
      }
      else { //click with other cell
        frame.board.active = element;
        element.setAttribute('focus', "");
      }
    });
  });

  //home: click -> goBack to Mune
  document.querySelector('#game-container i.fa-house').addEventListener('click', () => {
    frame.game.removeAttribute('active');
    frame.menu.setAttribute('active', "");

    gameboard_Reset();
  });

  //reset: click -> clear all number in all cells (all)
  document.querySelector('button.oper#reset').addEventListener('click', () => {
    if (frame.finish) return;
    if (frame.board.active != null) {
      frame.board.active.removeAttribute('focus');
      frame.board.active = null;
    }

    for (let i=0; i<3; i++) {
      setTimeout(()=> {
        frame.board.cells[3*i+0].classList.add('flip');
        frame.board.cells[3*i+1].classList.add('flip');
        frame.board.cells[3*i+2].classList.add('flip');
        frame.board.cells[3*i+0].innerHTML="";
        frame.board.cells[3*i+1].innerHTML="";
        frame.board.cells[3*i+2].innerHTML="";
      }, 250*(i+1));
    }
    setTimeout(()=> {
      frame.board.cells.forEach(element => {
        element.classList.remove('flip');
      });
    }, 1000);
  });

  //clear: click -> clear all number in 'focus' cell (only one)
  document.querySelector('button.oper#clear').addEventListener('click', () => {
    if (frame.finish) return;
    if (frame.board.active === null) return;
    frame.board.active.innerHTML = "";
  });

  //help: click -> jump out the game rule
  document.querySelector('#game-container i.fa-circle-info').addEventListener('click', () => {
    console.log(frame);
  });

  //finish: click -> check gameBoard is correct
  document.querySelector('button.oper#finish').addEventListener('click', () => {
    if (frame.finish) return;
    let check = "";
    if (frame.board.active !== null) {
      frame.board.active.removeAttribute('focus');
      frame.board.active = null;
    }
    frame.board.cells.forEach(element => {
      if (element.childNodes.length != 1) return;
      check += element.childNodes[0].innerHTML;
    });


    if (check == frame.ans) {
      ans_success_effect();
    }
    else {
      // ans_success_effect();
      ans_wrong_effect();
    }
  });

  //Next: click -> flip next condition card
  document.querySelector('button#next-cond').addEventListener('click', () => {
    if (frame.condition.cond === undefined) frame.condition.cond = document.querySelectorAll('li.cond');

    let newNext = frame.condition.next+1 > frame.condition.length ? 1 : frame.condition.next+1;
    frame.condition.cond[newNext].setAttribute('next', '');
    frame.condition.cond[frame.condition.now].setAttribute('last', '');
    frame.condition.cond[frame.condition.now].removeAttribute('now');
    frame.condition.cond[frame.condition.next].setAttribute('now', '');
    frame.condition.cond[frame.condition.next].removeAttribute('next');
    frame.condition.cond[frame.condition.last].removeAttribute('last');

    frame.condition.last = frame.condition.now;
    frame.condition.now = frame.condition.next;
    frame.condition.next = newNext;
  });
  //Last: click -> flip last condition card
  document.querySelector('button#last-cond').addEventListener('click', () => {
    if (frame.condition.cond === undefined) frame.condition.cond = document.querySelectorAll('li.cond');
    
    let newLast = frame.condition.last-1 == 0 ? frame.condition.length : frame.condition.last-1;
    frame.condition.cond[newLast].setAttribute('last', '');
    frame.condition.cond[frame.condition.now].setAttribute('next', '');
    frame.condition.cond[frame.condition.now].removeAttribute('now');
    frame.condition.cond[frame.condition.last].setAttribute('now', '');
    frame.condition.cond[frame.condition.last].removeAttribute('last');
    frame.condition.cond[frame.condition.next].removeAttribute('next');

    frame.condition.next = frame.condition.now;
    frame.condition.now = frame.condition.last;
    frame.condition.last = newLast;
  });

  //number: click -> fill number into 'focus' cell
  document.querySelectorAll('button.number').forEach(element => {
    element.addEventListener('click', () => {
      if (frame.board.active === null) return;
      let keep = [];
      let temp_num = frame.board.active.getElementsByTagName('span');
      
      for (let i=0; i<temp_num.length; i++) {
        if (temp_num[i].id == '') continue;
        keep[i] = temp_num[i].id;
      }
      
      
      frame.board.active.innerHTML = "";
      if (keep.length == 0) {
        let tile = document.createElement("span");
        tile.id = element.id.toString();
        tile.textContent = element.id.toString();
        frame.board.active.appendChild(tile);
        return;
      }

      if (keep.indexOf(element.id) > -1 && keep.length > 1) {
        keep = keep.filter(index => index != element.id.toString());
      }
      else {
        keep.push(element.id);
      }
      for (let i=1; i<=9; i++) {
        let tile = document.createElement("span");
        if (keep.includes(i.toString())) {
          tile.id = i.toString();
          tile.textContent = i.toString();
        }
        frame.board.active.appendChild(tile);
      }
    });
  });
}



function gameBoard_init() {
  add_clickEvent_Init();
}



function conditionCard_generator() {
  frame.cond[0].innerHTML = 
  "<li class='cond' keep><div id='cond-text'>Keep</div><div id='cond-board'>\
  <span id='1' none></span><span id='2' none></span><span id='3' none></span><span id='4' none></span><span id='5' none>\
  </span><span id='8' none></span><span id='9' none></span></div></li>";
  frame.cond[1].innerHTML = ""

  fetch('./game/level/config_'+(frame.level)+'.json').then(res => res.json())
  .then(data => {
    frame.ans = data["A"];
    document.getElementById("ans").innerHTML = data["A"];
    
    frame.condition.last = 1;
    frame.condition.now = 2;
    frame.condition.next = 3;
    for(let i in data) {
      if (i == 'A') break;
      let li = document.createElement("li");
      li.className = 'cond';
      let div_1 = document.createElement("div");
      div_1.id = 'cond-text'
      div_1.innerHTML = data[i].text.toString();
      let div_2 = document.createElement("div");
      div_2.id = 'cond-board'
      if (i==1) li.setAttribute('last', '')
      if (i==2) li.setAttribute('now', '')
      if (i==3) li.setAttribute('next', '')
      frame.condition.length = i;
      for (let j=1; j<=9; j++) {
        let span = document.createElement("span");
        span.id = j.toString();
        
        boardIndex(span, data[i].board[j-1]);

        div_2.appendChild(span);
      }
      li.appendChild(div_1);
      li.appendChild(div_2);

      frame.cond[0].appendChild(li);
      frame.cond[1].insertBefore(li.cloneNode(true), frame.cond[1].childNodes[i-2]);
    }
  })
  .catch(err => alert('關卡尚未完成'));
}

const map = {"star":1, "x-mark":2, "none":3, "triangle":4};
function boardIndex(span, code) {
  if (code == map["star"]) {
    span.innerHTML = "<i class='fa-solid fa-star'></i>";
    return;
  }

  if (code == map["x-mark"]) {
    span.innerHTML = "<i class='fa-solid fa-xmark'></i>";
    return;
  }

  if (code == map["triangle"]) {
    span.innerHTML = "<i class='fa-solid fa-triangle'></i>";
    return;
  }

  if (code == map["none"]) {
    span.setAttribute('none', '');
    return;
  }
}