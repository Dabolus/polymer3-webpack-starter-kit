import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import '@polymer/app-route/app-location';
import '@polymer/app-route/app-route';
import '@polymer/iron-pages/iron-pages';
import '@polymer/iron-selector/iron-selector';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button/paper-button';

import view from './view3.template.html';
import style from './view3.style.scss';
import '../shared-styles';
import '../icons';

export class MyView3 extends PolymerElement {
  $: any;

  static get is() {
    return 'my-view3';
  }

  static get template() {
    return html([`<style include="shared-styles">${style}</style>${view}`]);
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged',
      },
      route: Object,
      routeData: Object,
      subroute: Object,
      dynamicPath: String,
    };
  }

  static get observers() {
    return [
      '_routeChanged(route.path)',
    ];
  }

  _routeChanged(path: string) {
    // For some reason, the route change is not detected when we go back to the main page2 view.
    // This little workaround will fix this problem
    const [route, subroute] = path.replace(this.rootPath, '').split('/');
    if (route !== 'view3') {
      return;
    }
    this.page = subroute ? 'dynamic-subview' : 'index';
    this.dynamicPath = subroute || '';
  }

  _pageChanged(page: string) {
    // Load page import on demand. Show 404 page if fails
    import(
      /* webpackMode: "lazy" */
      `./${page}/${page}.component`
      ).catch(this._showPage404.bind(this));
  }

  _showPage404() {
    this.page = 'index';
  }
}

window.customElements.define(MyView3.is, MyView3);
