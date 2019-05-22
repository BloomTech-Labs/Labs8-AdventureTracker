import {DatePicker} from "antd";
import {useContext} from "react";
import MapContext from "../../context/MapContext";
interface ArrivalDatePickerProps {}

const ArrivalDatePicker: React.SFC<ArrivalDatePickerProps> = () => {
  const {markState, markDispatch} = useContext(MapContext);
  const {activeMarker} = markState;
  function onChange(value: object, dateString: string) {
    // console.log(typeof value, typeof dateString);
    // console.log(value, dateString);
    markDispatch({
      type: "UPDATE_MARKER",
      marker: activeMarker,
      props: {
        date: value,
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
