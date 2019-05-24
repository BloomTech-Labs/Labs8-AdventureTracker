import {Progress} from "antd";
import styled from "styled-components";
import {Marker, Theme} from "../interfaces/index";
import calculateForProgress from "./calculateForProgress";

type PropTypes = {
  markers: Marker[];
};
const ProgressWrapper = styled(Progress)`
  position: absolute;
  top: 3%;
  left: 3%;
  background: ${(props: Theme) => props.theme.white};
  border-radius: 50%;
`;

const ProgressCircle: React.SFC<PropTypes> = ({markers}) => {
  const markerCalculations = calculateForProgress(markers);
  return (
    <ProgressWrapper
      type="circle"
      percent={markerCalculations.getPercentProgress}
      strokeWidth={15}
      strokeLinecap={"square"}
      format={(): string => {
        return markers.length > 0
          ? `${markerCalculations.getMarkersReached} / ${markers.length}`
          : `0 / 0`;
      }}
      data-testid="progress-circle"
    />
  );
};

export {ProgressCircle};
