/* global Phaser */

// Copyright (c) 2024 Clara Tyman All rights reserved
//
// Created by: Clara
// Created on: June 2024
// This is the Game Scene

constructor() 
    ({ key: "gameScene" })

    this.line = null
    this.score = 0
    this.scoreText = null
    this.scoreTextStyle = { font: '65px Ariel', fill: '#ffffff', align: 'center' }
    this.gameOverTextStyle = { font: '65px Ariel', fill: '#ff0000', align: 'center' }


init(data) 
    this.cameras.main.setBackgroundColor('#0x5f6e7a')


    preload() 
        console.log("Game Scene")

        this.load.image("gameSceneImage", "./assets/gameSceneImage.jpg")
        this.load.image("line", "./assets/line.png")

    create(data) 
        // Game key input
        game.physics.startSystem(Phaser.Physics.ARCADE)

        // this sets the background
        this.background = this.add.image(0, 0, "gameSceneImage").setScale(2.0)
        this.background.setOrigin(0, 0)

        // this shows the score counter
        this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle)

        game.physics.arcade.checkCollision.right = false
        game.physics.arcade.checkCollision.left = false

        // Load player
        this.player = game.add.sprite(30, game.world.centerY, 'line')
        this.player.anchor.setTo(0.5, 0.5)
        this.player.scale.x = 0.55
        this.player.scale.y = 0.25
        game.physics.arcade.enable(this.player)
        this.player.body.collideWorldBounds = true
        this.player.body.immovable = true

        // Load player2 
        this.player2 = game.add.sprite(WINDOW_WIDTH - 30, game.world.centerY, 'line')
        this.player2.anchor.setTo(0.5, 0.5)
        this.player2.scale.x = 0.55
        this.player2.scale.y = 0.25
        game.physics.arcade.enable(this.player2)
        this.player2.body.collideWorldBounds = true
        this.player2.body.immovable = true

        this.ball = game.add.sprite(game.world.centerX, game.world.centerY, 'ball')
        game.physics.arcade.enable(this.ball)
        this.ball.body.velocity.set(-200, 0)
        this.ball.onLinePlayer = false
        this.ball.onLinePlayer2 = false
        this.ball.body.bounce.set(1)
        this.ball.body.collideWorldBounds = true
        //this.ball.anchor.setTo(0.5, 0.5)

    update(time, delta)
        // keyboard input, either arrows for player, wasd for player2
        this.movePlayer()
        this.moveplayer2()
        this.ballCollision()

        if (this.ball.onLinePlayer) {
            this.ball.body.velocity.y = ((Math.random() * 50) + this.player.body.velocity.y)
            this.ball.body.velocity.x += (0.1) * this.ball.body.velocity.x
            this.ball.onLinePlayer = false
        }
        else if (this.ball.onLinePlayer2) {
            this.ball.body.velocity.y = ((Math.random() * 50) + this.player2.body.velocity.y)
            this.ball.body.velocity.x += (0.1) * this.ball.body.velocity.x
            this.ball.onLinePlayer2 = false
        }

        if (this.ball.x >= game.width) {
            this.ballLost()
        }
        else if (this.ball.x <= 0) {
            this.ballLost()
        }


    const keyLeftObj = this.input.keyboard.addKey('LEFT')
    const keyRightObj = this.input.keyboard.addKey('RIGHT')

    const keyAObj = this.input.keyboard.addKey('A')
    const keyDObj = this.input.keyboard.addKey('D')

    if(keyLeftObj.isDown === true) {
        this.line.x -= 15
        if (this.line.x < 0) {
    this.line.x = 0
}
    }

if (keyRightObj.isDown === true) {
    this.line.x += 15
    if (this.line.x > 1920) {
        this.line.x = 1920
    }
}

if (keyAObj.isDown === true) {
    this.line.x -= 15
    if (this.line.x < 0) {
        this.line.x = 0
    }
}

if (keyDObj.isDown === true) {
    this.line.x += 15
    if (this.line.x > 1920) {
        this.line.x = 1920
    }
}

ballCollision() 
    this.ball.onLinePlayer = this.ball.onLinePlayer2 = false
    game.physics.arcade.collide(this.player, this.ball, function () { this.ball.onLinePlayer = true; }, null, this)
    game.physics.arcade.collide(this.player2, this.ball, function () { this.ball.onLinePlayer2 = true; }, null, this)

ballLost()
    this.ball.reset(game.world.centerX, game.world.centerY)
    game.time.events.add(2000, function () { this.ball.body.velocity.set(-200, 0); }, this)