/* global Phaser */

// Copyright (c) 2024 Clara Tyman All rights reserved
//
// Created by: Clara
// Created on: June 2024
// This is the Game Scene

class gameScene extends Phaser.Scene {
    constructor() {
        super({ key: "gameScene" })
        this.line = null
        this.score = 0
        this.scoreText = null
        this.scoreTextStyle = { font: '65px Ariel', fill: '#ffffff', align: 'center' }
        this.gameOverTextStyle = { font: '65px Ariel', fill: '#ff0000', align: 'center' }
    }

    init(data) {
        this.cameras.main.setBackgroundColor('#0x5f6e7a')
    }

    preload() {
        console.log("Game Scene")
        this.load.image("gameSceneImage", "./assets/gameSceneImage.jpg")
        this.load.image("line", "./assets/line.png")
        this.load.image("line2", "./assets/line2.png")
    }

    create(data) {
        // Game key input

        // this sets the background
        this.background = this.add.image(0, 0, "gameSceneImage").setScale(2.0)
        this.background.setOrigin(0, 0)

        // this shows the score counter
        this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle)

        // line group
        this.lineGroup = this.physics.add.group()
        this.line = this.physics.add.sprite(1920 / 2, 1080 - 100, "line")
        this.line2 = this.physics.add.sprite(1920 / 2, 1080 - 1000, "line2")
        this.line.scale = 0.5
        this.line2.scale = 0.5


        this.ball = this.physics.add.sprite(this.world.centerX, this.world.centerY, 'ball')
        this.physics.arcade.enable(this.ball)
        this.ball.body.velocity.set(-200, 0)
        this.ball.onLine = false
        this.ball.onLine2 = false
        this.ball.body.bounce.set(1)
        this.ball.body.collideWorldBounds = true
        //this.ball.anchor.setTo(0.5, 0.5)
    }

    update(time, delta) {
        // keyboard input, either arrows for line, wasd for line2
        this.moveLine()
        this.moveline2()
        this.ballCollision()

        if (this.ball.onLine) {
            this.ball.body.velocity.y = ((Math.random() * 50) + this.line.body.velocity.y)
            this.ball.body.velocity.x += (0.1) * this.ball.body.velocity.x
            this.ball.onLine = false
        }
        else if (this.ball.onLine2) {
            this.ball.body.velocity.y = ((Math.random() * 50) + this.line2.body.velocity.y)
            this.ball.body.velocity.x += (0.1) * this.ball.body.velocity.x
            this.ball.onLine2 = false
        }

        if (this.ball.x >= this.width) {
            this.ballLost()
        }
        else if (this.ball.x <= 0) {
            this.ballLost()
        }

        const keyLeftObj = this.input.keyboard.addKey('LEFT')
        const keyRightObj = this.input.keyboard.addKey('RIGHT')

        const keyAObj = this.input.keyboard.addKey('A')
        const keyDObj = this.input.keyboard.addKey('D')

        if (keyLeftObj.isDown === true) {
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
            this.line2.x -= 15
            if (this.line2.x < 0) {
                this.line2.x = 0
            }
        }

        if (keyDObj.isDown === true) {
            this.line2.x += 15
            if (this.line2.x > 1920) {
                this.line2.x = 1920
            }
        }

        ballCollision()
        this.ball.onLine = this.ball.onLine2 = false
        this.physics.arcade.collide(this.line, this.ball, function () { this.ball.onLine = true; }, null, this)
        this.physics.arcade.collide(this.line2, this.ball, function () { this.ball.onLine2 = true; }, null, this)

        ballLost()
        this.ball.reset(this.world.centerX, this.world.centerY)
        this.time.events.add(2000, function () { this.ball.body.velocity.set(-200, 0); }, this)
    }
}

export default gameScene