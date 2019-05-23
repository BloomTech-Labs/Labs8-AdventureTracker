import {useEffect, useState, useRef} from "react";

const loadImage = (src: string) =>
  new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      resolve();
    };

    image.src = src;
  });
export interface BlurImageProps {
  src: string;
  base64: string;
  alt: string;
  [key: string]: any;
}

const BlurImage: React.SFC<BlurImageProps> = (props: BlurImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);
  useEffect(() => {
    awaitImage();
  }, []);

  const awaitImage = async () => {
    try {
      console.log(imgRef);
      await loadImage(props.src);
      setLoaded(true);
    } catch {
      console.error(`Was not able to load ${props.src}`);
    }
  };
  const {src, base64, alt} = props;
  const currentSrc = loaded ? src : base64;

  return <img {...props} alt={alt} src={currentSrc} ref={imgRef} />;
};

export default BlurImage;
