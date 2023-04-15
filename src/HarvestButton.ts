import { ethers } from "ethers"
import { Actor, Color, Vector, Text, Sprite } from "excalibur"
import { Controller } from "./contracts/controller"
import { Resources } from "./resources"
import { computeLowerSqrtPrice, computeUpperSqrtPrice, getDeadline } from "./utils"

export class HarvestButton extends Actor {
  controller: Controller

  vaultId: number

  constructor(controller: Controller, vaultId, number) {
    super({
      pos: new Vector(200, 420),
      width: 300,
      height: 40,
    })

    this.controller = controller
    this.vaultId = vaultId
  }

  setVaultId(vaultId: number) {
    this.vaultId = vaultId
  }

  onInitialize() {
    this.graphics.add(Resources.HarvestButton.toSprite())

    this.on('pointerup', async () => {
      // create isolated vault
      const sqrtPrice = await this.controller.getSqrtIndexPrice(2)

      this.controller.closeIsolatedVault(
        this.vaultId,
        2,
        {
          lowerSqrtPrice: computeLowerSqrtPrice(sqrtPrice),
          upperSqrtPrice: computeUpperSqrtPrice(sqrtPrice),
          deadline: getDeadline()
        }
      )
    })
  }
}
