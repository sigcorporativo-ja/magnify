import Magnify from 'facade/magnify';


/* PRUEBA DE PARÁMETRO zoom y zoomMax */

const map = M.map({
  container: "mapjs",
  layers: ["WMS*Municipios*http://www.ideandalucia.es/wms/dea100_divisiones_administrativas?*terminos_municipales*false*true"],
  controls: ['layerswitcher'],
});

const mp = new Magnify({ position: 'TL', zoom: 3, zoomMax: 20 });



/* CASO 1. Si no se indica capa en la creación, asumir capa base como capa a magnificar.*/
/*
const map = M.map({
  container: "mapjs",
  layers: ["WMS*Municipios*http://www.ideandalucia.es/wms/dea100_divisiones_administrativas?*terminos_municipales*false*true"],
  controls: ['layerswitcher'],
});

const wms = new M.layer.WMS('WMS*fondo*http://www.ign.es/wms-inspire/mapa-raster');
map.addLayers([wms]);


const mp = new Magnify({ position: 'TL' });
*/



/* CASO 2. La capa indicada en el plugin no existe en el mapa, asumir capa base como capa a magnificar. */
/*
const map = M.map({
  container: "mapjs",
  layers: ["WMS*Municipios*http://www.ideandalucia.es/wms/dea100_divisiones_administrativas?*terminos_municipales*false*true"],
  controls: ['layerswitcher'],
});

const wms = new M.layer.WMS('WMS*fondo*http://www.ign.es/wms-inspire/mapa-raster');
map.addLayers([wms]);

const mp = new Magnify({ position: 'TL', layers: 'capaNoExiste' });
*/



/* CASO 3. En caso de no existir capa base entonces incluir todas en el efecto lupa
La forma para que mapea entienda que no existe una capa base es poniendo el parámetro "transparencia" en true a la hora de crear el mapa. */
/*
const map = M.map({
  container: "mapjs",
  layers: ["WMS*Municipios*http://www.ideandalucia.es/wms/dea100_divisiones_administrativas?*terminos_municipales*true*true"],
  controls: ['layerswitcher'],
});

const wms = new M.layer.WMS('WMS*fondo*http://www.ign.es/wms-inspire/mapa-raster');

const geojson = new M.layer.GeoJSON({
  name: 'Provincias',
  url: 'http://geostematicos-sigc.juntadeandalucia.es/geoserver/tematicos/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=tematicos:Provincias&maxFeatures=50&outputFormat=application/json',
});

map.addLayers([wms, geojson]);

const mp = new Magnify({ position: 'TL' });
*/



/* CASO 4 Capas que existen*/
/*
const map = M.map({
  container: "mapjs",
  layers: ["WMS*Municipios*http://www.ideandalucia.es/wms/dea100_divisiones_administrativas?*terminos_municipales*false*true"],
  controls: ['layerswitcher'],
});

const wms = new M.layer.WMS('WMS*fondo*http://www.ign.es/wms-inspire/mapa-raster');

const geojson = new M.layer.GeoJSON({
  name: 'Provincias',
  url: 'http://geostematicos-sigc.juntadeandalucia.es/geoserver/tematicos/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=tematicos:Provincias&maxFeatures=50&outputFormat=application/json',
});

map.addLayers([wms, geojson]);

const mp = new Magnify({ position: 'TL', layers: 'Provincias,fondo' });
*/


/* Prueba de wmts*/
/*
const map = M.map({
  container: "mapjs",
  layers: ["WMS*Municipios*http://www.ideandalucia.es/wms/dea100_divisiones_administrativas?*terminos_municipales*false*true"],
  controls: ['layerswitcher'],
});

let wmts = new M.layer.WMTS({
  url: "http://www.ideandalucia.es/geowebcache/service/wmts",
  name: "toporaster",
  matrixSet: "EPSG:25830",
  legend: "Toporaster"
}, {
  format: 'image/png'
});
map.addWMTS(wmts);

const mp = new Magnify({ position: 'TL', layers: 'toporaster' });
*/

map.addPlugin(mp);

window.map = map;
