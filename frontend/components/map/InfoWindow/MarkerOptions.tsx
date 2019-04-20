import {Button, Checkbox, Modal, message} from "antd";
import {useContext} from "react";
import MapContext from "../../context/MapContext";
const confirm = Modal.confirm;
interface Props {}

const MarkerOptions: React.SFC<Props> = () => {
  const {updateMarkerProps, activeMarker} = useContext(MapContext);
  return (
    <>
      <Checkbox
        style={{marginBottom: "12px"}}
        checked={activeMarker.draggable}
        onClick={() => {
          updateMarkerProps(activeMarker, {
            draggable: !activeMarker.draggable,
          });
        }}
      >
        Marker Draggable
      </Checkbox>
      <Button
        type="danger"
        onClick={() => {
          confirm({
            title: "Are you sure delete this marker?",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
              message.info(`Marker has been deleted!`);
            },
          });
        }}
      >
        Delete Marker?
      </Button>
    </>
  );
};

export default MarkerOptions;
