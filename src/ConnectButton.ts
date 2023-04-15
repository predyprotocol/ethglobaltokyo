import { ethers } from "ethers"
import { Actor, Color, Vector, Text, Sprite } from "excalibur"
import { Resources } from "./resources"

export class ConnectButton extends Actor {
  cb: () => void

  constructor(cb: () => void) {
    super({
      pos: new Vector(200, 340),
      width: 300,
      height: 40,
    })
    this.cb = cb
  }

  onInitialize() {
    this.graphics.add(Resources.ConnectButton.toSprite())

    this.on('pointerup', async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      await provider.send("eth_requestAccounts", []);

      this.cb()

    })
  }
}
