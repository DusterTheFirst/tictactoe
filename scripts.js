var torender = {
    tl: document.getElementById("tl"),
    tm: document.getElementById("tm"),
    tr: document.getElementById("tr"),
    
    ml: document.getElementById("ml"),
    mm: document.getElementById("mm"),
    mr: document.getElementById("mr"),

    bl: document.getElementById("bl"),
    bm: document.getElementById("bm"),
    br: document.getElementById("br"),
    
    turnelm: document.getElementById("turn")
};

var turn = "";

//for (key in grid) {
//    console.log(`${key}:${grid[key].dataset.state}`);
//}

getturn();

setInterval(render, render()); 

function xo(clicked) {
    var preturn = turn;
    if (clicked.dataset.state != "" || turn == "") 
        return;
    
    clicked.dataset.state = turn;
    
    if(turn == "X") 
        turn = "O";
    else
        turn = "X";
    
    if(wincheck(preturn, clicked.id))
        win(preturn);
}

function win(state){
    turn = "";
    $("#win").text(`${state} Wins`);
    $("#tictactoe #hide").addClass("show");
}

function reset() {
    for (key in torender) {
        torender[key].dataset.state = "";
    }
    getturn();
    $("win").text("");
    $("#tictactoe #hide").removeClass("show");
}

function getturn() {
    var a = Math.round(Math.random()*10) + 1;
    switch (a % 2) {
        case 0:
            turn = "O";
            break;
        case 1:
            turn = "X";
            break;
    }
}

function wincheck(state, id){
    //console.log(state);
    //console.log(id);
    switch (id) {
        case "tl":
            return (torender["tl"].dataset.state == state &&
                    torender["tm"].dataset.state == state &&
                    torender["tr"].dataset.state == state) 
                   ||
                   (torender["tl"].dataset.state == state &&
                    torender["ml"].dataset.state == state && 
                    torender["bl"].dataset.state == state) 
                   ||
                   (torender["tl"].dataset.state == state &&
                    torender["mm"].dataset.state == state &&
                    torender["br"].dataset.state == state);
        case "tm":
            return (torender["tl"].dataset.state == state &&
                    torender["tm"].dataset.state == state &&
                    torender["tr"].dataset.state == state)
                   ||
                   (torender["tm"].dataset.state == state &&
                    torender["mm"].dataset.state == state && 
                    torender["bm"].dataset.state == state);
        case "tr":
            return (torender["tl"].dataset.state == state &&
                    torender["tm"].dataset.state == state &&
                    torender["tr"].dataset.state == state) 
                   ||
                   (torender["tr"].dataset.state == state &&
                    torender["mr"].dataset.state == state && 
                    torender["br"].dataset.state == state) 
                   ||
                   (torender["tr"].dataset.state == state &&
                    torender["mm"].dataset.state == state &&
                    torender["bl"].dataset.state == state);;
        case "ml":
            return (torender["tl"].dataset.state == state &&
                    torender["ml"].dataset.state == state &&
                    torender["bl"].dataset.state == state)
                   ||
                   (torender["ml"].dataset.state == state &&
                    torender["mm"].dataset.state == state && 
                    torender["mr"].dataset.state == state);
        case "mm":
            return (torender["tl"].dataset.state == state &&
                    torender["mm"].dataset.state == state &&
                    torender["br"].dataset.state == state)
                   ||
                   (torender["ml"].dataset.state == state &&
                    torender["mm"].dataset.state == state && 
                    torender["mr"].dataset.state == state)
                   ||
                   (torender["tm"].dataset.state == state &&
                    torender["mm"].dataset.state == state && 
                    torender["bm"].dataset.state == state)
                   ||
                   (torender["tr"].dataset.state == state &&
                    torender["mm"].dataset.state == state && 
                    torender["bl"].dataset.state == state)
        case "mr":
            return (torender["tr"].dataset.state == state &&
                    torender["mr"].dataset.state == state &&
                    torender["br"].dataset.state == state)
                   ||
                   (torender["ml"].dataset.state == state &&
                    torender["mm"].dataset.state == state && 
                    torender["mr"].dataset.state == state);
        case "bl":
            return (torender["tl"].dataset.state == state &&
                    torender["ml"].dataset.state == state &&
                    torender["bl"].dataset.state == state)
                   ||
                   (torender["bl"].dataset.state == state &&
                    torender["bm"].dataset.state == state &&
                    torender["br"].dataset.state == state)
                   ||
                   (torender["bl"].dataset.state == state &&
                    torender["mm"].dataset.state == state && 
                    torender["tr"].dataset.state == state);
        case "bm":
            return (torender["bl"].dataset.state == state &&
                    torender["bm"].dataset.state == state &&
                    torender["br"].dataset.state == state)
                   ||
                   (torender["tm"].dataset.state == state &&
                    torender["mm"].dataset.state == state && 
                    torender["bm"].dataset.state == state);
        case "br":
            return (torender["tl"].dataset.state == state &&
                    torender["mm"].dataset.state == state &&
                    torender["br"].dataset.state == state)
                   ||
                   (torender["bl"].dataset.state == state &&
                    torender["bm"].dataset.state == state && 
                    torender["br"].dataset.state == state)
                   ||
                   (torender["tr"].dataset.state == state &&
                    torender["mr"].dataset.state == state && 
                    torender["br"].dataset.state == state);
    }
}

function render(){
    torender["turnelm"].dataset.state = turn;
    
    var key;
    for (key in torender) {
        var working = torender[key];
        var state = working.dataset.state;
        var ctx = working.getContext("2d");

        ctx.lineWidth = working.width /10;
        ctx.imageSmoothingEnabled= false
        
        ctx.clearRect(0, 0, working.width, working.height);
        
        switch (state) {
            case "X":
                ctx.beginPath();
                ctx.moveTo(working.width / 10,working.height / 10);
                ctx.lineTo(working.width - (working.width / 10), working.height - (working.height / 10));
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(working.width - (working.width / 10), working.height / 10);
                ctx.lineTo(working.width / 10, working.height - (working.height / 10));
                ctx.stroke();
                break;
            case "O":
                ctx.beginPath();
                drawEllipse(ctx, working.width /10, working.height /10, working.width - (2 * (working.width / 10)), working.height - (2 * (working.height / 10)));
                ctx.stroke();
                break;
            default:
                break;
        }
    }
}

function drawEllipse(ctx, x, y, w, h) {
  var kappa = .5522848,
      ox = (w / 2) * kappa, // control point offset horizontal
      oy = (h / 2) * kappa, // control point offset vertical
      xe = x + w,           // x-end
      ye = y + h,           // y-end
      xm = x + w / 2,       // x-middle
      ym = y + h / 2;       // y-middle

  ctx.beginPath();
  ctx.moveTo(x, ym);
  ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
  ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
  ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
  ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
  //ctx.closePath(); // not used correctly, see comments (use to close off open path)
  ctx.stroke();
}