export class MyActionListener {
  constructor() {
    this.actions = new Map();
    this.registerListener = this.registerListener.bind(this);
    this.removeListener = this.removeListener.bind(this);
    this.emit = this.emit.bind(this);
  }

  registerListener(action, listenerFunc) {
    const value = this.actions.get(action);
    this.actions.set(action, value ? [listenerFunc, ...value] : new Array(listenerFunc));
  }

  removeListener(action) {
    return this.actions.delete(action);
  }

  emit(action, data) {
    const allListeners = this.actions.get(action);
    if (!allListeners) throw new Error(`Can't emit the event. Event ${action} does not exist.`);

    allListeners?.map((listenerFunc) => {
      try {
        listenerFunc(data);
      } catch (error) {
        throw error;
      }
    });
  }
}
