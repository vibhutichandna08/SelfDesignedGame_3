var bellSound;
var pinkCyclist, pinkCyclistAnimation1, pinkCyclistAnimation2;
var yellowCyclist, yellowCyclistAnimation1, yellowCyclistAnimation2;
var redCyclist, redCyclistAnimation1, redCyclistAnimation2;
var boyCyclist, boyCyclistAnimation1, boyCyclistAnimation2;
var roadImage, road;
var obstacle1, obstacle2, obstacle3;
var distance = 0;
var pinkCyclistGroup, yellowCyclistGroup, redCyclistGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver, gameOverImage;
var cyclist = 0;

function preload() {
    bellSound = loadSound("sound/bell.mp3");

    roadImage = loadImage("images/Road.png");

    boyCyclistAnimation1 = loadAnimation("images/mainPlayer1.png", "images/mainPlayer2.png");
    boyCyclistAnimation2 = loadAnimation("images/mainPlayer3.png");

    pinkCyclistAnimation1 = loadAnimation("images/opponent1.png", "images/opponent2.png");
    pinkCyclistAnimation2 = loadAnimation("images/opponent3.png");

    yellowCyclistAnimation1 = loadAnimation("images/opponent4.png", "images/opponent5.png");
    yellowCyclistAnimation2 = loadAnimation("images/opponent6.png");

    redCyclistAnimation1 = loadAnimation("images/opponent7.png", "images/opponent8.png");
    redCyclistAnimation2 = loadAnimation("images/opponent9.png");

    obstacle1 = loadImage("images/obstacle1.png");
    obstacle2 = loadImage("images/obstacle2.png");
    obstacle3 = loadImage("images/obstacle3.png");

    gameOverImage = loadImage("images/gameOver.png");
}

function setup() {
    createCanvas(1200, 200);

    road = createSprite(600, 100);
    road.addImage("road", roadImage);
    road.velocityX = -4;
    road.x = road.width / 2;

    boyCyclist = createSprite(90, 120);
    boyCyclist.addAnimation("moving", boyCyclistAnimation1);
    boyCyclist.addAnimation("collided", boyCyclistAnimation2);
    boyCyclist.scale = 0.08;

    gameOver = createSprite(500, 100);
    gameOver.addImage("gameOver", gameOverImage);
    gameOver.scale = 0.5;

    boyCyclist.setCollider("circle", 0, 0, 800);
    //boyCyclist.debug = true;

    pinkCyclistGroup = new Group();
    yellowCyclistGroup = new Group();
    redCyclistGroup = new Group();
}

function draw() {
    background("aqua");
    if (gameState === PLAY) {
        distance = distance + Math.round(getFrameRate() / 50);

        road.velocityX = -(6 + 2 * distance / 150);

        gameOver.visible = false;

        if (road.x < 0) {
            road.x = road.width / 2;
        }

        var rand = Math.round(random(1, 3));

        if (frameCount % 250 === 0) {
            switch (rand) {
                case 1: loadPinkCyclist();
                    break;
                case 2: loadYellowCyclist();
                    break;

                case 3: loadRedCyclist();
                    break;
            }
        }

        boyCyclist.y = mouseY;

        if (keyDown("space")) {
            bellSound.play();
            boyCyclist.x = boyCyclist.x + 10;
        }
    }

    if (pinkCyclistGroup.isTouching(boyCyclist)
        || yellowCyclistGroup.isTouching(boyCyclist)
        || redCyclistGroup.isTouching(boyCyclist)) {

        gameState = END;

        if (pinkCyclistGroup.isTouching(boyCyclist)) {
            cyclist = 1;
        }

        if (redCyclistGroup.isTouching(boyCyclist)) {
            cyclist = 2;
        }

        if (yellowCyclistGroup.isTouching(boyCyclist)) {
            cyclist = 3;
        }
    }

    if (gameState === END) {
        boyCyclist.changeAnimation("collided", boyCyclistAnimation2);

        pinkCyclistGroup.setVelocityXEach(0);
        yellowCyclistGroup.setVelocityXEach(0);
        redCyclistGroup.setVelocityXEach(0);

        //pinkCyclistGroup.changeAnimationEach("collided", pinkCyclistAnimation2);
        //yellowCyclistGroup.changeAnimationEach("collided", yellowCyclistAnimation2);
        //redCyclistGroup.changeAnimationEach("collided", redCyclistAnimation2);

        //pinkCyclistGroup.destroyEach();
        //yellowCyclistGroup.destroyEach();
        //redCyclistGroup.destroyEach();

        gameOver.visible = true;

        road.velocityX = 0;

        switch (cyclist) {
            case 1:
                for (var i = 0; i < pinkCyclistGroup.length; i++) {
                    pinkCyclistGroup[i].velocityX = 0;
                    pinkCyclistGroup[i].changeAnimation("collided");
                }
                break;

            case 2:
                for (var i = 0; i < redCyclistGroup.length; i++) {
                    redCyclistGroup[i].velocityX = 0;
                    redCyclistGroup[i].changeAnimation("collided");
                }
                break;

            case 3:
                for (var i = 0; i < yellowCyclistGroup.length; i++) {
                    yellowCyclistGroup[i].velocityX = 0;
                    yellowCyclistGroup[i].changeAnimation("collided");
                }
        }

    }

    drawSprites();

    fill(255);
    text("Distance : " + distance, 50, 20);
}

function loadPinkCyclist() {
    pinkCyclist = createSprite(1000, 100);
    pinkCyclist.addAnimation("moving", pinkCyclistAnimation1);
    pinkCyclist.addAnimation("collided", pinkCyclistAnimation2);
    pinkCyclist.scale = 0.08;
    pinkCyclist.y = Math.round(random(75, 150));
    pinkCyclist.velocityX = -(6 + 2 * distance / 150);
    pinkCyclist.lifetime = 1000;

    boyCyclist.depth = pinkCyclist.depth + 1;

    pinkCyclistGroup.add(pinkCyclist);
}

function loadYellowCyclist() {
    yellowCyclist = createSprite(1000, 100);
    yellowCyclist.addAnimation("moving", yellowCyclistAnimation1);
    yellowCyclist.addAnimation("collided", yellowCyclistAnimation2);
    yellowCyclist.scale = 0.08;
    yellowCyclist.y = Math.round(random(75, 150));
    yellowCyclist.velocityX = -(6 + 2 * distance / 150);
    yellowCyclist.lifetime = 1000;

    boyCyclist.depth = yellowCyclist.depth + 1;

    yellowCyclistGroup.add(yellowCyclist);
}

function loadRedCyclist() {
    redCyclist = createSprite(1000, 100);
    redCyclist.addAnimation("moving", redCyclistAnimation1);
    redCyclist.addAnimation("collided", redCyclistAnimation2);
    redCyclist.scale = 0.08;
    redCyclist.y = Math.round(random(75, 150));
    redCyclist.velocityX = -(6 + 2 * distance / 150);
    redCyclist.lifetime = 1000;
    boyCyclist.depth = redCyclist.depth + 1;

    redCyclistGroup.add(redCyclist);
}