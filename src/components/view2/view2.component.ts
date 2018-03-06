import {Element as PolymerElement} from '@polymer/polymer/polymer-element';
import view from './view2.template.html';
import style from './view2.style.scss';
import sharedStyles from '../shared-styles.scss';

export class MyView2 extends PolymerElement {
  $: any;

  static get is() {
    return 'my-view2';
  }

  static get template() {
    return `<style>${sharedStyles} ${style}</style>${view}`;
  }
}

window.customElements.define(MyView2.is, MyView2);
