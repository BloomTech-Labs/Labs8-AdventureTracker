import {Form, Input, Button} from "antd";
import React, {useState, useContext} from "react";
import styled from "styled-components";
import {Mutation} from "react-apollo";
import {CREATE_TRIP_MUTATION} from "../../resolvers/Mutations";
import MapContext from "../../context/MapContext";
import {Marker} from "../interfaces";

interface Props {
  form: {
    getFieldDecorator: Function;
    validateFields: Function;
    getFieldValue: Function;
  };
  buttonGroup: React.ReactElement;
  step: number;
  setStep: Function;
}
interface InputEventTarget {
  target: {name: string; value: string};
}
const StepButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const ExitBtn = styled(Button)`
  display: ${(props: {step: number}) =>
    props.step === 0 ? "flex" : "none"};
`;
const PreviousBtn = styled(Button)`
  display: ${(props: {step: number}) =>
    props.step > 0 ? "flex" : "none"};
`;
const NextBtn = styled(Button)`
  display: flex;
`;
const DoneBtn = styled(Button)`
  display: flex;
`;
const FinishTripForm: React.SFC<Props> = ({form, setStep, step}) => {
  const {markers, googleImageUrl} = useContext(MapContext);
  const {getFieldDecorator} = form;
  const [tripInfo, setTripInfo] = useState({
    title: "",
    description: "",
  });
  const TRIP_NAME_MAX_LEN = 25;
  const changeInputHandler = (e: InputEventTarget) => {
    setTripInfo({...tripInfo, [e.target.name]: e.target.value});
  };
  return (
    <Form style={{width: "100%"}}>
      {step === 2 ? (
        <Form.Item
          label={`Trip Name - ${TRIP_NAME_MAX_LEN -
            tripInfo.title.length} characters left`}
        >
          {getFieldDecorator("trip-title", {
            rules: [
              {
                required: true,
                message: "Please input a title.",
              },
              {
                message: `Please keep the length to ${TRIP_NAME_MAX_LEN} characters.`,
                max: TRIP_NAME_MAX_LEN,
              },
            ],
          })(
            <Input
              placeholder="Enter Title of Trip"
              name="title"
              onChange={changeInputHandler}
              maxLength={TRIP_NAME_MAX_LEN}
            />,
          )}
        </Form.Item>
      ) : null}
      {step === 2 ? (
        <Form.Item label="Trip Description">
          {getFieldDecorator("trip-description", {
            rules: [
              {
                required: false,
              },
            ],
          })(
            <Input
              placeholder="Enter description of trip - optional"
              name="description"
              onChange={changeInputHandler}
            />,
          )}
        </Form.Item>
      ) : null}
      <Form.Item>
        <StepButtonGroup>
          <ExitBtn step={step} type="danger" onClick={() => setStep(-1)}>
            Exit
          </ExitBtn>
          <PreviousBtn
            step={step}
            onClick={() => setStep((prevState: number) => prevState - 1)}
            disabled={step === 0 ? true : false}
          >
            Previous
          </PreviousBtn>
          {step === 2 ? null : (
            <NextBtn
              step={step}
              type="primary"
              onClick={() => setStep((prevState: number) => prevState + 1)}
              disabled={step > 2 ? true : false}
            >
              Next
            </NextBtn>
          )}
          {step === 2 ? (
            <Mutation
              mutation={CREATE_TRIP_MUTATION}
              variables={{
                title: tripInfo.title,
                description: tripInfo.description,
                archived: false,
                image: googleImageUrl,
                markers: [],
              }}
            >
              {createTrip => (
                <DoneBtn
                  type="primary"
                  onClick={async () => {
                    setStep(-1);
                    //@ts-ignore
                    const {data} = await createTrip();
                    console.log(data);
                  }}
                >
                  Done
                </DoneBtn>
              )}
            </Mutation>
          ) : null}
        </StepButtonGroup>
      </Form.Item>
    </Form>
  );
};
const WrappedFinishTripForm = Form.create({name: "finish-trip-form"})(
  FinishTripForm,
);

export default WrappedFinishTripForm;
