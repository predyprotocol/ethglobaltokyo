import { Actor, Color, Vector, Text, Sprite } from "excalibur"
import { Resources } from "./resources"

export class Crop extends Actor {

  constructor(x: number, y: number) {
    super({
      pos: new Vector(x, y),
      width: 50,
      height: 50,
    })
  }

  updateState(state: number) {
    if (state === 0) {
      this.graphics.show('crop1')
      this.graphics.hide('crop2')
    }
    else if (state === 1) {
      this.graphics.hide('crop1')
      this.graphics.show('crop2')
    }
    else if (state === -1) {
      this.graphics.hide('crop1')
      this.graphics.hide('crop2')
    }
  }

  onInitialize() {
    this.graphics.add('crop1', Resources.Crop1.toSprite())
    this.graphics.add('crop2', Resources.Crop2.toSprite())
    this.updateState(0)
  }
}
