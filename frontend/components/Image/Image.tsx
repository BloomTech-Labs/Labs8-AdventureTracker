import {useEffect, useState} from "react";

const loadImageWithPromiseTimeout = (src: string) =>
  new Promise((resolve, reject) => {
    const image = new Image();

    const timeout = setTimeout(() => {
      image.onload = null;
      reject();
    }, 10000);

    image.onload = () => {
      clearTimeout(timeout);
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
  useEffect(() => {
    awaitImage();
  }, []);

  const awaitImage = async () => {
    try {
      await loadImageWithPromiseTimeout(props.src);
      setLoaded(true);
    } catch {
      console.error(`Unable to load ${props.src} in 10s`);
    }
  };
  const {src, base64, alt} = props;
  const currentSrc = loaded ? src : base64;

  return <img {...props} alt={alt} src={currentSrc} />;
};

export default BlurImage;
