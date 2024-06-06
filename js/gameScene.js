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
        this.ball.add(anball)
    }

    constructor() {
        super({ key: "gameScene" })

        this.line = null
        this.firemissile = false
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
        this.load.image('missile', './assets/missile.jpg')
        this.load.image('ball', './assets/ball.png')
    }

    create(data) {
        this.background = this.add.image(0, 0, "gameSceneImage").setScale(2.0)
        this.background.setOrigin(0, 0)

        this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle)

        this.line = this.physics.add.sprite(1920 / 2, 1080 - 100, "line")
        this.line.scale = 0.5
        // missile group
        this.missileGroup = this.physics.add.group()

        this.ball.scale = 0.5
        this.createball()

        // Collisions between missiles and balls
        this.physics.add.collider(this.missileGroup, this.ball, function (missileCollide, ballCollide) {
            ballCollide.destroy()
            missileCollide.destroy()
            this.score = this.score + 1
            this.scoreText.setText('Score: ' + this.score.toString())
            this.createball()
            this.createball()
        }.bind(this))

        this.physics.add.collider(this.line, this.ball, function (lineCollide, ballCollide) {
            this.physics.pause()
            ballCollide.destroy()
            lineCollide.destroy()
            this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game Over!\nClick to play again.', this.gameOverTextStyle).setOrigin(0.5)
            this.gameOverText.setInteractive({ useHandCursor: true })
            this.gameOverText.on('pointerdown', () => this.scene.start('gameScene'))
        }.bind(this))
    }

    update(time, delta) {
        const keyLeftObj = this.input.keyboard.addKey('LEFT')
        const keyRightObj = this.input.keyboard.addKey('RIGHT')
        const keySpaceObj = this.input.keyboard.addKey('SPACE')

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

        if (keySpaceObj.isDown === true) {
            if (this.firemissile === false) {
                this.firemissile = true
                const aNewmissile = this.physics.add.sprite(this.line.x, this.line.y, 'missile')
                this.missileGroup.add(aNewmissile)
            }
        }

        if (keySpaceObj.isUp === true) {
            this.firemissile = false
        }

        this.missileGroup.children.each(function (item) {
            item.y = item.y - 15
            if (item.y < 0) {
                item.destroy()
            }
        })
    }
}

export default GameScene