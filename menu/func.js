function tile_add_clickEvent(tile) {
  tile.addEventListener('click', () => {
    frame.finish = 0;
    frame.level = tile.textContent;
    conditionCard_generator();

    document.getElementById("level-info").innerHTML = "Lv."+frame.level;
    frame.menu.removeAttribute('active');
    frame.game.setAttribute('active', "");
    
    frame.time = new Date();
    frame.menuPos = document.getElementById("screen").scrollTop;
    document.getElementById("screen").scrollTop = 0;
  });
}

function infoIcon_add_clickEvent() {
  document.querySelector('#main-menu i.fa-circle-info')
  .addEventListener('click', () => {
    console.log(frame);
  });
}

function logIn_add_changeEvent() {
  document.querySelector('input#custom-name')
  .addEventListener('change', async (self) => {
    const res = await fetch(
      dbURL+'?playerName='+self.target.value+'&maxLevel='+frame.levelMax
    );
    const data = await res.json();

    if (data['result'] == "fail") return;
    if (data['result'] == "error") return;
    for (let i=0,j=0; i<data['pass'].length; i++) {
      if (data['pass'][i]=="") continue;
      setTimeout(()=> {
        frame.tile[i].setAttribute('pass', "");
      }, 100*j);
      j++;
    }
  })
}



async function gameMenu_init() {
  const res = await fetch('./game/level/config_0.json');
  const data = await res.json();

  frame.levelMax = data['level'];
  for (let i=0; i<frame.levelMax; i++) {
    let tile = document.createElement("div");
    tile.id = (i+1).toString();
    tile.classList.add("level-bar");
    tile_add_clickEvent(tile);
    tile.textContent = (i+1).toString();
    document.getElementById("level-menu").appendChild(tile);
  }
  frame.tile = document.querySelector('#level-menu').childNodes;

  infoIcon_add_clickEvent();
  logIn_add_changeEvent();
}