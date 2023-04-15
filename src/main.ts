import { Actor, Color, DisplayMode, Engine, Loader, Scene } from "excalibur"
import { SampleActor } from "./SampleActor"
import { ethers } from "ethers"
import { ConnectButton } from "./ConnectButton";
import { Resources } from "./resources";
import { Farm } from "./Farm";
import { Crop } from "./Crops";

class Game extends Engine {
  constructor() {
    super({
      canvasElementId: "game",
      width: 400, height: 480, backgroundColor: Color.fromHex('9CFCF0')
    })
  }

  async initialize() {
    const titleScene = new Scene()
    const farmScene = new Scene()

    titleScene.add(new ConnectButton())
    farmScene.add(new Farm())

    farmScene.add(new Crop(100, 100))
    farmScene.add(new Crop(200, 100))
    farmScene.add(new Crop(300, 100))
    farmScene.add(new Crop(100, 200))
    farmScene.add(new Crop(200, 200))
    farmScene.add(new Crop(300, 200))
    farmScene.add(new Crop(100, 300))
    farmScene.add(new Crop(200, 300))
    farmScene.add(new Crop(300, 300))

    game.add('title', titleScene)
    game.add('farm', farmScene)

    const provider = new ethers.providers.Web3Provider(window.ethereum)

    const signer = provider.getSigner()

    const loader = new Loader([Resources.ConnectButton, Resources.Title, Resources.Farm, Resources.Crop1, Resources.Crop2])

    await this.start(loader)

    try {
      const address = await signer.getAddress()

      console.log(address)

      game.goToScene('farm')
    } catch (e) {
      game.goToScene('title')
    }
    //this.add(new SampleActor(blockNumber, await signer.getAddress()));
  }
}

export const game = new Game();
game.initialize()