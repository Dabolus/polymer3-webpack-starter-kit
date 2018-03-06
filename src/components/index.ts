import {setRootPath, setPassiveTouchGestures} from '@polymer/polymer/lib/utils/settings';
import {MyApp} from './shell/shell.component';

declare var window: any;

setRootPath(window.Polymer.rootPath);
setPassiveTouchGestures(true);

const elements = [
  MyApp,
  // Add your STATIC elements here
];

for (const el of elements) {
  customElements.define(el.is, el);
}
