import { ethers } from "ethers"
import { Actor, Color, Vector, Text, Sprite } from "excalibur"
import { Resources } from "./resources"

export class Title extends Actor {

  constructor() {
    super({
      pos: new Vector(200, 180),
      width: 300,
      height: 40,
    })
  }

  onInitialize() {
    this.graphics.add(Resources.Title.toSprite())
  }
}
