import { Color, Engine, Loader, Scene, Timer } from "excalibur"
import { ConnectButton } from "./ConnectButton";
import { Resources } from "./resources";
import { Farm } from "./Farm";
import { Crop } from "./Crops";
import { FarmButton } from "./FarmButton";
import { HarvestButton } from "./HarvestButton";
import { Controller } from "./contracts/controller";
import { BASE_MARGIN_AMOUNT } from "./constants";
import { RankingButton } from "./RankingButton";
import { Ranking } from "./Ranking";
import { ReturnButton } from "./ReturnButton";
import { GQLClient } from "./gql/client";

class Game extends Engine {
  crops: Crop[] = []
  controller: Controller
  rankings: Ranking[] = []

  constructor() {
    super({
      canvasElementId: "game",
      width: 400, height: 480, backgroundColor: Color.fromHex('9CFCF0')
    })
  }

  async initialize() {
    this.controller = await Controller.initialize()

    const titleScene = new Scene()
    const emptyScene = new Scene()
    const farmScene = new Scene()
    const rankingScene = new Scene()

    titleScene.add(new ConnectButton())
    emptyScene.add(new FarmButton(this.controller))
    farmScene.add(new Farm())
    farmScene.add(new RankingButton(() => {
      game.goToScene('ranking')
    }))
    rankingScene.add(new ReturnButton(() => {
      game.goToScene('farm')
    }))

    this.rankings.push(new Ranking(1))
    this.rankings.push(new Ranking(2))
    this.rankings.push(new Ranking(3))

    rankingScene.add(this.rankings[0])
    rankingScene.add(this.rankings[1])
    rankingScene.add(this.rankings[2])

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
    game.add('ranking', rankingScene)

    const loader = new Loader([Resources.ConnectButton, Resources.FarmingButton, Resources.HarvestButton, Resources.Title, Resources.Farm, Resources.Crop1, Resources.Crop2])

    await this.start(loader)

    // 

    try {
      const vaultStatus = await this.controller.getVaultStatusWithAddress()

      if (vaultStatus[1].length === 0) {
        game.goToScene('empty')
      } else {
        const vaultId = vaultStatus[1][0][0]

        farmScene.add(new HarvestButton(this.controller, vaultId))

        const value = vaultStatus[1][0][2]
        const premium = vaultStatus[1][0][6][0][3]

        game.goToScene('farm')

        if (premium.gt(0)) {
          const profit = premium.sub(0)
          console.log(profit.toString())
          const index = profit.div('10000').toNumber()

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

      const timer = new Timer({
        fcn: () => {
          console.log(1)
          this.updateFarm()
        },
        repeats: true,
        interval: 15000,
      })

      game.currentScene.add(timer)

      timer.start()
    } catch (e) {
      console.log(e)
      game.goToScene('title')
    }

    await this.updateRanking()
  }

  async updateFarm() {
    const vaultStatus = await this.controller.getVaultStatusWithAddress()

    console.log(vaultStatus[1])

    if (vaultStatus[1].length === 0) {
      game.goToScene('empty')
    } else {
      const value = vaultStatus[1][0][2]
      const premium = vaultStatus[1][0][6][0][3]

      game.goToScene('farm')

      if (premium.gt(0)) {
        const profit = premium.sub(0)
        console.log(profit.toString())
        const index = profit.div('10000').toNumber()

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
  }

  async updateRanking() {
    const client = new GQLClient();
    const retrieves = await client.vaultEntities();
    const vaults = retrieves.data.vaultEntities

    console.dir(retrieves.data.vaultEntities);
    console.dir("hoge");

    const result = await Promise.all(vaults.map(async vault => {

      const vaultStatus = await this.controller.getVaultStatus(vault.vaultId)

      return {
        owner: vault.owner,
        premium: vaultStatus[6][0][3]
      }
    }))

    console.log(result)

    result.sort((a: any, b: any) => {
      if (a.premium.gt(b.premium)) {
        return -1
      } else {
        return 1
      }
    })



    for (let i = 0; i < 3; i++) {
      const vault = result[i]
      if (vault) {
        this.rankings[i].updateRanking(vault.owner, vault.premium)

      }
    }

  }
}

export const game = new Game();
game.initialize()