import { Action } from "./actions";
import { Nullable } from "./nullable";

export class JugState {
  constructor(
    public readonly leftJug: number = 0,
    public readonly rightJug: number = 0,
    public readonly parent: Nullable<JugState> = null,
    public readonly action: Action = 'initial',
  ) { }

  public hasDesiredVolume(desiredVolume: number): boolean {
    return (this.leftJug === desiredVolume || this.rightJug === desiredVolume);
  }

  public get steps(): Action[] {

    const flattenedSteps = this.getFlattenedSteps(this);

    return flattenedSteps.map(state => state.action);
  }

  private getFlattenedSteps(state: JugState, allStates: JugState[] = []): JugState[] {

    if (!state.parent) return allStates;

    allStates.unshift(state);

    return this.getFlattenedSteps(state.parent, allStates);

  }

}