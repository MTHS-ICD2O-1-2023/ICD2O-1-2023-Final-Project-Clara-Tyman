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
        this.load.image("ball", "./assets/ball.png")
        this.load.image("paddle", "./assets/paddle.png")
    }

    create(data) {
        // Game key input

        // this sets the background
        this.background = this.add.image(0, 0, "gameSceneImage").setScale(2.0)
        this.background.setOrigin(0, 0)

        // this shows the score counter
        this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle)

        // line group
        // this.lineGroup = this.physics.add.group()
        // this.line = this.physics.add.sprite(1920 / 2, 1080 - 100, "line")
        // this.line.immovable = true;
        // this.line2 = this.physics.add.sprite(1920 / 2, 1080 - 1000, "line2")
        // this.line2.immovable = true;
        // this.line.scale = 0.4
        // this.line2.scale = 0.4

        // paddles
        this.paddleTop = this.physics.add.sprite(1920 / 2, 1080 - 100, "paddle")
        this.paddleTop.scale = 0.4
        this.paddleBottom = this.physics.add.sprite(1920 / 2, 1080 - 100, "paddle")
        this.paddleBottom.scale = 0.4        

        this.ball = this.physics.add.sprite(1920 / 2, 1080 / 2, 'ball')
        this.ball.body.velocity.set(60, 280)
        this.ball.scale = 0.2
        // this.ball.line = false
        // this.ball.line2 = false
        this.ball.body.bounce.set(1)
        this.ball.body.collideWorldBounds = true
    }

    update(time, delta) {
        // keyboard input, either arrows for line, wasd for line2
        //this.ballCollision()

        // if (this.ball.line) {
        //     this.ball.body.velocity.y = ((Math.random() * 50) + this.line.body.velocity.y)
        //     this.ball.body.velocity.x += (0.1) * this.ball.body.velocity.x
        //     this.ball.line = false
        // }
        // else if (this.ball.Line2) {
        //     this.ball.body.velocity.y = ((Math.random() * 50) + this.line2.body.velocity.y)
        //     this.ball.body.velocity.x += (0.1) * this.ball.body.velocity.x
        //     this.ball.line2 = false
        // }

        // if (this.ball.x >= this.width) {
        //     this.ballLost()
        // }
        // else if (this.ball.x <= 0) {
        //     this.ballLost()
        // }

        const keyLeftObj = this.input.keyboard.addKey('LEFT')
        const keyRightObj = this.input.keyboard.addKey('RIGHT')

        const keyAObj = this.input.keyboard.addKey('A')
        const keyDObj = this.input.keyboard.addKey('D')

        if (keyLeftObj.isDown === true) {
            this.paddleTop.x -= 15
            if (this.paddleTop.x < 0) {
                this.paddleTop.x = 0
            }
        }

        if (keyRightObj.isDown === true) {
            this.paddleTop.x += 15
            if (this.paddleTop.x > 1920) {
                this.paddleTop.x = 1920
            }
        }

        if (keyAObj.isDown === true) {
            this.paddleBottom.x -= 15
            if (this.paddleBottom.x < 0) {
                this.paddleBottom.x = 0
            }
        }

        if (keyDObj.isDown === true) {
            this.paddleBottom.x += 15
            if (this.paddleBottom.x > 1920) {
                this.paddleBottom.x = 1920
            }
        }

        this.physics.add.collider(this.line, this.ball, function (lineCollide, ballCollide) {
            //this.physics.pause()
            //this.ball.bounce(true)
            //this.ball.body.setVelocity.y = this.ball.body.velocity.y * (-1)
            //this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game Over!\nClick to play again.', this.gameOverTextStyle).setOrigin(0.5)
            //this.gameOverText.setInteractive({ useHandCursor: true })
            //this.gameOverText.on('pointerdown', () => this.scene.start('gameScene'))
        }.bind(this))
    }

    ballLost() {
        this.ball.reset(1920 / 2, 1080 / 2)
        this.time.events.add(2000, function () { this.ball.body.velocity.set(30, 200); }, this)
    }
}
export default gameScene