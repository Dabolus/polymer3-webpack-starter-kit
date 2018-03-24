import {PolymerElement} from '@polymer/polymer/polymer-element';
import view from './view2.template.html';
import style from './view2.style.scss';
import '../shared-styles';

export class MyView2 extends PolymerElement {
  $: any;

  static get is() {
    return 'my-view2';
  }

  static get template() {
    return `<style include="shared-styles">${style}</style>${view}`;
  }
}

window.customElements.define("my-view2", MyView2);
