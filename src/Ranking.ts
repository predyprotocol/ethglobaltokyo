import { BigNumber } from "ethers"
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
    this.graphics.add('crop2', Resources.Crop2.toSprite())
  }

  updateRanking(account: string, premium: BigNumber) {
    const text = new Text({
      text: `${this.n}. ${account}, 🍄x${premium.div(10000).toString()}`,
      color: Color.Black,
      font: new Font({ size: 14 }),
    })

    this.graphics.add(text)
    // this.graphics.show('crop2')
  }
}
