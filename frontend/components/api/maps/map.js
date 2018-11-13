require(['esri/Map', 'esri/views/SceneView', 'esri/layers/TileLayer'], function(
  Map,
  SceneView,
  TileLayer
) {
  // Create the transportation layer
  var transportationLayer = new TileLayer({
    url: 'http://server.arcgis.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer',
    id: 'streets',
    opacity: 0.7
  });

  // Create the housing layer
  var housinLayer = new TileLayer({
    url:
      'https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/New_York_Housing_Density/MapServer',
    id: 'ny-housing'
  });

  // Create the Map
  var map = new Map({
    basemap: 'oceans',
    layers: [housingLayer] // Layers can be added as an array to the map's constructor
  });

  map.layers.add(transportationLayer);

  // Create the SceneView
  var view = new SceneView({
    container: 'viewDiv',
    map: map
  });

  // Create a variable referencing the checkbox node
  var streetsLayerToggle = document.getElementById('streetsLayer');

  // Listen to the change event for the checkbox
  streetsLayerToggle.addEventListener('change', function() {
    // When the checkbox is checked (true), set the layer's visibility to true
    transportationLayer.visible = streetsLayerToggle.checked;
  });

  // This event fires each time a layer's LayerView is created for the '
  // specified view instance
  view.on('layerview-create', function(event) {
    if (event.layer.id === 'ny-housing') {
      // Explore the properties of the housing layer's layer view here
      console.log('LayerView for New York housing density created!', event.layerView);
    }
    if (event.layer.id === 'streets') {
      // Explore the properties of the transportation layer's layer view here
      console.log('LayerView for streets created!', event.layerView);
    }
  });

  // When the layer's promise resolves, animate the view to the layer's fullExtent
  housingLayer.when(function() {
    view.goTo(housingLayer.fullExtent);
  });
});
