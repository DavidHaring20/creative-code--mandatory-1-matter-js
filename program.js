// Constants 
const backgroundColor = 'rgb(69, 61, 66)';
const particleColor = 'rgb(69, 61, 66)';
const particleOutlineColor = 'red'
const floorColor = 'black';
const particleWidth = 5;

// Modules 
const Body = Matter.Body;
const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
const Render = Matter.Render;
const World = Matter.World;
const Composite = Matter.Composite;
const Composites = Matter.Composites;
const Constraint = Matter.Constraint;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;

// Create an Engine
const engine = Engine.create();

// Create a Render 
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 1500,
        height: 700,
        wireframes: false,
        background: backgroundColor
    }
});

const floor = Bodies.rectangle(0, 650, 2200, 50, { 
    isStatic: true,
    density: 100,
    render: {
        fillStyle: floorColor,
    }
});

const wall1 = Bodies.rectangle(1100, 525, 200, 300, {
    isStatic: true,
    density: 100,
    render: {
        fillStyle: floorColor
    }
});

const wall2 = Bodies.rectangle(1100, 500, 200, 300, {
    isStatic: true,
    density: 100,
    render: {
        fillStyle: floorColor
    }
});

const wallLeft = Bodies.rectangle(-10, 0, 30, 1250, {
    isStatic: true,
    density: 100,
    render: {
        fillStyle: backgroundColor
    }
});

var group = Body.nextGroup(true);
        
var rope = Composites.stack(300, 100, 100, 2, 0, 0, function() {
    return Bodies.rectangle(100, 500, 50, 20, {
        friction: 0,
        density: 0.001,
        render: {
            fillStyle: particleColor, 
            strokeStyle: particleOutlineColor,
            lineWidth: particleWidth
        }
    });
});

Composites.chain(rope, 0.5, 0, -0.5, 0, { stiffness: 0.8, length: 1, render: { type: 'line' } });
Composite.add(rope, Constraint.create({ 
    bodyB: rope.bodies[0],
    pointB: { x: -25, y: 0 },
    pointA: { x: rope.bodies[0].position.x, y: rope.bodies[0].position.y },
    stiffness: 0.5
}));

// let box1 = Bodies.rectangle(400, 40, 150, 150);
// let box2 = Bodies.rectangle(450, 630, 150, 150);
// let box3 = Bodies.rectangle(220, 180, 150, 150);
// let box4 = Bodies.rectangle(520, 110, 150, 150);
// let box5 = Bodies.rectangle(370, 250, 150, 150);
// let box6 = Bodies.rectangle(1000, 100, 150, 150);
// , box1, box2, box3, box4, box5, box6 

let bodyMouse = Mouse.create(document.body.canvas);
let mouseOptions = {
    mouse: bodyMouse, 
    constraint: {
        render: {
            visible: false
        }
    }
}
let mouseConstraint = MouseConstraint.create(engine, mouseOptions)

// Add everything to the world
World.add(engine.world, [mouseConstraint, floor, wall1, wall2, wallLeft, rope]);

// Run an Engine
Engine.run(engine)

// Run the Render
Render.run(render);