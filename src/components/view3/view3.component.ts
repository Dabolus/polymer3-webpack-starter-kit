import {Element as PolymerElement} from '@polymer/polymer/polymer-element';
import view from './view3.template.html';
import style from './view3.style.scss';
import sharedStyles from '../shared-styles.scss';

export class MyView3 extends PolymerElement {
  $: any;

  static get is() {
    return 'my-view3';
  }

  static get template() {
    return `<style>${sharedStyles} ${style}</style>${view}`;
  }
}

window.customElements.define(MyView3.is, MyView3);
