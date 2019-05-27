import {DatePicker} from "antd";
import {useContext} from "react";
import MapContext from "../../context/MapContext";
import {decideMarkerURL} from "../reducers/markerReducer/lib/helpers";
interface ArrivalDatePickerProps {}

const ArrivalDatePicker: React.SFC<ArrivalDatePickerProps> = () => {
  const {markState, markDispatch} = useContext(MapContext);
  const {activeMarker} = markState;
  function onChange(value: object) {
    const activeMarkerWithNewDate = {
      ...activeMarker,
      date: value,
    };
    markDispatch({
      type: "UPDATE_MARKER",
      marker: activeMarker,
      props: {
        date: value,
        url: decideMarkerURL(activeMarkerWithNewDate),
      },
    });
  }

  return (
    <DatePicker
      onChange={onChange}
      showTime
      format="YYYY-MM-DD HH:mm:ss"
      value={activeMarker.date}
      onOk={() => {}}
      placeholder="Input Arrival Date"
    />
  );
};

export default ArrivalDatePicker;
