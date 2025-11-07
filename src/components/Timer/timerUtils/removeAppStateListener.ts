import { changeAppStateListener } from "@src/components/Utils/Redux/features/timerRunningValues-slice";
import { store } from "@src/components/Utils/Redux/store";

const dispatch = store.dispatch;

export function removeStateAppListener() {
  const { appStateListener } = store.getState().timerValues;

  appStateListener?.remove();

  dispatch(changeAppStateListener(null));
}
