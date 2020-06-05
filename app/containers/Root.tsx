import React from "react";
import { History } from "history";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import Routes from "../routes";
import { Store } from "@/reducers/render";

interface Props {
  store: Store;
  history: History;
}

export default function Root({ store, history }: Props) {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  );
}
