import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import view from './subview1.template.html';
import style from './subview1.style.scss';
import '../../shared-styles';
import '../../icons';

export class MySubview1 extends PolymerElement {
  $: any;

  static get is() {
    return 'my-subview1';
  }

  static get template() {
    return html([`<style include="shared-styles">${style}</style>${view}`]);
  }
}

window.customElements.define(MySubview1.is, MySubview1);
