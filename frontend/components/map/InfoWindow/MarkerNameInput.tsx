import {useContext} from "react";
import MapContext from "../../context/MapContext";
import {Input, Tooltip} from "antd";
interface MarkerNameInputProps {}

const MarkerNameInput: React.SFC<MarkerNameInputProps> = () => {
  const {markState, markDispatch} = useContext(MapContext);
  const {activeMarker} = markState;
  const maxLen = 20;
  return (
    <Tooltip
      trigger={["focus"]}
      title={`Label Name - ${maxLen -
        activeMarker.label.length} characters left`}
      placement="topLeft"
    >
      <Input
        placeholder={"Marker label name"}
        maxLength={maxLen}
        value={activeMarker.label}
        onChange={(e: any) => {
          markDispatch({
            type: "UPDATE_MARKER",
            marker: activeMarker,
            props: {
              label: e.target.label,
            },
          });
          // updateMarkerLabelName(activeMarker, e.target.value);
        }}
      />
    </Tooltip>
  );
};

export default MarkerNameInput;
