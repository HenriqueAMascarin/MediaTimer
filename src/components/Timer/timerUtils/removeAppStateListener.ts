import { changeAppStateListener, timerRunningValuesType } from "@src/components/Utils/Redux/features/timerRunningValues-slice";
import { store } from "@src/components/Utils/Redux/store";

const dispatch = store.dispatch;

type stopTimerType = {
  appStateListener: timerRunningValuesType['appStateListener']
};

export function removeStateAppListener({appStateListener}: stopTimerType) {
  appStateListener?.remove();

  dispatch(changeAppStateListener(null));
}
