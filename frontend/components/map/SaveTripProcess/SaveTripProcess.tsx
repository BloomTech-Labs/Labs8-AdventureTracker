import {Steps, Card, Button} from "antd";
import styled from "styled-components";
import WrappedFinishTripForm from "./FinishTripForm";
import ScreenCapture from "../ScreenCapture/ScreenCapture";
import {useContext} from "react";
import MapContext from "../../context/MapContext";

const Step = Steps.Step;

interface Props {}
const StepsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  z-index: 10000000;
  left: 3%;
  top: 22%;
`;

const PreviewImage = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 1.6rem;
`;
const StepsStatusBar: React.SFC<Props> = () => {
  const {saveTripState, saveTripDispatch} = useContext(MapContext);
  const {step, googleImageUrl} = saveTripState;
  if (step === -1) {
    return null;
  } else {
    return (
      <StepsWrapper>
        <Card
          bodyStyle={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Steps direction="vertical" current={step}>
            <Step
              title="Go to location"
              description="The location needs to be visible before taking snapshot."
            />
            <Step
              title="Take Snapshot"
              description="Creates a desired location image for trip."
            />
            <Step
              title="Finish Trip"
              description="Fill out the rest of the details then save."
            />
          </Steps>
          {step === 1 ? (
            <>
              {googleImageUrl ? (
                <PreviewImage
                  src={googleImageUrl}
                  alt="Google Map Preview Image"
                />
              ) : (
                <h2>Click on map to generate image.</h2>
              )}
              <ScreenCapture captureHeight={"400"} captureWidth={"400"} />
            </>
          ) : null}
          <WrappedFinishTripForm
            step={step}
            saveTripDispatch={saveTripDispatch}
          />
        </Card>
      </StepsWrapper>
    );
  }
};

export default StepsStatusBar;
