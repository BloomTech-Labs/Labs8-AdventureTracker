import { InfoWindow } from 'react-google-maps';
import DatePicker from 'react-datepicker';
import { Mutation } from 'react-apollo';
import 'react-datepicker/dist/react-datepicker.css';
import {
  UPDATE_MARKER_MUTATION,
  UPDATE_CHECKIN_MUTATION,
  DELETE_MARKER_MUTATION
} from './Mutations';
import {
  Label,
  ReachedCheckBox,
  ButtonGroup,
  DeleteBtn,
  SaveBtn,
  MarkerNameLabel,
  MarkerNameBox,
  MarkerNameGroup,
  InfoWrapper,
  CheckedInGroup,
  CheckboxGroup,
  CheckedIn,
  CheckInBox,
  ETAGroup,
  ETA
} from './styles/presentational';

const InfoWindowComponent = props => {
  return (
    <InfoWindow
      position={props.position}
      onCloseClick={() => {
        props.toggleInfoWindow();
        props.clearActiveMarker();
        props.clearMarkerInfo();
      }}
    >
      <InfoWrapper>
        <div className="container">
          <h2>Click on the markers to give your waypoints a name and ETA</h2>
        </div>
        <MarkerNameGroup>
          <MarkerNameLabel htmlFor="location">Checkpoint Name?</MarkerNameLabel>
          <MarkerNameBox
            name="checkpointName"
            onChange={props.inputHandler}
            value={props.checkpointName}
            id="location"
            type="text"
          />
        </MarkerNameGroup>
        <ETAGroup>
          <ETA>ETA: </ETA>
          <DatePicker
            selected={props.etaTime}
            onChange={props.setEtaTime}
            showTimeSelect
            timeIntervals={15}
            dateFormat="MM/dd/YYYY, h:mm aa"
            timeCaption="Time"
            onKeyDown={e => {
              e.preventDefault();
            }}
          />
          {/* <input type="time" name="etaTime" value={props.etaTime} onChange={props.inputHandler} /> */}
          <Mutation
            mutation={UPDATE_MARKER_MUTATION}
            variables={{
              markerId: props.activeMarker.id,
              status: props.activeMarker.status,
              etaTime: props.etaTime,
              checkpointName: props.checkpointName
            }}
            // todo: add refetchQueries
            // refetchQueries={[{ query: CURRENT_MARKER_QUERY }]}
          >
            {(updateMarker, { error, loading }) => {
              if (loading) {
                return <p>{loading}</p>;
              }
              if (error) {
                return <p>{error}</p>;
              }
              return (
                <SaveBtn
                  onClick={async () => {
                    const markerInfo = await updateMarker();
                    props.saveMarkerInfo(markerInfo);
                  }}
                >
                  Save Marker Info
                </SaveBtn>
              );
            }}
          </Mutation>
        </ETAGroup>
        <CheckboxGroup>
          <Label htmlFor="reached-checkbox">Reached Checkpoint?</Label>
          <Mutation
            mutation={UPDATE_CHECKIN_MUTATION}
            variables={{
              markerId: props.activeMarker.id,

              status: props.activeMarker.status === 'COMPLETED' ? 'NOT_STARTED' : 'COMPLETED',
              checkedInTime: new Date()
            }}
          >
            {(updateMarkerStatus, { error, loading }) => {
              if (loading) {
                return <p>{loading}</p>;
              }
              if (error) {
                return <p>{error}</p>;
              }
              return (
                <ReachedCheckBox
                  onChange={() => {
                    props.changeMarkerStatus(updateMarkerStatus);
                  }}
                  id="reached-checkbox"
                  type="checkbox"
                  checked={props.activeMarker.status === 'COMPLETED' ? true : false}
                  value={props.checkedInTime === '' ? '' : new Date()}
                />
              );
            }}
          </Mutation>
        </CheckboxGroup>
        <CheckedInGroup>
          <CheckedIn htmlFor="checked-in">Checked-in: </CheckedIn>
          <CheckInBox
            id="checked-in"
            value={props.checkedInTime}
            name="checkedInTime"
            type="time"
            disabled
          />
        </CheckedInGroup>
        <Mutation
          mutation={DELETE_MARKER_MUTATION}
          variables={{
            id: props.activeMarker.id
          }}
          // todo: add refetchQueries
          // refetchQueries={[{ query: CURRENT_MARKER_QUERY }]}
        >
          {(deleteMarker, { error, loading }) => {
            if (loading) {
              return <p>{loading}</p>;
            }
            if (error) {
              return <p>{error}</p>;
            }
            return (
              <ButtonGroup>
                <DeleteBtn
                  onClick={async () => {
                    const marker = await deleteMarker();
                    // console.log('MARKER DELETE DATA: ', marker);
                    const id = marker.data.deleteMarker.id;
                    props.deleteMarker(id);
                  }}
                >
                  Delete Marker?
                </DeleteBtn>
              </ButtonGroup>
            );
          }}
        </Mutation>
      </InfoWrapper>
    </InfoWindow>
  );
};

export { InfoWindowComponent };
