import React from 'react';
import { Image } from 'react-native';
import { Button, Icon } from 'native-base';
import { MapView } from 'expo';

import { ARRAY_FIRST, ARRAY_STEP } from 'constants/common-data';
import { formatLanguage } from 'common/language';

import { styles } from './map.style';

import Automobile from 'assets/images/automobile.png';

const DEFAULT_LATITUDE = 10.8082753;
const DEFAULT_LONGITUDE = 106.6701597;
const DEFAULT_LATITUDE_DELTA = 0.09;
const DEFAULT_LONGITUDE_DELTA = 0.16;
const FOCUS_LATITUDE_DELTA = 0.009;
const FOCUS_LONGITUDE_DELTA = 0.016;
const ANIMATION_TIME = 1000;

const DEFAULT_REGION = {
  latitude: DEFAULT_LATITUDE,
  longitude: DEFAULT_LONGITUDE,
  latitudeDelta: DEFAULT_LATITUDE_DELTA,
  longitudeDelta: DEFAULT_LONGITUDE_DELTA
};

const DEFAULT_COORDINATE = {
  latitude: DEFAULT_LATITUDE,
  longitude: DEFAULT_LONGITUDE
};

export default class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: props.initialRegion || DEFAULT_REGION,
      vehicleCoordinate: new MapView.AnimatedRegion(props.initialVehicleCoordinate || DEFAULT_COORDINATE)
    };

    this.map = React.createRef();
  }

  /**
   * Move vehicle with smooth animation to new position
   * @param {Object} coordinate     New coordinate { latitude, longitude }
   * @return {undefined}
   */
  moveVehicle = coordinate => {
    this.state.vehicleCoordinate.timing(coordinate).start();
  }

  /**
   * Move map with smooth animation to new position
   * @param {Object} region       New region { latitude, longitude, latitudeDelta(optional), longitudeDelta(optional) }
   * @return {undefined}
   */
  moveMap = ({
    latitude,
    longitude,
    latitudeDelta = FOCUS_LATITUDE_DELTA,
    longitudeDelta = FOCUS_LONGITUDE_DELTA
  }) => {
    const newRegion = { latitude, longitude, latitudeDelta, longitudeDelta };

    this.map.current.animateToRegion(newRegion, ANIMATION_TIME);
  }

  /**
   * Move map with smooth animation to current vehicle
   * @return {undefined}
   */
  moveToVehicle = () => {
    const { latitude, longitude } = this.state.vehicleCoordinate;
    const currentLat = latitude.__getValue();
    const currentLng = longitude.__getValue();

    this.moveMap({ latitude: currentLat, longitude: currentLng });
  }

  render() {
    const { region, vehicleCoordinate } = this.state;
    const {
      children,
      handleChooseVehicle,
      handleChooseMarker,
      handleChooseMap,
      markers = [],
      directions = []
    } = this.props;
    const firstDirection = directions[ARRAY_FIRST];
    const otherDirections = directions.slice(ARRAY_STEP);

    return (
      <React.Fragment>
        <MapView
          ref={this.map}
          style={{ flex: 1 }}
          initialRegion={region}
          onRegionChange={newRegion => this.setState({ region: newRegion })}
          onPress={handleChooseMap}
        >
          {markers.map(({ image, ...marker }, index) => {
            return image
            ? <MapView.Marker
                key={index}
                onPress={() => handleChooseMarker(index)}
                {...marker}
              >
                <Image style={styles.marker} source={image} resizeMode='contain' />
              </MapView.Marker>
            : <MapView.Marker
                key={index}
                onPress={() => handleChooseMarker(index)}
                {...marker}
              />;
          })}

          {otherDirections.map((direction, index) => (
            <MapView.Polyline
              key={index}
              coordinates={direction}
              strokeWidth={3}
              strokeColor='#CE93D8'
            />
          ))}

          {firstDirection &&
            <MapView.Polyline
              coordinates={firstDirection}
              strokeWidth={5}
              strokeColor='#EC407A'
            />
          }

          {children}

          <MapView.Marker.Animated
            coordinate={vehicleCoordinate}
            title={formatLanguage('DRIVER')}
            description={formatLanguage('GOING')}
            anchor={{ x: 0.5, y: 0.5 }}
            onPress={handleChooseVehicle}
          >
            <Image style={styles.vehicle} source={Automobile} resizeMode='contain' />
          </MapView.Marker.Animated>
        </MapView>
        <Button style={styles.locateButton} onPress={this.moveToVehicle} large rounded>
          <Icon style={styles.locateIcon} android='md-locate' ios='ios-locate' />
        </Button>
      </React.Fragment>
    );
  }
}
