import { ImageSource } from "excalibur";
import connect from "./images/connect.png";
import farm from "./images/farm.png";
import ethfarm from "./images/ethfarm.png";

let Resources = {
  ConnectButton: new ImageSource(connect),
  Farm: new ImageSource(farm),
  Title: new ImageSource(ethfarm)
}

export { Resources };