export const parkVehicle = vehicleDetail => ({
  type: 'PARK',
  payload: vehicleDetail,
});
export const unparkVehicle = vehicleNumber => ({
  type: 'UNPARK',
  payload: vehicleNumber,
});
