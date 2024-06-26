/* global Phaser */

// Copyright (c) 2024 Clara Tyman All rights reserved
//
// Created by: Clara Tyman
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
        this.load.image("ball", "./assets/ball.png")
        this.load.image("paddleTop", "./assets/paddle.png")
        this.load.image("paddleBottom", "./assets/paddle.png")
    }

    create(data) {

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

        // ball
        this.ball = this.physics.add.image(1920 / 2, 1080 / 2, 'ball')
        this.ball.body.velocity.set(75, this.BALL_SPEED)
        this.ball.scale = 0.2
        this.ball.body.setMass(1)
        // this.ball.setData('paddleTop', true)
        // this.ball.setData('paddleBottom', true)

        //  Our colliders
        this.physics.add.collider(this.ball, this.paddleTop, this.hitPaddleTop, null, this);
        this.physics.add.collider(this.ball, this.paddleBottom, this.hitPaddleBottom, null, this);

        }

    update(time, delta) {

        // key functions
        const keyLeftObj = this.input.keyboard.addKey('LEFT')
        const keyRightObj = this.input.keyboard.addKey('RIGHT')

        const keyAObj = this.input.keyboard.addKey('A')
        const keyDObj = this.input.keyboard.addKey('D')

        // key mouvements
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

        // game boarders
        if (this.ball.body.x < 0) {
            this.ball.body.x = 5
            this.ball.body.velocity.x = (-1) * this.ball.body.velocity.x
        }

        if (this.ball.body.x > 1920) {
            this.ball.body.x = 1915
            this.ball.body.velocity.x = (-1) * this.ball.body.velocity.x
        }

        if (this.ball.body.y < 0) {
            this.ball.body.reset(1920 / 2, 1080 / 2)
            this.ball.body.velocity.set(75, this.BALL_SPEED)
            this.ball.scale = 0.2
            this.ball.body.setMass(1)
            this.physics.pause()
            this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game Over!\nClick to play again.', this.gameOverTextStyle).setOrigin(0.5)
            this.gameOverText.setInteractive({ useHandCursor: true })
            this.gameOverText.on('pointerdown', () => this.scene.start('gameScene'))
            this.score = 0
        }

        if (this.ball.body.y > 1080) {
            this.ball.body.reset(1920 / 2, 1080 / 2)
            this.ball.body.velocity.set(75, this.BALL_SPEED)
            this.ball.scale = 0.2
            this.ball.body.setMass(1)
            this.physics.pause()
            this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game Over!\nClick to play again.', this.gameOverTextStyle).setOrigin(0.5)
            this.gameOverText.setInteractive({ useHandCursor: true })
            this.gameOverText.on('pointerdown', () => this.scene.start('gameScene'))
            this.score = 0
            
        }
    }

    // ball and paddle collisons
    hitPaddleTop (ball, topPaddle) {
        console.log("Hit top paddle")
        this.paddleTop.body.velocity.set(0, 0)
        let difference = this.paddleTop.x - this.ball.x
        this.ball.body.velocity.y = this.BALL_SPEED
        this.ball.body.setVelocityX(-5 * difference)
        this.score = this.score + 1
        this.scoreText.setText('Score: ' + this.score.toString())
    }

    hitPaddleBottom (ball, bottomPaddle) {
        console.log("Hit bottom paddle")
        this.paddleBottom.body.velocity.set(0, 0)
        let difference = this.paddleBottom.x - this.ball.x
        this.ball.body.velocity.y = (-1) * this.BALL_SPEED
        this.ball.body.setVelocityX(-5 * difference)
        this.score = this.score + 1
        this.scoreText.setText('Score: ' + this.score.toString())
    }

}
export default gameScene