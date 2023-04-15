import { BigNumber, BigNumberish, Bytes, ethers } from "ethers";
import * as ControllerAbi from "../../abis/Controller.json";
import { Controller as controllerAddress } from "../../config/arbitrum.json";
// This function detects most providers injected at window.ethereum.
import detectEthereumProvider from '@metamask/detect-provider';

type TradeParams = {
  tradeAmount: BigNumberish
  tradeAmountSqrt: BigNumberish
  lowerSqrtPrice: BigNumber
  upperSqrtPrice: BigNumber
  deadline: number
  enableCallback: boolean
  data: string
}

type CloseParams = {
  lowerSqrtPrice: BigNumber
  upperSqrtPrice: BigNumber
  deadline: number
}

export class Controller {
  private contract: ethers.Contract;
  private signer: ethers.Signer;

  constructor() {
  }

  public static async initialize(): Promise<Controller> {
    const controller = new Controller();

    // This returns the provider, or null if it wasn't detected.
    const checkProvider = await detectEthereumProvider();
    if (checkProvider) {
      // From now on, this should always be true:
      // provider === window.ethereum
      this.startApp(checkProvider); // initialize your app
    } else {
      console.log("Please install MetaMask!");
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    controller.signer = provider.getSigner();
    controller.contract = new ethers.Contract(
      controllerAddress,
      ControllerAbi,
      provider
    );
    return controller;
  }

  public static startApp(provider) {
    // If the provider returned by detectEthereumProvider isn't the same as
    // window.ethereum, something is overwriting it – perhaps another wallet.
    if (provider !== window.ethereum) {
      console.error('Do you have multiple wallets installed?');
    }
    // Access the decentralized web!
  }

  openIsolatedVault(
    depositAmount: BigNumber,
    assetId: number,
    tradeParams: TradeParams
  ) {
    const contract = this.contract.connect(this.signer);
    contract.openIsolatedVault(depositAmount, assetId, tradeParams);
  }

  closeIsolatedVault(
    isolatedVaultId: number,
    assetId: number,
    closeParams: CloseParams
  ) {
    const contract = this.contract.connect(this.signer);
    console.log(
      isolatedVaultId, assetId, closeParams
    )
    contract.closeIsolatedVault(isolatedVaultId, assetId, closeParams);
  }

  async getVaultStatus(vaultId: number): Promise<any> {
    return this.contract.getVaultStatus(vaultId);
  }

  async getSqrtIndexPrice(assetId: number): Promise<any> {
    return this.contract.getSqrtPrice(assetId);
  }

  async getVaultStatusWithAddress() {
    const contract = this.contract.connect(this.signer)
    const from = await this.signer.getAddress()
    console.log(from)
    return contract.callStatic.getVaultStatusWithAddress({ from });
  }
}