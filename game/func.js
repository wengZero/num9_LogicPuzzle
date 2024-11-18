function add_clickEvent_Init() {
  
  //gameBoard: click -> [ focus <> release]
  frame.board.cells.forEach(element => {
    element.addEventListener('click', () => {
      if (frame.board.active != null) {
        frame.board.active.removeAttribute('focus');
      }
      if (frame.board.active === element) {
        frame.board.active = null;
      }
      else {
        frame.board.active = element;
        element.setAttribute('focus', "");
      }
    })
  });

  //home: click -> goBack to Mune
  document.querySelector('#game-container i.bxs-home').addEventListener('click', () => {
    frame.game.removeAttribute('active');
    frame.menu.setAttribute('active', "");
    if (frame.board.active != null) {
      frame.board.active.removeAttribute('focus');
      frame.board.active = null;

      frame.condition.value = 1;

    }
    frame.board.cells.forEach(element => {
      element.innerHTML = "";
    });
  });

  //reset: click -> clear all number in all cells (all)
  document.querySelector('button.oper#reset').addEventListener('click', () => {
    frame.board.cells.forEach(element => {
      element.innerHTML = "";
    });
    frame.board.active.removeAttribute('focus');
    frame.board.active = null;
  });

  //clear: click -> clear all number in 'focus' cell (only one)
  document.querySelector('button.oper#clear').addEventListener('click', () => {
    if (frame.board.active === null) return;
    frame.board.active.innerHTML = "";
  });

  //help: click -> jump out the game rule
  document.querySelector('#game-container i.bxs-help-circle').addEventListener('click', () => {
    console.log(frame);
  });

  //finish: click -> check gameBoard is correct
  document.querySelector('button.oper#finish').addEventListener('click', () => {
    let check = "";
    console.log(frame.board.cells);
    console.log(frame.board.cells[0].childNodes);
    frame.board.cells.forEach(element => {
      if (element.childNodes.length != 1) return;
      check += element.childNodes[0].innerHTML;
    });
    console.log(check);
    if (check == frame.ans) {
      alert('success');
    }
    else {
      alert('error');
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
      

      if (keep.indexOf(element.id) > -1) {
        keep = keep.filter(index => index != element.id.toString());
      }
      else {
        keep.push(element.id);
      }
      
      frame.board.active.innerHTML = "";
      if (keep.length == 1) {
        let tile = document.createElement("span");
        tile.id = keep[0].toString();
        tile.textContent = keep[0].toString();
        frame.board.active.appendChild(tile);
      }
      else {
        for (let i=1; i<=9; i++) {
          let tile = document.createElement("span");
          if (keep.includes(i.toString())) {
            tile.id = i.toString();
            tile.textContent = i.toString();
          }
          frame.board.active.appendChild(tile);
        }
      }
    });
  });
}



function gameBoard_init() {
  add_clickEvent_Init();
}



function conditionCard_generator() {
  fetch('./game/level/config_'+(frame.level)+'.json').then(res => res.json())
  .then(data => {
    frame.cond.innerHTML = 
      "<li class='cond' keep><div id='cond-text'>Keep</div><div id='cond-board'>\
      <span id='1' none></span><span id='2' none></span><span id='3' none></span><span id='4' none></span><span id='5' none>\
      </span><span id='8' none></span><span id='9' none></span></div></li>";
    frame.ans = data["A"];
    
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
        
        switch (data[i].board[j-1]) {
          case 1:
            span.innerHTML = "<i class='bx bxs-star'></i>";
            break;
          case 2:
            span.innerHTML = "<i class='bx bx-x'></i>";
            break;
          default:
            break;
        }
        div_2.appendChild(span);
      }
      li.appendChild(div_1);
      li.appendChild(div_2);

      frame.cond.appendChild(li);
    }
  });
}