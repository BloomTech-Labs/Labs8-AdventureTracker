export default (setUserPosition: Function) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const {coords} = position;
      setUserPosition({
        lat: coords.latitude,
        lng: coords.longitude,
      });
    });
    return {status: "success"};
  } else {
    return {status: "failed"};
  }
};
