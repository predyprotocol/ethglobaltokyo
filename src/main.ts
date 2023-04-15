import { Actor, Color, DisplayMode, Engine, Loader, Scene } from "excalibur"
import { SampleActor } from "./SampleActor"
import { ethers } from "ethers"
import { ConnectButton } from "./ConnectButton";
import { Resources } from "./resources";
import { Farm } from "./Farm";
import { Crop } from "./Crops";
import { FarmButton } from "./FarmButton";
import { HarvestButton } from "./HarvestButton";

class Game extends Engine {
  crops: Crop[] = []

  constructor() {
    super({
      canvasElementId: "game",
      width: 400, height: 480, backgroundColor: Color.fromHex('9CFCF0')
    })
  }

  async initialize() {
    const titleScene = new Scene()
    const emptyScene = new Scene()
    const farmScene = new Scene()

    titleScene.add(new ConnectButton())
    emptyScene.add(new FarmButton())
    farmScene.add(new Farm())

    const cropPositions = [{
      x: 100,
      y: 100
    }, {
      x: 200,
      y: 100
    }, {
      x: 300,
      y: 100
    }, {
      x: 100,
      y: 200
    }, {
      x: 200,
      y: 200
    }, {
      x: 300,
      y: 200
    }, {
      x: 100,
      y: 300
    }, {
      x: 200,
      y: 300
    }, {
      x: 300,
      y: 300
    }]

    for (let i = 0; i < 9; i++) {
      const crop = new Crop(cropPositions[i].x, cropPositions[i].y)
      this.crops.push(crop)
      farmScene.add(crop)
    }

    farmScene.add(new HarvestButton())

    game.add('title', titleScene)
    game.add('farm', farmScene)

    const provider = new ethers.providers.Web3Provider(window.ethereum)

    const signer = provider.getSigner()

    const loader = new Loader([Resources.ConnectButton, Resources.FarmingButton, Resources.HarvestButton, Resources.Title, Resources.Farm, Resources.Crop1, Resources.Crop2])

    await this.start(loader)

    try {
      const address = await signer.getAddress()

      console.log(address)

      game.goToScene('farm')
    } catch (e) {
      game.goToScene('title')
    }

    this.crops[0].updateState(1)
  }
}

export const game = new Game();
game.initialize()