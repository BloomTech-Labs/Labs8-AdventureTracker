import {Radio} from "antd";
interface Props {
  tripDispatch: Function;
  filterTypes: any;
}

const TripFilter: React.SFC<Props> = ({filterTypes, tripDispatch}) => {
  const {ALL, ACTIVE, ARCHIVED} = filterTypes;

  return (
    <Radio.Group
      onChange={(e: any) => {
        tripDispatch({type: "SET_FILTER", filter: e.target.value});
      }}
    >
      <Radio.Button value={ALL}>All</Radio.Button>
      <Radio.Button value={ACTIVE}>Active</Radio.Button>
      <Radio.Button value={ARCHIVED}>Archived</Radio.Button>
    </Radio.Group>
  );
};

export default TripFilter;
