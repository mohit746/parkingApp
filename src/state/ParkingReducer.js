import {combineReducers} from 'redux';

const INITIAL_STATE = {
  totalSlots: 100,
  parkedVehicle: [],
};

const parkingReducer = (state = INITIAL_STATE, action) => {
  let {totalSlots, parkedVehicle} = state;
  let newState;
  switch (action.type) {
    case 'PARK':
      parkedVehicle.push(action.payload);
      newState = {totalSlots, parkedVehicle};
      return newState;
    case 'UNPARK':
      console.log('TAG', action.payload);
      for (var i = 0; i < parkedVehicle.length; i++) {
        if (parkedVehicle[i].vehicleNumber == action.payload) {
          console.log('TAG', 'removing the element at: ' + i);
          parkedVehicle.splice(i, 1);
        }
      }
      console.log('TG', 'updated list : ' + JSON.stringify(parkedVehicle));
      newState = {totalSlots, parkedVehicle};
      return newState;
    default:
      return state;
  }
};

export default combineReducers({
  parking: parkingReducer,
});
