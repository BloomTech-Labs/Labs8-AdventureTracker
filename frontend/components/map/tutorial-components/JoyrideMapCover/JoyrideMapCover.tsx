export interface JoyrideMapCoverProps {
  [key: string]: any;
}

const JoyrideMapCover: React.SFC<JoyrideMapCoverProps> = props => {
  return (
    <div
      {...props}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default JoyrideMapCover;
