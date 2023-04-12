import { Actor, Color, DisplayMode, Engine, Loader } from "excalibur"
import { SampleActor } from "./SampleActor"
import { ethers } from "ethers"

class Game extends Engine {
  constructor() {
    super({ width: 400, height: 400, backgroundColor: new Color(10, 120, 26) });
  }

  async initialize() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    const blockNumber = await provider.getBlockNumber()

    const signer = provider.getSigner()

    console.log(blockNumber)

    await provider.send("eth_requestAccounts", []);

    this.add(new SampleActor(blockNumber, await signer.getAddress()));

    this.start()
  }
}

export const game = new Game();
game.initialize();