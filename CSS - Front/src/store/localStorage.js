/**
 * we need to get the items from the state
 * It's important that we wrap this code into try/catch 
 * because calls to your localStorage getItem can fail if 
 * the user privacy mode does not allow the use of localStorage.
 * @returns {undefined} to let the reducers initialize the state instead
 *          {serializedState} if serializedState exists we going to turn it into the state object (JSON.parse)
 */
export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('state');
      if (serializedState === null) {
        return undefined;
      }
      //
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };
  
  /**
   * this function allows to save the state. 
   * @param {object} state 
   */
  export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch (err) {
      // Ignore write errors.
    }
  };

  /**
   * this function allows to remove the state. 
   * @param {object} state 
   */
  export const removeState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.removeItem('state', serializedState);
    } catch (err) {
      // Ignore write errors.
    }
  };