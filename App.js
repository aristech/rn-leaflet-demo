/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {
  INFINITE_ANIMATION_ITERATIONS,
  WebViewLeaflet,
  WebViewLeafletEvents,
  AnimationType,
  MapShapeType,
} from 'rn-leaflet';

const App = () => {
  const [mapCenterPosition, setMapCenterPosition] = useState({
    lat: 36.850769,
    lng: -76.285873,
  });
  const webview = useRef();
  const getDuration = () => Math.floor(Math.random() * 3) + 1;
  const getDelay = () => Math.floor(Math.random()) * 0.5;
  const iterationCount = 'infinite';
  const [ownPosition, setOwnPosition] = useState({
    lat: 37.9908164,
    lng: 23.6682993,
  });

  const onMessageReceived = (message) => {
    switch (message.event) {
      case WebViewLeafletEvents.ON_MAP_MARKER_CLICKED:
        Alert.alert(
          `Map Marker Touched, ID: ${message.payload.mapMarkerID || 'unknown'}`,
        );

        break;
      case WebViewLeafletEvents.ON_MAP_TOUCHED:
        const position = message.payload.touchLatLng;
        Alert.alert(`Map Touched at:`, `${position.lat}, ${position.lng}`);
        break;
      default:
        console.log('App received', message);
    }
  };
  const locations = [
    {
      icon: '⭐',
      position: {lat: 38.895, lng: -77.0366},
      name: 'Washington DC',
    },
    {
      icon: '🎢',
      position: {lat: 37.8399, lng: -77.4442},
      name: 'Kings Dominion',
    },
    {
      icon: '🎢',
      position: {lat: 37.23652, lng: -76.646},
      name: 'Busch Gardens Williamsburg',
    },
    {
      icon: '⚓',
      position: {lat: 36.8477, lng: -76.2951},
      name: 'USS Wisconsin (BB-64)',
    },
    {
      icon: '🏰',
      position: {lat: 28.3852, lng: -81.5639},
      name: 'Walt Disney World',
    },
  ];

  return (
    <>
      <StatusBar barStyle="dark-content" />

      <View style={{flex: 1}}>
        {
          <WebViewLeaflet
            ref={webview}
            backgroundColor={'green'}
            onMessageReceived={onMessageReceived}
            mapLayers={[
              {
                attribution:
                  '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                baseLayerIsChecked: true,
                baseLayerName: 'OpenStreetMap.Mapnik',
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
              },
              // {
              //   baseLayerName: 'Mapbox',
              //   //url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
              //   url: `https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${mapboxToken}`,
              //   attribution:
              //     '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors',
              // },
            ]}
            mapMarkers={[
              ...locations.map((location) => {
                return {
                  id: location.name.replace(' ', '-'),
                  position: location.position,
                  icon: location.icon,
                };
              }),
              {
                id: '1',
                position: {lat: 36.46410354, lng: -75.6432701},
                icon:
                  'https://www.catster.com/wp-content/uploads/2018/07/Savannah-cat-long-body-shot.jpg',
                size: [32, 32],
                animation: {
                  duration: getDuration(),
                  delay: getDelay(),
                  iterationCount,
                  type: AnimationType.BOUNCE,
                },
              },
            ]}
            mapShapes={[
              {
                shapeType: MapShapeType.CIRCLE,
                color: '#123123',
                id: '1',
                center: {lat: 34.225727, lng: -77.94471},
                radius: 2000,
              },
              {
                shapeType: MapShapeType.CIRCLE_MARKER,
                color: 'red',
                id: '2',
                center: {lat: 38.437424, lng: -78.867912},
                radius: 15,
              },
              {
                shapeType: MapShapeType.POLYGON,
                color: 'blue',
                id: '3',
                positions: [
                  {lat: 38.80118939192329, lng: -74.69604492187501},
                  {lat: 38.19502155795575, lng: -74.65209960937501},
                  {lat: 39.07890809706475, lng: -71.46606445312501},
                ],
              },
              {
                shapeType: MapShapeType.POLYGON,
                color: 'violet',
                id: '4',
                positions: [
                  [
                    {lat: 37.13842453422676, lng: -74.28955078125001},
                    {lat: 36.4433803110554, lng: -74.26208496093751},
                    {lat: 36.43896124085948, lng: -73.00964355468751},
                    {lat: 36.43896124085948, lng: -73.00964355468751},
                  ],
                  [
                    {lat: 37.505368263398104, lng: -72.38891601562501},
                    {lat: 37.309014074275915, lng: -71.96594238281251},
                    {lat: 36.69044623523481, lng: -71.87805175781251},
                    {lat: 36.58024660149866, lng: -72.75146484375001},
                    {lat: 37.36579146999664, lng: -72.88330078125001},
                  ],
                ],
              },
              {
                shapeType: MapShapeType.POLYLINE,
                color: 'orange',
                id: '5',
                positions: [
                  {lat: 35.411438052435486, lng: -78.67858886718751},
                  {lat: 35.9602229692967, lng: -79.18945312500001},
                  {lat: 35.97356075349624, lng: -78.30505371093751},
                ],
              },
              {
                shapeType: MapShapeType.POLYLINE,
                color: 'purple',
                id: '5a',
                positions: [
                  [
                    {lat: 36.36822190085111, lng: -79.26086425781251},
                    {lat: 36.659606226479696, lng: -79.28833007812501},
                    {lat: 36.721273880045004, lng: -79.81018066406251},
                  ],
                  [
                    {lat: 35.43381992014202, lng: -79.79370117187501},
                    {lat: 35.44277092585766, lng: -81.23840332031251},
                    {lat: 35.007502842952896, lng: -80.837402343750017},
                  ],
                ],
              },
              {
                shapeType: MapShapeType.RECTANGLE,
                color: 'yellow',
                id: '6',
                bounds: [
                  {lat: 36.5, lng: -75.7},
                  {lat: 38.01, lng: -73.13},
                ],
              },
            ]}
            mapCenterPosition={mapCenterPosition}
            ownPositionMarker={
              ownPosition && {
                position: ownPosition,
                icon: '❤️',
                size: [32, 32],
                animation: {
                  duration: getDuration(),
                  delay: getDelay(),
                  iterationCount,
                  type: AnimationType.BOUNCE,
                },
              }
            }
            zoom={7}
          />
        }
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    backgroundColor: 'dodgerblue',
    paddingHorizontal: 10,
    paddingTop: 30,
    width: '100%',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  mapControls: {
    backgroundColor: 'rgba(255,255,255,.5)',
    borderRadius: 5,
    bottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 0,
    marginHorizontal: 10,
    padding: 7,
    position: 'absolute',
    right: 0,
  },
  mapButton: {
    alignItems: 'center',
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  mapButtonEmoji: {
    fontSize: 28,
  },
});

export default App;
