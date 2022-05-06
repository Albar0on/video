// import controls from"../js/three.min.js";
// import { MapControls, MapControlsUI } from "@here/harp-map-controls";
// import  three from "https://unpkg.com/three/build/three.min.js";
// import { GeoCoordinates, mercatorProjection, sphereProjection } from "@here/harp-geoutils";
// import { CopyrightElementHandler, MapView, MapViewEventNames } from "@here/harp-mapview";
// import { VectorTileDataSource } from "@here/harp-vectortile-datasource";
// import { GUI } from "dat.gui";

const canvas = document.getElementById('map');
const mapView = new harp.MapView({
   canvas:canvas,
   theme: "https://unpkg.com/@here/harp-map-theme@latest/resources/berlin_tilezen_base.json",
   projection: harp.sphereProjection,
});

// center the camera to dubai
mapView.lookAt({

  target: new harp.GeoCoordinates(25.21251, 55.2714711),
  zoomLevel: 3,
  tilt: 25,
});

let heading = 0;
mapView.addEventListener("", () => {
  mapView.lookAt({ heading });
  heading += 0.1;
});
mapView.beginAnimation();

const mapControls = new harp.MapControls(mapView);
// mapControls.maxTiltAngle = 90;
const ui = new harp.MapControlsUI(mapControls);
canvas.parentElement.appendChild(ui.domElement);





mapView.resize(window.innerWidth, window.innerHeight);
window.onresize = () => mapView.resize(window.innerWidth, window.innerHeight);

const vectorTileDataSource = new harp.VectorTileDataSource({
   authenticationCode: 'nkUx7_cDkChlAXpIlSdaBeZxvUyHHIwSHg2F1CPDpWk',

});


mapView.addDataSource(vectorTileDataSource);


const options = { tilt:25, distance:3000};
const coordinates = new harp.GeoCoordinates(1.278676, 103.850216);
let azimuth = 300;
map.addEventListener(harp.MapViewEventsNames.Render,() => {
   map.lookAt(coordinates,options.distance,options.tilt,(azimuth +=0.1))
})
map.beginAnimation()


