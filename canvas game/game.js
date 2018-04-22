window.onload = function() {
 
    // Get the canvas and context
    var canvas = document.getElementById("viewport"); 
    var context = canvas.getContext("2d");
    
  
    var lastframe = 0;
    var fpstime = 0;
    var framecount = 0;
    var fps = 0;
    
    // Levelssss
    var level = {
        x: 1,
        y: 65,
        width: canvas.width - 2,
        height: canvas.height - 66
    };
    
    var square = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        xdir: 0,
        ydir: 0,
        speed: 0
    }
    
    var score = 0;

    function init() {
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mouseup", onMouseUp);
        canvas.addEventListener("mouseout", onMouseOut);

        square.width = 40;
        square.height = 40;
        square.x = level.x + (level.width - square.width) / 2;
        square.y = level.y + (level.height - square.height) / 2;
      
        
      
        score = 0;
    
        main(0);
    }
    
    function main(tframe) {
 
        window.requestAnimationFrame(main);
    
        update(tframe);
        render();
    }
    

    function update(tframe) {
        var dt = (tframe - lastframe) / 1000;
        lastframe = tframe;
        
    
        updateFps(dt);
        
        // Move the square
        square.x += dt * square.speed * square.xdir;
        square.y += dt * square.speed * square.ydir;
        

        if (square.x <= level.x) {
            // Left 
            square.xdir = 1;
            square.x = level.x;
        } else if (square.x + square.width >= level.x + level.width) {
            // Right 
            square.xdir = -1;
            square.x = level.x + level.width - square.width;
        }
        
  
        if (square.y <= level.y) {
            // Top 
            square.ydir = 1;
            square.y = level.y;
        } else if (square.y + square.height >= level.y + level.height) {
            // Bottom 
            square.ydir = -1;
            square.y = level.y + level.height - square.height;
        }
    }
    
    function updateFps(dt) {
        if (fpstime > 0.25) {
            fps = Math.round(framecount / fpstime);
            
    
            fpstime = 0;
            framecount = 0;
        }
        
        fpstime += dt;
        framecount++;
    }
    
    // Render the game
    function render() {
        // Draw the frame
        drawFrame();
        
        // Draw the square
        context.fillStyle = "#ff4d4d";
        context.fillRect(square.x, square.y, square.width, square.height);
        
        
    }

    // Draw a frame with a border
    function drawFrame() {
        // Draw background and a border
        context.fillStyle = "#d0d0d0";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#99c2ff";
        context.fillRect(1, 1, canvas.width-2, canvas.height-2);
    }
    
    // Mouse event handlers
    function onMouseMove(e) {}
    
    function onMouseDown(e) {
        // Get the mouse position
        var pos = getMousePos(canvas, e);
        
        // Check if we clicked the square
        if (pos.x >= square.x && pos.x < square.x + square.width &&
            pos.y >= square.y && pos.y < square.y + square.height) {
            
            // Increase the score
            score += 1;
            span = document.getElementById("score1");
            span.innerHTML = score+ " points";
            
            // Increase the speed of the square by 10 percent
            square.speed *= 2.0;
            
            // Give the square a random position
            square.x = Math.floor(Math.random()*(level.x+level.width-square.width));
            square.y = Math.floor(Math.random()*(level.y+level.height-square.height));
            
        }
    }
    
    function onMouseUp(e) {}
    function onMouseOut(e) {}
    
    // Get the mouse position
    function getMousePos(canvas, e) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: Math.round((e.clientX - rect.left)/(rect.right - rect.left)*canvas.width),
            y: Math.round((e.clientY - rect.top)/(rect.bottom - rect.top)*canvas.height)
        };
    }
    
    // Call init to start the game
    init();
       (function(){
  var counter = 10;

  setInterval(function() {
    counter--;
    if (counter >= 0) {
      spane = document.getElementById("count");
      spane.innerHTML = "Time is " + counter + " sec" ;
    }
    // Display 'counter' wherever you want to display it.
    if (counter === 0) {
        spane.innerHTML = "The game is over! Please click to start new one";
        span.innerHTML = "Your final score is " + score;
        clearInterval(counter);

    }

  }, 1000);

})();
};
function myFunction() {
    location.reload();
}

