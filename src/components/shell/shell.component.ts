import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import '@polymer/app-layout/app-drawer/app-drawer';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout';
import '@polymer/app-layout/app-header/app-header';
import '@polymer/app-layout/app-header-layout/app-header-layout';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/app-route/app-location';
import '@polymer/app-route/app-route';
import '@polymer/iron-pages/iron-pages';
import '@polymer/iron-selector/iron-selector';
import '@polymer/paper-icon-button/paper-icon-button';

import view from './shell.template.html';
import style from './shell.style.scss';
import '../icons';
// Have to include the shared styles here even if they're not directly used
// so that they're bundled within the app.js and not within each dynamic view
import '../shared-styles';

export class MyApp extends PolymerElement {
  $: any;
  page: any;

  static get is() {
    return 'my-app';
  }

  static get template() {
    return html([`<style>${style}</style>${view}`]);
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged',
      },
      routeData: Object,
      subroute: Object,
      // This shouldn't be necessary, but the Analyzer isn't picking up
      // Polymer.Element#rootPath
      rootPath: String,
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)',
    ];
  }

  _routePageChanged(page: string) {
    // If no page was found in the route data, page will be an empty string.
    // Default to 'view1' in that case.
    this.page = page || 'view1';

    // Close a non-persistent drawer when the page & route are changed.
    if (!this.$.drawer.persistent) {
      this.$.drawer.close();
    }
  }

  _pageChanged(page: string) {
    // Load page import on demand. Show 404 page if fails
    import(
      /* webpackMode: "lazy" */
      `../${page}/${page}.component`
      ).catch(this._showPage404.bind(this));
  }

  _showPage404() {
    this.page = 'view404';
  }
}
