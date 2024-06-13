/* global Phaser */

// Copyright (c) 2024 Clara Tyman All rights reserved
//
// Created by: Clara
// Created on: May 2024
// This is the Menu Scene

class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: "menuScene" })

        this.menuSceneBackgroundImage = null
        this.menuSceneText = null
        this.menuSceneTextStyle = {
            font: "100px Times",
            fill: "#fde4b9",
            align: "center"
        }
        this.startButton = null
    }

    init(data) {
        this.cameras.main.setBackgroundColor("ffffff")
    }

    preload() {
        console.log("Menu Scene")
        this.load.image("menuSceneBackground", "./assets/menuSceneImage.png")
        this.load.image("startButton", "./assets/menu_button.png")
    }

    create(data) {
        this.menuSceneBackgroundImage = this.add.sprite(0, 0, "menuSceneBackground")
        this.menuSceneBackgroundImage.x = 1920 / 2
        this.menuSceneBackgroundImage.y = 1080 / 2

        this.startButton = this.add.sprite(1920 / 2, 1080 / 2 + 100, "startButton")
        this.startButton.setInteractive({ useHandCursor: true })
        this.startButton.on("pointerdown", () => this.clickButton())

        this.menuSceneText = this.add
            .text(1920 / 2, 1080 / 2 + 350, "Click to play", this.menuSceneTextStyle)
            .setOrigin(0.5)
    }

    update(time, delta) {
        // pass
    }

    clickButton() {
        this.scene.start("gameScene")
    }
}

export default MenuScene