import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import Parrot from "../../../../../assets/models/Parrot.glb";
import Flamingo from "../../../../../assets/models/Flamingo.glb";
import Stork from "../../../../../assets/models/Stork.glb";

import { setupModel } from "./setupModel";

async function loadBirds() {
  const loader = new GLTFLoader();
  
  const [parrotData, flamingoData, storkData] = await Promise.all([
    loader.loadAsync(Parrot),
    loader.loadAsync(Flamingo),
    loader.loadAsync(Stork),
  ]);

  console.log("Squaaawk!", parrotData, flamingoData, storkData);

  const parrot = setupModel(parrotData);
  parrot.position.set(0, 0, 2.5);

  const flamingo = setupModel(flamingoData);
  flamingo.position.set(7.5, 0, -10);

  const stork = setupModel(storkData);
  stork.position.set(0, -2.5, -10);

  return { parrot, flamingo, stork };
}

export { loadBirds };
