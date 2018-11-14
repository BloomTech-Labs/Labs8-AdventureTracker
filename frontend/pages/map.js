require([
  'esri/Map',
  'esri/views/MapView',
  'esri/widgets/Locate',
  'esri/widgets/Track',
  'esri/widgets/Compass',
  'esri/Graphic',
  'dojo/domReady!'
], function(Map, MapView, Locate, Track, Compass, Graphic) {
  var map = new Map({
    basemap: 'streets',
    zoom: 15
  });

  var view = new MapView({
    container: 'viewDiv',
    map: map,
    zoom: 3,
    center: [-99.14725260912257, 36.48617178360141]
  });

  var locate = new Locate({
    view: view,
    useHeadingEnabled: false
    // goToOverride: function(view, options) {
    //   options.target.scale = 1500;
    //   return view.goTo(options.target);
    // }
  });
  view.ui.add(locate, 'top-left');

  var track = new Track({
    view: view,
    graphic: new Graphic({
      symbol: {
        type: 'simple-marker',
        size: '9px',
        color: 'green',
        outline: {
          color: '#efefef',
          width: '1.2px'
        }
      }
    }),
    useHeadingEnabled: false,
    goToLocationEnabed: false,
    goToOverride: function(view, options) {
      options.target.scale = null;
      return view.goTo(options);
    }
  });
  view.ui.add(track, 'top-left');

  view.when(function() {
    // track.start();
    // view.zoom = 12;
  });

  var compass = new Compass({
    view: view
  });
  // adds the compass to the top left corner of the MapView
  view.ui.add(compass, 'top-left');
});
