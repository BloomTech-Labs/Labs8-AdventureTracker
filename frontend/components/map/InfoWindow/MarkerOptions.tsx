import {Button, Checkbox, Modal, message} from "antd";
import {useContext} from "react";
import MapContext from "../../context/MapContext";
const confirm = Modal.confirm;
interface Props {}

const MarkerOptions: React.SFC<Props> = () => {
  // const {
  //   updateMarkerProps,
  //   activeMarker,
  //   deleteMarker,
  //   updateAllMarkerLabels,
  //   clearMarkerId,
  //   setInfoWindowOpen,
  // } = useContext(MapContext);
  const {markState, markDispatch, setInfoWindowOpen} = useContext(
    MapContext,
  );
  const {activeMarker} = markState;
  return (
    <>
      <Checkbox
        style={{marginBottom: "12px"}}
        checked={activeMarker.draggable}
        onClick={() => {
          markDispatch({
            type: "UPDATE_MARKER",
            marker: activeMarker,
            props: {
              draggable: !activeMarker.draggable,
            },
          });
        }}
      >
        Marker Draggable
      </Checkbox>
      <Button
        type="danger"
        onClick={() => {
          confirm({
            title: "Are you sure you want to delete this marker?",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
              message.info(`Marker has been deleted!`);
              markDispatch({
                type: "DELETE_MARKER",
                marker: activeMarker,
              });
              setInfoWindowOpen(false);
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
