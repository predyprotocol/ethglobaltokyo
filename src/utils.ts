import { BigNumber } from "ethers"

export function computeLowerSqrtPrice(sqrtPrice: BigNumber) {
    return sqrtPrice.mul(998503).div(1000000)
}

export function computeUpperSqrtPrice(sqrtPrice: BigNumber) {
    return sqrtPrice.mul(1001499).div(1000000)
}

export function getDeadline() {
    const now = new Date().getTime()

    return Math.floor(now / 1000) + 60 * 60 * 20
}
