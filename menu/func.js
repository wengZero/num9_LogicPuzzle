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
  for (let i=0; i<100; i++) {
    let tile = document.createElement("div");
    tile.id = (i+1).toString();
    tile.classList.add("level-bar");
    tile_add_clickEvent(tile);
    tile.textContent = (i+1).toString();
    document.getElementById("level-menu").appendChild(tile);
  }
}