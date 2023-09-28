import { WaterJugRiddle } from "../../src/application/waterJugRiddle";

describe('WaterJugRiddle', () => {

  it('should return a valid solve with different actions', () => {

    const expected = [
      'fill-left',
      'transfer-left-to-right',
      'empty-right',
      'transfer-left-to-right',
      'fill-left',
      'transfer-left-to-right'
    ];

    const waterJugRiddle = new WaterJugRiddle(5, 3, 4);

    const result = waterJugRiddle.solve();

    expect(result?.leftJug).toEqual(4);
    expect(result?.rightJug).toEqual(3);
    expect(result?.steps).toEqual(expected);

  });

  it('should return a valid solve with the same action', () => {

    const expectedSteps = [
      'fill-left',
      'transfer-left-to-right',
      'fill-left',
      'transfer-left-to-right',
      'fill-left',
      'transfer-left-to-right'
    ];

    const expected = 3;

    const waterJugRiddle = new WaterJugRiddle(1, 100, expected);

    const result = waterJugRiddle.solve();

    expect(result?.leftJug).toEqual(0);
    expect(result?.rightJug).toEqual(expected);
    expect(result?.steps).toEqual(expectedSteps);

  });

  it('should return a valid solve with one action', () => {

    const expectedSteps = ['fill-right'];

    const expected = 5;

    const waterJugRiddle = new WaterJugRiddle(1, 5, expected);

    const result = waterJugRiddle.solve();

    expect(result?.leftJug).toEqual(0);
    expect(result?.rightJug).toEqual(expected);
    expect(result?.steps).toEqual(expectedSteps);

  });

  it('should return a non solution', () => {

    const waterJugRiddle = new WaterJugRiddle(5, 3, 10);

    const result = waterJugRiddle.solve();

    expect(result).toBeNull();
  });
});