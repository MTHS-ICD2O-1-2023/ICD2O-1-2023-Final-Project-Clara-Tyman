/* global Phaser */

// Copyright (c) 2024 Clara Tyman All rights reserved
//
// Created by: Clara
// Created on: June 2024
// This is the Game Scene

class gameScene extends Phaser.Scene {

    constructor() {
        super({ key: "gameScene" })
        this.BALL_SPEED= 250
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
        // this.load.image("line", "./assets/line.png")
        // this.load.image("line2", "./assets/line2.png")
        this.load.image("ball", "./assets/ball.png")
        this.load.image("paddleTop", "./assets/paddle.png")
        this.load.image("paddleBottom", "./assets/paddle.png")
    }

    create(data) {
        //  Enable world bounds, but disable the floor
        this.physics.world.setBoundsCollision(0, 0, 1920, 1080, 32, false, false, true, true);

        // Game key input

        // this sets the background
        this.background = this.add.image(0, 0, "gameSceneImage").setScale(2.0)
        this.background.setOrigin(0, 0)

        // this shows the score counter
        this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle)

        // paddles
        this.paddleTop = this.physics.add.image(1920 / 2, 1080 - 1000, "paddleTop")
        this.paddleTop.scale = 0.4
        this.paddleTop.body.setMass(99999999)
        this.paddleBottom = this.physics.add.image(1920 / 2, 1080 - 100, "paddleBottom")
        this.paddleBottom.scale = 0.4
        this.paddleBottom.body.setMass(99999999)

        this.ball = this.physics.add.image(1920 / 2, 1080 / 2, 'ball')
        this.ball.body.velocity.set(75, this.BALL_SPEED)
        this.ball.scale = 0.2
        this.ball.body.setMass(1)
        this.ball.body.collideWorldBounds = true
        // this.ball.setData('paddleTop', true)
        // this.ball.setData('paddleBottom', true)

        //  Our colliders
        this.physics.add.collider(this.ball, this.paddleTop, this.hitPaddleTop, null, this);
        this.physics.add.collider(this.ball, this.paddleBottom, this.hitPaddleBottom, null, this);
    }

    update(time, delta) {

        const keyLeftObj = this.input.keyboard.addKey('LEFT')
        const keyRightObj = this.input.keyboard.addKey('RIGHT')

        const keyAObj = this.input.keyboard.addKey('A')
        const keyDObj = this.input.keyboard.addKey('D')

        if (keyLeftObj.isDown === true) {
            this.paddleBottom.x -= 15
            if (this.paddleBottom.x < 0) {
                this.paddleBottom.x = 0
            }
        }

        if (keyRightObj.isDown === true) {
            this.paddleBottom.x += 15
            if (this.paddleBottom.x > 1920) {
                this.paddleBottom.x = 1920
            }
        }

        if (keyAObj.isDown === true) {
            this.paddleTop.x -= 15
            if (this.paddleTop.x < 0) {
                this.paddleTop.x = 0
            }
        }

        if (keyDObj.isDown === true) {
            this.paddleTop.x += 15
            if (this.paddleTop.x > 1920) {
                this.paddleTop.x = 1920
            }
        }
    }

    hitPaddleTop (ball, topPaddle) {
        console.log("Hit top paddle")
        this.paddleTop.body.velocity.set(0, 0)
        let difference = this.paddleTop.x - this.ball.x
        this.ball.body.velocity.y = this.BALL_SPEED
        this.ball.body.setVelocityX(-5 * difference)
    }

    hitPaddleBottom (ball, bottomPaddle) {
        console.log("Hit bottom paddle")
        this.paddleBottom.body.velocity.set(0, 0)
        let difference = this.paddleBottom.x - this.ball.x
        this.ball.body.velocity.y = (-1) * this.BALL_SPEED
        this.ball.body.setVelocityX(-5 * difference)
    }
}
export default gameScene