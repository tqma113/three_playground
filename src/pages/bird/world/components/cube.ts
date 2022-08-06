import { BoxBufferGeometry, Mesh, TextureLoader, MeshStandardMaterial, MathUtils } from 'three';
import TestUV from '../../../../assets/textures/uv-test-bw.png'

function createMaterial() {
  // create a texture loader.
  const textureLoader = new TextureLoader();

  const texture = textureLoader.load(
    TestUV,
  );


  // create a "standard" material using
  const material = new MeshStandardMaterial({ map: texture });

  return material;
}

function createCube() {
  // create a geometry
  const geometry = new BoxBufferGeometry(2, 2, 2);

  // create a default (white) Basic material
  const material = createMaterial()

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material);

  cube.rotation.set(-0.5, -0.1, 0.8);

const radiansPerSecond = MathUtils.degToRad(30);

  cube.tick = (delta: number) => {
    // increase the cube's rotation each frame
    cube.rotation.z += radiansPerSecond * delta;
    cube.rotation.x += radiansPerSecond * delta;
    cube.rotation.y += radiansPerSecond * delta;
  };

  return cube;
}

export { createCube };