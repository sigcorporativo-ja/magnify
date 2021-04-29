/* eslint-disable no-console */
/**
 * @module M/plugin/Magnify
 */
import 'assets/css/magnify';
import MagnifyControl from './magnifycontrol';
import api from '../../api';

export default class Magnify extends M.Plugin {
  /**
   * @classdesc
   * Main facade plugin object. This class creates a plugin
   * object which has an implementation Object
   *
   * @constructor
   * @extends {M.Plugin}
   * @param {Object} impl implementation object
   * @api stable
   */
  constructor(options = {}) {
    super();
    /**
     * Facade of the map
     * @private
     * @type {M.Map}
     */
    this.map_ = null;


    /**
     * Array of controls
     * @private
     * @type {Array<M.Control>}
     */
    this.controls_ = [];


    /**
     * This flag indicates if the plugin is collapsible
     * @type {boolean}
     */
    this.collapsible = true;


    /**
     * Class name of the html view Plugin
     * @type {string}
     */
    this.className = 'm-plugin-magnify';


    /**
     * Position of the Plugin
     * @type {string}
     */
    this.position = options.position || 'TR';


    /**
     * Layer names that will have effects
     * Value: the names separated with coma
     * @type {string}
     */
    /*Al crear el plugin pueden darse tres casos:
      1. que no se haya incluido el parámetro layers.
      2. que el parámetro layers esté vacío (layers: '')
      3. que el parámetro layers contenga una capa o varias separadas por comas */
    if (options.layers == '' || options.layers == null) {
      this.layers = '';
    } else {
      this.layers = options.layers.split(',');
    }

    /**
     * Max limit zoom
     * Value: number
     * @type {number}
     */
    this.zoomMax = options.zoomMax || 10;


    /**
     * Magnifying effect zoom
     * Value: number in range 1 - zoomMax
     * @type {number}
     */
    this.zoom = options.zoom || 1;


    /**
     * Metadata from api.json
     * @private
     * @type {Object}
     */
    this.metadata_ = api.metadata;
  }


  /**
   * This function adds this plugin into the map
   *
   * @public
   * @function
   * @param {M.Map} map the map to add the plugin
   * @api stable
   */
  addTo(map) {
    const pluginOnLeft = !!(['TL', 'BL'].includes(this.position));
    const values = {
      pluginOnLeft,
      layers: this.layers,
      zoom: this.zoom,
      zoomMax: this.zoomMax,
    };
    this.control_ = new MagnifyControl(values);
    this.controls_.push(this.control_);

    this.map_ = map;

    // panel para agregar control - no obligatorio
    this.panel_ = new M.ui.Panel('panelMagnify', {
      collapsible: this.collapsible,
      position: M.ui.position[this.position],
      className: this.className,
      collapsedButtonClass: 'g-cartografia-zoom-extension',
      tooltip: 'Lupa',
    });
    this.panel_.addControls(this.controls_);
    this.panel_.on(M.evt.SHOW, (evt) => {
      if (map.getWFS().length === 0 && map.getKML().length === 0 && map.getGeoJSON() === 0) {
        this.panel_.collapse();
        M.dialog.info('No existen capas disponibles para aplicar el efecto transparencia');
      }
    });
    map.addPanels(this.panel_);
  }

  /**
   * This function destroys this plugin
   *
   * @public
   * @function
   * @api stable
   */
  destroy() {
    this.control_.removeEffects();
    this.map_.removeControls([this.control_]);
    [this.control_, this.panel_, this.map_] = [null, null, null];
  }

  /**
   * This function return the control of plugin
   *
   * @public
   * @function
   * @api stable
   */
  getControls() {
    const aControl = [];
    aControl.push(this.control_);
    return aControl;
  }

  /**
   * @getter
   * @public
   */
  get name() {
    return 'magnify';
  }




  /**
   * This function gets metadata plugin
   *
   * @public
   * @function
   * @api stable
   */
  getMetadata() {
    return this.metadata_;
  }
}
