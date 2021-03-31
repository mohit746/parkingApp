import React, {useState} from 'react';
import {Text, View, TextInput, TouchableOpacity, Alert} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {parkVehicle} from '../state/ParkingActions';
import Icon from 'react-native-vector-icons/Fontisto';

const VehicleDetail = props => {
  console.log('VehicleDetail: ', 'props:------ ' + JSON.stringify(props));
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleOwner, setVehicleOwner] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const handleSubmit = () => {
    if (vehicleNumber && vehicleOwner && vehicleType) {
      const data = {
        vehicleNumber: vehicleNumber,
        vehicleOwner: vehicleOwner,
        vehicleType: vehicleType,
      };
      props.parkVehicle(data);
      Alert.alert(
        '',
        'Vehicle Parked',
        [
          {
            text: 'Ok',
            onPress: () => props.navigation.goBack(),
            style: 'Ok',
          },
        ],
        {
          cancelable: false,
        },
      );
    }
  };
  return (
    <View style={{height: '100%'}}>
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 20}}>Enter vehicle details</Text>
        <TextInput
          style={{
            fontSize: 15,
            borderRadius: 10,
            borderWidth: 1,
            width: '90%',
            height: '10%',
            marginVertical: 10,
          }}
          value={vehicleOwner}
          placeholder={'Enter Owner Name'}
          editable={true}
          keyboardType="default"
          underlineColorAndroid="transparent"
          onChangeText={value => {
            setVehicleOwner(value);
          }}
        />
        <TextInput
          style={{
            fontSize: 15,
            borderRadius: 10,
            borderWidth: 1,
            width: '90%',
            height: '10%',
            marginVertical: 10,
          }}
          value={vehicleNumber}
          placeholder={'Enter vehicle number'}
          editable={true}
          keyboardType="default"
          underlineColorAndroid="transparent"
          onChangeText={value => {
            setVehicleNumber(value);
          }}
        />

        <View style={{width: '90%', marginVertical: 10}}>
          <Text style={{marginVertical: 10, fontSize: 20}}>Vehicle type</Text>
          <TouchableOpacity
            style={{flexDirection: 'row', marginVertical: 10}}
            onPress={() => {
              setVehicleType('Car');
            }}>
            <Icon
              name={
                vehicleType == 'Car' ? 'radio-btn-active' : 'radio-btn-passive'
              }
              size={20}
            />
            <Text style={{marginStart: 20, fontSize: 18}}>Car</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'row', marginVertical: 10}}
            onPress={() => {
              setVehicleType('Bike');
            }}>
            <Icon
              name={
                vehicleType == 'Bike' ? 'radio-btn-active' : 'radio-btn-passive'
              }
              size={20}
            />
            <Text style={{marginStart: 20, fontSize: 18}}>Bike</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'row', marginVertical: 10}}
            onPress={() => {
              setVehicleType('Truck');
            }}>
            <Icon
              name={
                vehicleType == 'Truck'
                  ? 'radio-btn-active'
                  : 'radio-btn-passive'
              }
              size={20}
            />
            <Text style={{marginStart: 20, fontSize: 18}}>Truck</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: 'grey',
            borderRadius: 10,
            borderWidth: 1,
            width: '60%',
            height: '12%',
            justifyContent: 'center',
          }}
          onPress={() => {
            handleSubmit();
          }}>
          <Text
            style={{
              fontSize: 20,
              color: 'white',
              textAlign: 'center',
            }}>
            PARK
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  const {parking} = state;
  return {parking};
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      parkVehicle,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(VehicleDetail);
