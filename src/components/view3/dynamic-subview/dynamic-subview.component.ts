import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import view from './dynamic-subview.template.html';
import style from './dynamic-subview.style.scss';
import '../../shared-styles';
import '../../icons';

export class MyDynamicSubview extends PolymerElement {
  $: any;

  static get is() {
    return 'my-dynamic-subview';
  }

  static get template() {
    return html([`<style include="shared-styles">${style}</style>${view}`]);
  }

  static get properties() {
    return {
      dynamicPath: String,
      subviewName: {
        type: String,
        computed: '_computeSubviewName(dynamicPath)'
      }
    };
  }

  // This function uses the dynamic subview path to compute a name.
  // Of course it is quite useless, but it is just an example on how you might want
  // to organize your code in case you need a view with a dynamic parameter in the url
  // e.g. you might want to use it to get some sort of data with iron-ajax (a user profile, etc.)
  _computeSubviewName(dynamicPath: string) {
    return dynamicPath ? dynamicPath
      .split('-')
      .map((word) => `${word[0].toUpperCase()}${word.substr(1).toLowerCase()}`)
      .join(' ') : '';
  }
}

window.customElements.define(MyDynamicSubview.is, MyDynamicSubview);
