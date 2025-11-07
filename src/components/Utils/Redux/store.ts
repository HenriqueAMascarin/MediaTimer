import { configureStore } from "@reduxjs/toolkit";
import { stateTimerReducer } from "./features/stateTimer-slice";
import { timerRunningValuesReducer } from "./features/timerRunningValues-slice";
import { stateMusicReducer } from "./features/statesMusic-slice";
import { stateHistoryReducer } from "./features/stateHistory-slice";
import { stateAlertReducer } from "./features/stateAlert-slice";
import { listTimerCurrentValuesReducer } from '@src/components/Utils/Redux/features/listTimerCurrentValues-slice';

export const store = configureStore({
  reducer: {
    timerValues: timerRunningValuesReducer,
    listTimerCurrentValues: listTimerCurrentValuesReducer,
    stateTimer: stateTimerReducer,
    stateMusic: stateMusicReducer,
    stateHistory: stateHistoryReducer,
    stateAlert: stateAlertReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
