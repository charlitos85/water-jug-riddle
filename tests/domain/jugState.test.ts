import { Action } from "../../src/domain/actions";
import { JugState } from "../../src/domain/jugState";

describe('JugState', () => {

  it('should be a initial state', () => {

    const actionExpected: Action = 'initial';

    const jugState = new JugState(1, 2);

    expect(jugState.action).toEqual(actionExpected);
    expect(jugState.leftJug).toEqual(1);
    expect(jugState.rightJug).toEqual(2);
    expect(jugState.steps).toEqual([]);

  });

  it('should be a state with parent', () => {

    const actionExpected: Action = "fill-left";

    const jugState = new JugState(10, 0, new JugState(), actionExpected);

    expect(jugState.action).toEqual(actionExpected);
    expect(jugState.leftJug).toEqual(10);
    expect(jugState.rightJug).toEqual(0);
    expect(jugState.steps).toEqual([actionExpected]);

  });

  it('should be a state with a desired volume', () => {

    const stepsExpected = [
      'fill-left',
      'transfer-left-to-right',
    ];

    const desiredVolume = 1;

    const initState = new JugState(3, 1);
    const firstState = new JugState(3, 0, initState, "fill-left");
    const secondState = new JugState(2, 1, firstState, "transfer-left-to-right");

    expect(secondState.hasDesiredVolume(desiredVolume)).toBeTruthy;
    expect(secondState.steps).toEqual(stepsExpected);

  });

});
