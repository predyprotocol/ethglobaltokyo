import { Actor, Color, DisplayMode, Engine, Loader, Scene } from "excalibur"
import { SampleActor } from "./SampleActor"
import { ethers } from "ethers"
import { ConnectButton } from "./ConnectButton";
import { Resources } from "./resources";
import { Farm } from "./Farm";
import { Crop } from "./Crops";
import { FarmButton } from "./FarmButton";
import { HarvestButton } from "./HarvestButton";
import { Controller } from "./contracts/controller";
import { BASE_MARGIN_AMOUNT } from "./constants";

class Game extends Engine {
  crops: Crop[] = []

  constructor() {
    super({
      canvasElementId: "game",
      width: 400, height: 480, backgroundColor: Color.fromHex('9CFCF0')
    })
  }

  async initialize() {
    const controller = await Controller.initialize()

    const titleScene = new Scene()
    const emptyScene = new Scene()
    const farmScene = new Scene()

    titleScene.add(new ConnectButton())
    emptyScene.add(new FarmButton(controller))
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

    game.add('title', titleScene)
    game.add('empty', emptyScene)
    game.add('farm', farmScene)

    const provider = new ethers.providers.Web3Provider(window.ethereum)

    const signer = provider.getSigner()

    const loader = new Loader([Resources.ConnectButton, Resources.FarmingButton, Resources.HarvestButton, Resources.Title, Resources.Farm, Resources.Crop1, Resources.Crop2])

    await this.start(loader)


    // 

    const vaultStatus = await controller.getVaultStatusWithAddress()

    console.log(vaultStatus[1])

    try {
      if (vaultStatus[1].length === 0) {
        game.goToScene('empty')
      } else {
        const vaultId = vaultStatus[1][0][0]

        farmScene.add(new HarvestButton(controller, vaultId))

        const value = vaultStatus[1][0][2]

        game.goToScene('farm')

        if (value.gt(BASE_MARGIN_AMOUNT)) {
          const profit = value.sub(BASE_MARGIN_AMOUNT)
          const index = profit.div('500000').toNumber()

          for (let i = 0; i < 9; i++) {
            if (i < index) {
              this.crops[i].updateState(1)
            }
          }
        } else
          if (value.lt(BASE_MARGIN_AMOUNT)) {
            const loss = value.sub(BASE_MARGIN_AMOUNT).mul(-1)
            const index = loss.div('500000').toNumber()

            for (let i = 0; i < 9; i++) {
              if (i < index) {
                this.crops[i].updateState(-1)
              }
            }
          }

      }
    } catch (e) {
      console.log(e)
      game.goToScene('title')
    }

    // this.crops[0].updateState(1)
  }
}

export const game = new Game();
game.initialize()