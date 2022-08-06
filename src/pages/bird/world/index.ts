import {
  Camera,
  PerspectiveCamera,
  Renderer,
  Scene,
  WebGLRenderer,
} from "three";

import { loadBirds } from "./components/birds";
import { createCamera } from "./components/camera";
import { createCube } from "./components/cube";
import { createLights } from "./components/lights";
import { createScene } from "./components/scene";

import { createControls } from "./systems/controls";
import { createRenderer } from "./systems/renderer";
import { Resizer } from "./systems/resizer";
import { Loop } from "./systems/loop";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class World {
  camera: PerspectiveCamera;
  scene: Scene;
  renderer: WebGLRenderer;
  loop: Loop;
  controls: OrbitControls;
  // 1. Create an instance of the World app
  constructor(container: HTMLElement) {
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer();
    this.controls = createControls(this.camera, this.renderer.domElement);

    // const cube = createCube()
    // this.scene.add(cube)

    const { ambientLight, mainLight } = createLights();
    this.scene.add(mainLight, ambientLight);

    container.append(this.renderer.domElement);

    const resizer = new Resizer(container, this.camera, this.renderer);
    this.loop = new Loop(this.camera, this.scene, this.renderer);

    // this.loop.updatables.push(cube)

    // resizer.onResize = () => {
    //   this.render();
    // };
  }

  async init() {
    // asynchronous setup here
    // load bird models
    const { parrot, flamingo, stork } = await loadBirds();
    this.loop.updatables.push(parrot, flamingo, stork);
    this.scene.add(parrot, flamingo, stork);
  }

  // 2. Render the scene
  render() {
    this.renderer.render(this.scene, this.camera);
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}

export { World };
