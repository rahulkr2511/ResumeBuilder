
import { Middleware } from 'redux';


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
  
