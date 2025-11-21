import { changeAppStateListener, timerRunningValuesType } from "@src/components/Utils/Redux/features/timerRunningValues-slice";
import { store } from "@src/components/Utils/Redux/store";

const dispatch = store.dispatch;

type removeStateAppListenerType = {
  appStateListener: timerRunningValuesType['appStateListener']
};

export function removeStateAppListener({appStateListener}: removeStateAppListenerType) {
  appStateListener?.remove();

  dispatch(changeAppStateListener(null));
}
