var game = {
  level: 6,
  interval: 5000,
  interval_hp: 10,
  HP: 5,
  r: null,
  c: null,
  timer: null,
  timer2: null,
  reset(){
    game.r = null;
    game.c = null;
    game.HP = 5;
    game.interval = 5000;
    game.level = 6;
    clearInterval(game.timer);
    game.timer = null;
    clearInterval(game.timer2);
    game.timer2 = null;
    var pre = document.getElementById('pre');
    pre.value = 100;
    var start = document.getElementById('start');
    start.addEventListener('click', game.time);
    start.addEventListener('click', game.start);
    var hp = document.getElementById('HP');
    hp.style.left = 0;
    this.updataView();
    var gameover = document.getElementById('gameover');
    gameover.style.display = "none";
  },
  start(){
    game.HP = 5;
    game.interval = 5000;
    game.level = 6;
    clearInterval(game.timer);
    game.timer = null;
    var HP = document.getElementById('HP');
    HP.style.left = 0;
    game.updataView();
    game.change();
     //定时改变答案
    game.timer2 = setInterval(game.change, game.interval);
    game.time();
    var start = document.getElementById('start');
    start.removeEventListener('click', game.time);
    start.removeEventListener('click', game.start);
  },
  updataView(){
    var html = ""
    for (var r = 0; r <= this.level; r++) {
      html += "<div class='row'>"
      for (var c = 0; c <= this.level; c++) {
        html += "<div id=" + 't' + r + c + " class='col'><img src='before.png'></div>"
      }
      html += "</div>"
    }
    level.innerHTML = this.level - 5;
    main.innerHTML = html;
    if (document.documentElement.clientHeight - 140 >= document.documentElement.clientWidth) {
      main.style.width = parseFloat((document.documentElement.clientWidth - 20)) + "px";
      main.style.height = parseFloat((document.documentElement.clientWidth - 20)) + "px";
    } else {
      main.style.width = parseFloat((document.documentElement.clientHeight - 140)) + "px";
      main.style.height = parseFloat((document.documentElement.clientHeight - 140)) + "px";
    }
    var col=document.getElementsByClassName("col");
    for(var i=0;i<col.length;i++){
      col[i].style.width=100/(game.level+1)+"%";
      col[i].parentElement.style.height=100/(game.level+1)+"%";
    }
  },
  change(){
    var g = game.pass;
    if (game.r != null) {
      var parent2 = document.getElementById("t" + game.r + game.c);
      parent2.innerHTML = "<img src='before.png'>";
      parent2.removeEventListener("click", g);
    }
    game.r = Math.floor(Math.random() * (game.level + 1));
    game.c = Math.floor(Math.random() * (game.level + 1));
    console.log("t" + game.r + game.c)
    var parent = document.getElementById("t" + game.r + game.c);
    parent.addEventListener("click", g);
    parent.innerHTML = "<img src='later.png'>";
  },
  pass(){
    //重置定时器2
    clearInterval(game.timer2);
    if (game.interval > 3000) {
      game.interval -= 500;
    }
    game.timer2 = setInterval(game.change, game.interval);
    //重置定时器1
    clearInterval(game.timer);
    if (game.interval_hp > 5) {
      game.interval_hp -= 0.5;
    }
    game.time();
    var g = game.pass
    var parent1 = document.getElementById("t" + game.r + game.c)
    parent1.innerHTML = "<img src='later.png'>";
    parent1.removeEventListener("click", g);
    game.level += 1;
    game.updataView();
    game.change();
  },
  time(){
    var pre = document.getElementById('pre');
    var i = 100;
    game.timer = setInterval(function () {
      pre.value = i;
      i -= 0.1;
      if (i < 0) {
        if (game.HP > 1) {
          i = 100;
          game.HP--;
          var HP = document.getElementById('HP');
          HP.style.left = -(5 - game.HP) * 19 + "px";

        } else {
          var HP = document.getElementById('HP');
          HP.style.left = -5 * 19 + "px";
          clearInterval(game.timer);
          game.timer = null;
          clearInterval(game.timer2);
          game.timer2 = null;
          var gameover = document.getElementById('gameover');
          var go_level = document.getElementById('go_level');
          go_level.innerHTML = game.level - 6;
          gameover.style.display = "block";
        }
      }
    },game.interval_hp)
  }
}
window.onresize= function () {
  game.updataView();
}
game.reset();