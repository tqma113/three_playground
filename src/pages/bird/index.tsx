import { World } from "./world";

async function main() {
  // Get a reference to the container element that will hold our scene
  const container = document.createElement("div");
  container.style.width = "100vw";
  container.style.height = "100vh";
  document.body.appendChild(container);

  const world = new World(container);
  console.log(world.camera);
  console.log(world.renderer);
  console.log(world.scene);

  // complete async tasks
  await world.init();

  world.start();
}

main().catch((err) => {
  console.error(err);
});
