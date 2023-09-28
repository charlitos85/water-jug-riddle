import promptSync from "prompt-sync";
import { WaterJugRiddle } from "./application/waterJugRiddle";

function main(): void {

  const prompt = promptSync({ sigint: false, eot: true });

  const inputLeftJugSize = prompt("enter left Jug size (5): ", { value: '5' });
  const inputRightJugSize = prompt("enter right Jug size (3): ", { value: '3' });
  const inputDesiredVolume = prompt("enter desired Volume (4): ", { value: '4' });

  const leftJugSize = parseInt(inputLeftJugSize);
  const rightJugSize = parseInt(inputRightJugSize);
  const desiredVolume = parseInt(inputDesiredVolume);

  console.log("\n*****************\n");
  console.log(`Left Jug size: ${leftJugSize}`);
  console.log(`Right Jug size: ${rightJugSize}`);
  console.log(`Desired volume: ${desiredVolume}`);
  console.log("\n*****************\n");

  const waterJugRiddle = new WaterJugRiddle(leftJugSize, rightJugSize, desiredVolume);
  const result = waterJugRiddle.solve();

  if (!result) return console.error("NO SOLUTION");

  console.log(`Left Jug volume: ${result.leftJug}`);
  console.log(`Right Jug volume: ${result.rightJug}`);
  console.log(`Steps:`);
  console.log(result.steps);

};

main();
