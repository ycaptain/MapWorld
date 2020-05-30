export const RenderActionNames = {
  ADD_BUILDINGS: 'ADD_BUILDINGS',
  RESET: 'RESET',
} as const;

interface AddBuildingsAction {
  type: typeof RenderActionNames.ADD_BUILDINGS;
  payload: Array<RawBuilding>,
}

interface ResetAction {
  type: typeof RenderActionNames.RESET,
}

export interface RawBuilding {
  meta: Object,
  buildings: Array<{
    coordinates: Array<{
      [K in 'x' | 'y' | 'z']: number;
    }>
    properties: {
      height: number;
    }
  }>
}

export type renderActionTypes = AddBuildingsAction | ResetAction;

export function addBuildings(rawBuildings: Array<RawBuilding>) {
  return {
    type: RenderActionNames.ADD_BUILDINGS,
    payload: rawBuildings
  }
}

export function reset() {
  return {
    type: RenderActionNames.RESET,
  }
}
