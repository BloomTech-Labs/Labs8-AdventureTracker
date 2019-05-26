import {useEffect, useState, useRef} from "react";

const loadImage = (src: string) =>
  new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      resolve();
    };
    image.onabort = () => {
      reject();
    };
    image.src = src;
  });

export interface BlurLazyImageProps {
  src: string;
  base64: string;
  alt: string;
  [key: string]: any;
}

const BlurLazyImage: React.SFC<BlurLazyImageProps> = (
  props: BlurLazyImageProps,
) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);
  let observer: IntersectionObserver;

  useEffect(() => {
    if (imgRef) {
      // console.log(imgRef.current);
      observer = new IntersectionObserver(onIntersection);
      observer.observe(imgRef.current as any);
    }
  }, [imgRef]);

  const onIntersection = async (entries: any[]) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        if (observer) {
          observer.disconnect();
          if (entry.target.getAttribute("src")) {
            await awaitImage();
          }
        }
      }
    }
  };
  const awaitImage = async () => {
    try {
      await loadImage(props.src);
      setLoaded(true);
    } catch {
      console.error(`Was not able to load ${props.src}`);
    }
  };
  const {src, base64, alt} = props;
  const currentSrc = loaded ? src : base64;

  return (
    <img {...props} alt={alt ? alt : ""} src={currentSrc} ref={imgRef} />
  );
};

export default BlurLazyImage;
