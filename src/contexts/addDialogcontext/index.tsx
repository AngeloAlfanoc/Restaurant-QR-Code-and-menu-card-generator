import React, { createContext, useReducer, useContext } from "react";
import { UserContext } from "../userContext";

type Action = { type: "ADD_MENU_CARD" };
type Dispatch = (action: Action) => void;
type State = { addMenuCard: boolean };
type DialogProviderProps = { children: React.ReactNode };

const DialogStateContext = createContext<State | undefined>(undefined);
const DialogDispatchContext = createContext<Dispatch | undefined>(undefined);

function dialogReducer(state: State, action: Action) {
  switch (action.type) {
    case "ADD_MENU_CARD": {
      return { addMenuCard: !state.addMenuCard };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function DialogProvider({ children }: DialogProviderProps) {
  const [state, dispatch] = useReducer(dialogReducer, { addMenuCard: false });
  return (
    <DialogStateContext.Provider value={state}>
      <DialogDispatchContext.Provider value={dispatch}>
        {children}
      </DialogDispatchContext.Provider>
    </DialogStateContext.Provider>
  );
}

function useDialogState() {
  const context = useContext(DialogStateContext);
  const user = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useDialogState must be used within a DialogProvider");
  }
  if (user === undefined) {
    throw new Error("User is not defined");
  }
  return context;
}
function useDialogDispatch() {
  const context = useContext(DialogDispatchContext);
  const user = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useDialogDispatch must be used within a DialogProvider");
  }
  if (user === undefined) {
    throw new Error("User is not defined");
  }
  return context;
}
export { DialogProvider, useDialogState, useDialogDispatch };
