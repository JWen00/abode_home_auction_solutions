import { action, makeObservable, observable, runInAction } from "mobx";
import React from "react";
import { delay } from "./ui/util/helper";

export type User = {
  displayName: string | undefined;
  id: number;
};

export default class Store {
  @observable user?: User;
  @observable openSignUp: boolean = false;
  @observable openSignIn: boolean = false;

  @action
  async signIn() {
    await delay(300);
    runInAction(() => (this.user = { displayName: "Winston", id: 1 }));
  }

  @action
  signOut() {
    this.user = undefined;
  }

  @action
  async signUp() {
    await delay(300);
    runInAction(() => (this.user = { displayName: "Winston", id: 1 }));
  }

  constructor() {
    makeObservable(this);
  }
}

export const AuthContext = React.createContext<Store | null>(null);

export const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const store = new Store();
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};

export const useStore = () => React.useContext(AuthContext);
