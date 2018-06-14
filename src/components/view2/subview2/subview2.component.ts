import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import view from './subview2.template.html';
import style from './subview2.style.scss';
import '../../shared-styles';
import '../../icons';

export class MySubview2 extends PolymerElement {
  $: any;

  static get is() {
    return 'my-subview2';
  }

  static get template() {
    return html([`<style include="shared-styles">${style}</style>${view}`]);
  }
}

window.customElements.define(MySubview2.is, MySubview2);
