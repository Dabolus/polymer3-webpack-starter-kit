import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-iconset-svg/iron-iconset-svg';

import defs from './defs.scss';

const documentContainer = document.createElement('div');
documentContainer.setAttribute('style', 'display: none;');
documentContainer.innerHTML =
  // TODO: discover why using a template string here breaks everything
  '<dom-module id="shared-styles"><template><style>' +
    defs +
  '</style></template></dom-module>';
document.head.appendChild(documentContainer);
