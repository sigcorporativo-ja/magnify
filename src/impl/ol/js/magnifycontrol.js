/* eslint-disable no-console */
/**
 * @module M/impl/control/MagnifyControl
 */
import ZoomInteraction from 'impl/ZoomInteraction';

export default class MagnifyControl extends M.impl.Control {
  /**
   * This function adds the control to the specified map
   *
   * @public
   * @function
   * @param {M.Map} map to add the plugin
   * @param {HTMLElement} html of the plugin
   * @api stable
   */
  addTo(map, html) {
    // super addTo - don't delete
    this.map = map;
    this.olMap = map.getMapImpl();
    super.addTo(map, html);
  }

  effectSelected(layers, zoom) {

    this.zoomInteraction_ = new ZoomInteraction({
      projection: this.map.getImpl().getProjection().code,
      zoom, // layers son las capas a las que se le hará zoom cuando la lupa pase
      layers: layers,
    });

    this.olMap.addOverlay(this.zoomInteraction_);
    this.zoomInteraction_.setActive(true);

  }

  setOptionZoom(zoom) {
    this.zoomInteraction_.setOptionZoom(zoom);
  }

  removeEffects() {
    if (this.zoomInteraction_ != null) {
      this.zoomInteraction_.setActive(false);
    }
  }


}
