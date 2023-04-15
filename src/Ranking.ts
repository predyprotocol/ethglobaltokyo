import { Actor, Color, Vector, Text, Sprite, Font } from "excalibur"
import { Resources } from "./resources"

export class Ranking extends Actor {
  text: Text
  n: number

  constructor(n: number) {
    super({
      pos: new Vector(200, 100 + n * 40),
      width: 300,
      height: 40,
    })

    this.n = n
  }

  onInitialize() {
    const text = new Text({
      text: '???',
      color: Color.Black,
      font: new Font({ size: 30 }),
    })

    this.graphics.add(text)
    this.text = text

    this.graphics.add('crop2', Resources.Crop2.toSprite())
  }

  updateRanking(account: string) {
    const text = new Text({
      text: `${this.n}. $${account}`,
      color: Color.Black,
      font: new Font({ size: 30 }),
    })

    this.graphics.add(text)
  }
}
