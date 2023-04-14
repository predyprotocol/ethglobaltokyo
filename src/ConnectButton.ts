import { ethers } from "ethers"
import { Actor, Color, Vector, Text, Sprite } from "excalibur"
import { Resources } from "./resources"

export class ConnectButton extends Actor {

  constructor() {
    super({
      pos: new Vector(200, 320),
      width: 300,
      height: 40,
    })
  }

  onInitialize() {
    this.graphics.add(Resources.ConnectButton.toSprite())

    this.on('pointerup', async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      const blockNumber = await provider.getBlockNumber()

      const signer = provider.getSigner()

      console.log(blockNumber)

      await provider.send("eth_requestAccounts", []);

    })
  }
}
