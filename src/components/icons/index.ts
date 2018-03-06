import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-iconset-svg/iron-iconset-svg';

import defs from './defs.html';

const documentContainer = document.createElement('div');
documentContainer.setAttribute('style', 'display: none;');
documentContainer.innerHTML = defs;
document.head.appendChild(documentContainer);
