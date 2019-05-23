// import {Marker, Polyline} from "../interfaces";

type ImageFormat = "png" | "jpg";

type MapType = "roadmap";
interface GeneratorProps {
    lat: number | string,
    lng: number | string,
    width: number | string,
    height: number | string,
    zoom: number | string,
    imgFormat: ImageFormat,
    mapType: MapType,
    apiKey: string,
}
export default ({
    lat,
  lng,
  width,
  height,
  zoom,
  imgFormat,
  mapType,
  apiKey,
}: GeneratorProps) => {
  return `https://maps.googleapis.com/maps/api/staticmap?\
center=${lat},${lng}&\
size=${width}x${height}&\
zoom=${zoom}&\
format=${imgFormat}&\
maptype=${mapType}&\
key=${apiKey}`;
};
