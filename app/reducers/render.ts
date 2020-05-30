import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';
import { RenderActionNames, renderActionTypes, RawBuilding } from "@/actions/render";

export type Dispatch = ReduxDispatch<Action<renderStateType>>;

export type Store = ReduxStore<renderStateType, Action<renderActionTypes>>;

export type renderStateType = {
  render: typeof initialState;
};

const initialState = {
  buildings: [] as Array<RawBuilding>,
}

export const renderReducer = (state=initialState, action: renderActionTypes) => {
  switch(action.type) {
    case RenderActionNames.ADD_BUILDINGS:
      return {
        buildings: [...state.buildings, ...action.payload],
      }
    default:
      return state;
  }
}
