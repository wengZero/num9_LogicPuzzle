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
}