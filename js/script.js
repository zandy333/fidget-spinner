
// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    World = Matter.World,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse;

let smallerLength;

if (window.innerWidth > window.innerHeight) {
    smallerLength = window.innerHeight;
} else {
    smallerLength = window.innerWidth;
}

let radius = 0.9 * smallerLength / 2;
let posX = window.innerWidth / 2;
let posY = window.innerHeight / 2;

//let stage = document.getElementById("container");
let stage = document.getElementById("container");

//Setup Matter JS
let engine = Matter.Engine.create();
// create a renderer
let render = Render.create({
    element: stage,
    engine: engine,
    options: {
	width: window.innerWidth,
	height: window.innerHeight,
	wireframes: false,
	/*background: '#2c5aa0',*/
    background: '#afe9dd'
    }
});

const spinnerImg = new Image(3000, 3000);
spinnerImg.src = "images/circle.png";

scaleFactor = 0.9 * smallerLength / spinnerImg.width;

let spinner = Bodies.circle(posX, posY, radius, { render: { sprite: { texture: "images/circle.png", xScale: scaleFactor, yScale: scaleFactor}}});

let constraint = Constraint.create({
    pointA: { x: posX, y: posY },
    bodyB: spinner
});

// add all of the bodies to the world
Composite.add(engine.world, [spinner, constraint]);

// add mouse control
let mouse = Mouse.create(render.stage);
let mouseConstraint = MouseConstraint.create(engine, {
    element: stage,
    constraint: {
         // allow bodies on mousedrag to rotate
         stiffness: 0.001,
         angularStiffness: 0.09,
         render: {
             visible: false //false
         }
    }
});

Composite.add(engine.world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;


// run the renderer
//Render.run(render);

// create runner
//var runner = Runner.create();

// run the engine
//Runner.run(runner, engine);

Engine.run(engine);
Render.run(render);	

/*
function handleResize() {
    //render.options.width = window.innerWidth;
    //render.options.height = window.innerHeight;

    render.stage.width = window.innerWidth;
    render.stage.height = window.innerHeight;

    let smallerLength;

if (window.innerWidth > window.innerHeight) {
    smallerLength = window.innerHeight;
} else {
    smallerLength = window.innerWidth;
}

let radius = 0.9 * smallerLength / 2;
let posX = window.innerWidth / 2;
let posY = window.innerHeight / 2;
Matter.Body.scale(spinner, radius * 2, radius * 2, [posX, posY])

}

window.addEventListener("resize", () => handleResize());
*/

window.onresize = function(){ location.reload(); } 
/* OR 
Save the state of each object on canvas and remove them from the canvas;
Add each object with the saved state, back to the resized canvas;
Not going to discuss it here, because that might be another complete tutorial;
*/
