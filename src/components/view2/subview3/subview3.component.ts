import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import view from './subview3.template.html';
import style from './subview3.style.scss';
import '../../shared-styles';
import '../../icons';

export class MySubview3 extends PolymerElement {
  $: any;

  static get is() {
    return 'my-subview3';
  }

  static get template() {
    return html([`<style include="shared-styles">${style}</style>${view}`]);
  }
}

window.customElements.define(MySubview3.is, MySubview3);
