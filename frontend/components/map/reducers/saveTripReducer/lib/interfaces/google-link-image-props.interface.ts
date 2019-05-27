type ImageFormat = "png" | "jpg";

type MapType = "roadmap";

export interface GoogleLinkImageProps {
  lat: number | string;
  lng: number | string;
  width: number | string;
  height: number | string;
  zoom: number | string;
  imgFormat: ImageFormat;
  mapType: MapType;
  apiKey: string;
}
