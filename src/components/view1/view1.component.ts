import {PolymerElement, html} from '@polymer/polymer/polymer-element';

import view from './view1.template.html';
import style from './view1.style.scss';
import '../shared-styles';

export class MyView1 extends PolymerElement {
  $: any;

  static get is() {
    return 'my-view1';
  }

  static get template() {
    return html([`<style include="shared-styles">${style}</style>${view}`]);
  }
}
window.customElements.define(MyView1.is, MyView1);
