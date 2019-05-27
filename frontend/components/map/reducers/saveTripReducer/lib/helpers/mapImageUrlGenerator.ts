import {GoogleLinkImageProps} from "../interfaces";

export default ({
  lat,
  lng,
  width,
  height,
  zoom,
  imgFormat,
  mapType,
  apiKey,
}: GoogleLinkImageProps) => {
  return `https://maps.googleapis.com/maps/api/staticmap?\
center=${lat},${lng}&\
size=${width}x${height}&\
zoom=${zoom}&\
format=${imgFormat}&\
maptype=${mapType}&\
key=${apiKey}`;
};
