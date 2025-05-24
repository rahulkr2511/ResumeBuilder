
import { Middleware } from 'redux';

// This middleware logs Redux actions and state changes to the console.
// There logging is enabled by default, but can be disabled by setting `loggerConfig.enabled` to false.
// The logs are stored in the `window.__REDUX_LOGS__` array, which can be accessed for debugging purposes.
// The logs include the timestamp, action, previous state, and next state.
// The same functionality is also available in logger packages like redux-logger.


export const loggerConfig = {
    // Set to false to disable logging
    enabled: true
  };

  
  
export interface ReduxLog {
    timestamp: string;
    action: any;
    prevState: any;
    nextState: any;
  }
  
declare global {
    interface Window {
      __REDUX_LOGS__?: ReduxLog[];
    }
  }
  
export const loggerMiddleware: Middleware = store => next => (action: any)=> {
    if (!loggerConfig.enabled) return next(action);
  
    const prevState = store.getState();
    const result = next(action);
    const nextState = store.getState();
  
    const log: ReduxLog = {
      timestamp: new Date().toISOString(),
      action,
      prevState,
      nextState,
    };
  
    window.__REDUX_LOGS__ = window.__REDUX_LOGS__ || [];
    window.__REDUX_LOGS__.push(log);

    console.groupCollapsed(`🧾 Redux Action: ${action.type}`);
    console.log('%cPrevious State:', 'color: yellow', prevState);
    console.log('%cAction:', 'color: red', action);
    console.log('%cNext State:', 'color: green', nextState);
    console.groupEnd();
  
    return result;
  };
  
