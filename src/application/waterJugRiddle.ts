import { JugState } from "../domain/jugState";
import { Nullable } from "../domain/nullable";

export class WaterJugRiddle {

  private checkedJugStatuses = new Set<string>();
  private states: JugState[] = [];

  constructor(
    private readonly leftJugSize: number,
    private readonly rightJugSize: number,
    private readonly desiredVolume: number,
  ) { }

  public solve(): Nullable<JugState> {

    const newJugState = new JugState();

    this.states.push(newJugState);

    while (this.states.length) {

      const currentState = this.states.shift()!;

      if (currentState.hasDesiredVolume(this.desiredVolume)) return currentState;

      const { leftJug, rightJug } = currentState;

      const state = `${leftJug}-${rightJug}`;
      if (this.checkedJugStatuses.has(state)) continue;
      this.checkedJugStatuses.add(state);

      // Generate next states

      // Fill Left Jug
      this.states.push(new JugState(this.leftJugSize, rightJug, currentState, 'fill-left'));

      // Fill Right Jug
      this.states.push(new JugState(leftJug, this.rightJugSize, currentState, 'fill-right'));

      //Empty Left Jug
      this.states.push(new JugState(0, rightJug, currentState, 'empty-left'));

      //Empty Right Jug
      this.states.push(new JugState(leftJug, 0, currentState, 'empty-right'));

      const volumeTotal = leftJug + rightJug;

      //Transfer left Jug to right Jug
      if (leftJug > 0) {
        this.states.push(new JugState(Math.max(0, volumeTotal - this.rightJugSize), Math.min(this.rightJugSize, volumeTotal), currentState, 'transfer-left-to-right'));
      }

      //Transfer right Jug to left Jug
      if (rightJug > 0) {
        this.states.push(new JugState(Math.min(this.leftJugSize, volumeTotal), Math.max(0, volumeTotal - this.leftJugSize), currentState, 'transfer-right-to-left'));
      }

    }

    return null;
  }
}
