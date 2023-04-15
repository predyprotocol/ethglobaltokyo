import { ethers } from "ethers"
import { Actor, Color, Vector, Text, Sprite } from "excalibur"
import { Controller } from "./contracts/controller"
import { Resources } from "./resources"

export class FarmButton extends Actor {
  controller: Controller

  constructor(controller: Controller) {
    super({
      pos: new Vector(200, 420),
      width: 300,
      height: 40,
    })

    this.controller = controller
  }

  onInitialize() {
    this.graphics.add(Resources.FarmingButton.toSprite())

    this.on('pointerup', async () => {
      // create isolated vault

      // this.controller.openIsolatedVault('100000000', 2, {})
    })
  }
}
