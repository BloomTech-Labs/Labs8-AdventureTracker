export default (setUserPosition: Function) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const {coords} = position;
      setUserPosition({
        position: {
          lat: coords.latitude,
          lng: coords.longitude,
        },
        isVisible: true,
      });
    });
    return {status: "success"};
  } else {
    return {status: "failed"};
  }
};
