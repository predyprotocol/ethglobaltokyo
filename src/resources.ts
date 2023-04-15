import { ImageSource } from "excalibur";
import connect from "./images/connect.png";
import farming from "./images/farming.png";
import harvest from "./images/harvest.png";
import farm from "./images/farm.png";
import ethfarm from "./images/ethfarm.png";
import crops1 from "./images/crops1.png";
import crops2 from "./images/crops2.png";

let Resources = {
  ConnectButton: new ImageSource(connect),
  FarmingButton: new ImageSource(farming),
  HarvestButton: new ImageSource(harvest),
  Farm: new ImageSource(farm),
  Title: new ImageSource(ethfarm),
  Crop1: new ImageSource(crops1),
  Crop2: new ImageSource(crops2)
}

export { Resources };