WebComponents.waitFor(() =>
  // At this point we are guaranteed that all required polyfills have
  // loaded, and can use web components API's.
  // The standard pattern is to load element definitions that call
  // `customElements.define` here.
  // Note: returning the import's promise causes the custom elements
  // polyfill to wait until all definitions are loaded and then upgrade
  // the document in one batch, for better performance.
  import('./components'));
