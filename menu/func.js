function tile_add_clickEvent(tile) {
  tile.addEventListener('click', () => {
    frame.condition.cond = undefined
    frame.level = tile.textContent;
    frame.finish = 0;
    conditionCard_generator();
    document.getElementById("level-info").innerHTML = "Lv."+frame.level;
    frame.menu.removeAttribute('active');
    frame.game.setAttribute('active', "");
  });
}


function gameMenu_init() {
  fetch('./game/level/config_0.json').then(res => res.json())
  .then(data => {
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
  });
}