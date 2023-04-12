import { Actor, Color, Vector, Text } from "excalibur"

export class SampleActor extends Actor {
  blockNumber: number
  address: string

  constructor(blockNumber: number, address: string) {
    super({
      pos: new Vector(200, 100),
      width: 300,
      height: 40,
      color: Color.Blue
    })

    this.blockNumber = blockNumber
    this.address = address
  }

  onInitialize() {
    const addressText = new Text({
      text: `address is ${this.address}`,
      color: Color.White
    })

    this.graphics.add(addressText)
  }
}
