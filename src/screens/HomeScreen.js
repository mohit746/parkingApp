import React, {useState} from 'react';
import {Text, View, TouchableOpacity, FlatList, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {unparkVehicle} from '../state/ParkingActions';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = props => {
  const [searchText, setSearchText] = useState('');
  const renderItem = item => {
    console.log('TAG', 'item: ' + JSON.stringify(item));
    if (
      searchText == '' ||
      (searchText != '' && item.vehicleNumber == searchText)
    ) {
      console.log('to search : ' + searchText);
      console.log('found... ' + item.vehicleNumber);
      return (
        <View
          style={{
            borderRadius: 1,
            borderWidth: 0.4,
            width: '80%',
            alignSelf: 'center',
            flexDirection: 'row',
          }}>
          <View>
            <Text style={{marginStart: 20, fontSize: 18}}>
              Owner Name: {item.vehicleOwner}
            </Text>
            <Text style={{marginStart: 20, fontSize: 18}}>
              Vehicle Number: {item.vehicleNumber}
            </Text>
            <Text style={{marginStart: 20, fontSize: 18}}>
              Type: {item.vehicleType}
            </Text>
          </View>
          <TouchableOpacity
            style={{position: 'absolute', right: 0}}
            onPress={() => {
              props.unparkVehicle(item.vehicleNumber);
            }}>
            <Icon name={'remove'} size={30} />
          </TouchableOpacity>
        </View>
      );
    }
  };
  return (
    <View style={{flex: 1}}>
      <View>
        <Text
          style={{
            fontSize: 20,
            fontStyle: 'italic',
            textAlign: 'center',
            marginVertical: 10,
          }}>
          Total slots: {props.parking.totalSlots}
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontStyle: 'italic',
            textAlign: 'center',
            marginVertical: 10,
          }}>
          Available slots:
          {props.parking.totalSlots - props.parking.parkedVehicle.length}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: 'grey',
            borderRadius: 10,
            borderWidth: 1,
            width: '40%',
            height: '20%',
            justifyContent: 'center',
            alignSelf: 'center',
            marginVertical: 10,
          }}
          onPress={() => {
            props.navigation.navigate('VehicleDetail');
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              textAlign: 'center',
            }}>
            PARK VEHICLE
          </Text>
        </TouchableOpacity>
        <TextInput
          style={{
            fontSize: 15,
            borderRadius: 10,
            borderWidth: 1,
            width: '90%',
            marginVertical: 10,
            alignSelf: 'center',
          }}
          value={searchText}
          placeholder={'Search vehicle number'}
          editable={true}
          keyboardType="default"
          underlineColorAndroid="transparent"
          onChangeText={value => {
            setSearchText(value);
          }}
        />
        <FlatList
          style={{
            marginVertical: 10,
          }}
          data={props.parking.parkedVehicle}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={item => item.patientId}
        />
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
      unparkVehicle,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
