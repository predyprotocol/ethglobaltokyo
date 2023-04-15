import { ethers } from "ethers"
import { Actor, Color, Vector, Text, Sprite } from "excalibur"
import { Resources } from "./resources"

export class HarvestButton extends Actor {

  constructor() {
    super({
      pos: new Vector(200, 420),
      width: 300,
      height: 40,
    })
  }

  onInitialize() {
    this.graphics.add(Resources.FarmingButton.toSprite())

    this.on('pointerup', async () => {
      // create isolated vault
    })
  }
}
