function board_add_clickEvent() {
  frame.board.cells.forEach(element => {
    element.addEventListener('click', () => {
      if (frame.finish) return;
      if (frame.board.active != null) {
        frame.board.active.removeAttribute('focus');
      }
      if (frame.board.active === element) {
        frame.board.active = null;
        return;
      }
      frame.board.active = element;
      element.setAttribute('focus', "");
    })
  });
}

function homeIcon_add_clickEvent() {
  document.querySelector('#game-container i.fa-house')
  .addEventListener('click', () => {
    frame.game.removeAttribute('active');
    frame.menu.setAttribute('active', "");
    if (frame.board.active != null) {
      frame.board.active.removeAttribute('focus');
    }
    frame.board.active = null;
    frame.board.cells.forEach(element => {
      element.removeAttribute('success');
      element.innerHTML = "";
    });

    setTimeout(()=> {
      document.getElementById("screen").scrollTop = frame.menuPos;
    }, 50);
  });
}

function infoIcon_add_clickEvent() {
  document.querySelector('#game-container i.fa-circle-info')
  .addEventListener('click', () => {
    console.log(frame);
  });
}

function resetBtn_add_clickEvent() {
  document.querySelector('button.oper#reset')
  .addEventListener('click', () => {
    if (frame.finish) return;
    if (!confirm("確定清除")) return;
    if (frame.board.active != null) {
      frame.board.active.removeAttribute('focus');
    }
    frame.board.active = null;

    for (let i=0; i<3; i++) {
      setTimeout(()=> {
        frame.board.cells[3*i+0].setAttribute('flip', "x");
        frame.board.cells[3*i+1].setAttribute('flip', "x");
        frame.board.cells[3*i+2].setAttribute('flip', "x");
        frame.board.cells[3*i+0].innerHTML="";
        frame.board.cells[3*i+1].innerHTML="";
        frame.board.cells[3*i+2].innerHTML="";
      }, 250*(i+1));
    }
    setTimeout(()=> {
      frame.board.cells.forEach(element => {
        element.removeAttribute('flip');
      });
    }, 1000);
  });
}

function clearBtn_add_clickEvent() {
  document.querySelector('button.oper#clear')
  .addEventListener('click', () => {
    if (frame.finish) return;
    if (frame.board.active === null) return;
    frame.board.active.innerHTML = "";
  });
}

function finishBtn_add_clickEvent() {
  document.querySelector('button.oper#finish')
  .addEventListener('click', () => {
    if (frame.finish) return;
    let check = "";
    if (frame.board.active != null) {
      frame.board.active.removeAttribute('focus');
    }
    frame.board.active = null;
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
}

function condBtn_add_clickEvent() {
  document.querySelector('button#next-cond')
  .addEventListener('click', () => {
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

  document.querySelector('button#last-cond')
  .addEventListener('click', () => {    
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
}

function ans_wrong_effect() {
  frame.board.cells.forEach(element => {
    element.setAttribute('wrong', "");
  });
  setTimeout(()=> {
    frame.board.cells.forEach(element => {
      element.removeAttribute('wrong');
    });
  }, 500);
}
function ans_success_effect() {
  frame.time = new Date()-frame.time; //return ms
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
        frame.board.cells[3*i+j].setAttribute('success', "");
      }, 200*(i+j));
    }
  }
  frame.tile[frame.level-1].setAttribute('pass', "");
  console.log(frame.time);
}


function numBtn_add_clickEvent() {
  document.querySelectorAll('button.number')
  .forEach(element => {
    element.addEventListener('click', () => {
      if (frame.board.active === null) return;
      let keep = [];
      let temp = frame.board.active.getElementsByTagName('span');
      
      for (let i=0; i<temp.length; i++) {
        keep[i] = temp[i].id;
      }
      
      
      frame.board.active.innerHTML = "";
      
      if (keep.length == 0) {
        let tile = document.createElement("span");
        tile.id = element.id.toString();
        tile.textContent = element.id.toString();
        frame.board.active.appendChild(tile);
        return;
      }

      if (keep.indexOf(element.id) == -1) {
        keep.push(element.id);
      }
      else if (keep.length > 1) {
        keep = keep.filter(i => i != element.id.toString());
      }
      if (keep.filter(i => i != '').length == 0) return;

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






function boardIndex(span, code) {
  if (code == 1) { //star
    span.innerHTML = "<i class='fa-solid fa-star'></i>";
    return;
  }
  if (code == 2) { //X
    span.innerHTML = "<i class='fa-solid fa-xmark'></i>";
    return;
  }
  if (code == 3) { //none
    span.setAttribute('none', '');
    return;
  }
}

async function conditionCard_generator() {
  frame.condition.cond = undefined;
  frame.cond[0].innerHTML = 
  "<li class='cond' keep><div id='cond-text'>Keep</div><div id='cond-board'>\
  <span id='1' none></span><span id='2' none></span><span id='3' none></span><span id='4' none></span><span id='5' none>\
  </span><span id='8' none></span><span id='9' none></span></div></li>";
  frame.cond[1].innerHTML = ""

  try {
    const res = await fetch('./game/level/config_'+(frame.level)+'.json');
    const data = await res.json();  

    frame.ans = data["A"];
    frame.diff = data["diff"];
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
    
    document.getElementById("ans").innerHTML = frame.ans;
  }
  catch {
    alert('本關卡尚未完成，請回主選單');
  }
  frame.condition.cond = document.querySelectorAll('li.cond');
}


function gameBoard_init() {
  board_add_clickEvent();
  homeIcon_add_clickEvent();
  infoIcon_add_clickEvent();
  resetBtn_add_clickEvent();
  clearBtn_add_clickEvent();
  finishBtn_add_clickEvent();
  condBtn_add_clickEvent();
  numBtn_add_clickEvent();
}