/* global Phaser */

// Copyright (c) 2024 Clara Tyman All rights reserved
//
// Created by: Clara
// Created on: June 2024
// This is the Game Scene

class GameScene extends Phaser.Scene {
    createball() {
        const ballXLocation = Math.floor(Math.random() * 1920) + 1
        let ballXVelocity = Math.floor(Math.random() * 50) + 1
        ballXVelocity *= Math.round(Math.random()) ? 1 : -1
        const anball = this.physics.add.sprite(ballXLocation, -100, 'ball')
        anball.body.velocity.y = 200
        anball.body.velocity.x = ballXVelocity
    }

    constructor() {
        super({ key: "gameScene" })

        this.line = null
        this.line2 = null
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
        this.load.image('ball', './assets/ball.png')
    }

    create(data) {
        this.background = this.add.image(0, 0, "gameSceneImage").setScale(2.0)
        this.background.setOrigin(0, 0)

        this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle)

        // line group
        this.lineGroup = this.physics.add.group()
        this.line = this.physics.add.sprite(1920 / 2, 1080 - 100, "line")
        this.line2 = this.physics.add.sprite(1920 / 2, 1080 - 1000, "line2")
        this.line.scale = 0.5
        this.line2.scale = 0.5

        this.createball()
        this.ball = function () {
            // Assign image's width, height to vars
            var img_width = img.width
            var img_height = img.height
        }

        // Handle line-Ball collisions
        if (this.ball.x - this.ball.width <= this.line.x && this.ball.x >= this.line.x - this.line.width) {
            if (this.ball.y <= this.line.y + this.line.height && this.ball.y + this.ball.height >= this.line.y) {
                this.ball.x = (this.line.x + this.ball.width)
                this.ball.moveX = DIRECTION.RIGHT
            }
        }

        // Handle line2-ball collision
        if (this.ball.x - this.ball.width <= this.line2.x && this.ball.x >= this.line2.x - this.line2.width) {
            if (this.ball.y <= this.line2.y + this.line2.height && this.ball.y + this.ball.height >= this.line2.y) {
                this.ball.x = (this.line2.x - this.ball.width)
                this.ball.moveX = DIRECTION.LEFT
            }
        }
    }

    update(time, delta) {
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
    }
}

export default GameScene