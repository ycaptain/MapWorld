import { combineReducers } from "redux";
import { renderReducer } from "@/reducers/render";
import { connectRouter } from "connected-react-router";
import { History } from "history";

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    render: renderReducer,
  });
}
