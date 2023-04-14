import { Actor, Color, DisplayMode, Engine, Loader } from "excalibur"
import { SampleActor } from "./SampleActor"
import { ethers } from "ethers"
import { ConnectButton } from "./ConnectButton";
import { Resources } from "./resources";
import { Farm } from "./Farm";

class Game extends Engine {
  constructor() {
    super({ width: 400, height: 480, backgroundColor: new Color(156, 252, 240) });
    // 9CFCF0
  }

  async initialize() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    const signer = provider.getSigner()

    try {
      const address = await signer.getAddress()

      console.log(address)

      this.add(new Farm());
    } catch (e) {
      this.add(new ConnectButton());
    }
    //this.add(new SampleActor(blockNumber, await signer.getAddress()));

    const loader = new Loader([Resources.ConnectButton, Resources.Title, Resources.Farm])

    this.start(loader)
  }
}

export const game = new Game();
game.initialize();