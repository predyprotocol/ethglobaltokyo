import { Actor, Color, Vector, Text, Sprite } from "excalibur"

export class ReturnButton extends Actor {
  cb: () => void

  constructor(cb: () => void) {
    super({
      pos: new Vector(360, 20),
      width: 300,
      height: 40,
    })

    this.cb = cb
  }

  onInitialize() {
    const text = new Text({
      text: 'Return',
      color: Color.Black
    })

    this.graphics.add(text)

    this.on('pointerup', async () => {
      this.cb()
    })
  }
}
