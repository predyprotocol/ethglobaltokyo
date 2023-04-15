import { Bytes, ethers } from "ethers";
import * as ControllerAbi from "../../abis/Controller.json";
import { Controller as controllerAddress } from "../../config/arbitrum.json";

type TradeParams = {
  tradeAmount: number
  tradeAmountSqrt: number
  lowerSqrtPrice: number
  upperSqrtPrice: number
  deadline: number
  enableCallback: boolean
  data: Bytes
}

type CloseParams = {
  lowerSqrtPrice: number
  upperSqrtPrice: number
  deadline: number
}

class Controller {
  private controller: ethers.Contract;
  private signer: ethers.Signer;

  constructor() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    this.signer = provider.getSigner();
    this.controller = new ethers.Contract(
      controllerAddress,
      ControllerAbi,
      provider
    );
  }

  async initialize() {}

  openIsolatedVault(
    depositAmount: number,
    assetId: number,
    tradeParams: TradeParams
  ) {
    const controller = this.controller.connect(this.signer);
    controller.openIsolatedVault(depositAmount, assetId, tradeParams);
  }

  closeIsolatedVault(
    isolatedVaultId: number,
    assetId: number,
    closeParams: CloseParams
  ) {
    const controller = this.controller.connect(this.signer);
    controller.closeIsolatedVault(isolatedVaultId, assetId, closeParams);
  }

  async getVaultStatus(vaultId: number): Promise<any> {
    return this.controller.getVaultStatus(vaultId);
  }

  async getVaultStatusWithAddress() { 
    const controller = this.controller.connect(this.signer);
    return this.controller.getVaultStatusWithAddress();
  }
}