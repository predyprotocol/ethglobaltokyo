import { ethers } from "ethers"
import { Actor, Color, Vector, Text, Sprite } from "excalibur"
import { BASE_MARGIN_AMOUNT } from "./constants"
import { Controller } from "./contracts/controller"
import { Resources } from "./resources"
import { computeLowerSqrtPrice, computeUpperSqrtPrice, getDeadline } from "./utils"

export class FarmButton extends Actor {
  controller: Controller

  constructor(controller: Controller) {
    super({
      pos: new Vector(200, 420),
      width: 300,
      height: 40,
    })

    this.controller = controller
  }

  onInitialize() {
    this.graphics.add(Resources.FarmingButton.toSprite())

    this.on('pointerup', async () => {
      // create isolated vault

      // this.controller.openIsolatedVault('100000000', 2, {})
      const sqrtPrice = await this.controller.getSqrtIndexPrice(2)

      this.controller.openIsolatedVault(
        BASE_MARGIN_AMOUNT,
        2,
        {
          tradeAmount: '-4350000000000000000',
          tradeAmountSqrt: '200000000000000',
          lowerSqrtPrice: computeLowerSqrtPrice(sqrtPrice),
          upperSqrtPrice: computeUpperSqrtPrice(sqrtPrice),
          deadline: getDeadline(),
          enableCallback: false,
          data: '0x'
        }
      )
    })
  }
}
