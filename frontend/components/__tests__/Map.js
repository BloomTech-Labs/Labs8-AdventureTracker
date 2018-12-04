import { Map, MyMapComponent } from '../Map';
import { mount, shallow } from 'enzyme';

const fakeMarkers = [
  {
    position: { lat: 30, lng: 30 },
    id: 1,
    draggable: true,
    label: 'A',
    status: 'NOT_STARTED'
  },
  {
    position: { lat: 30, lng: 30 },
    id: 1,
    draggable: true,
    label: 'B',
    status: 'NOT_STARTED'
  }
];

describe('<Map />', () => {
  it('renders and displays properly', () => {
    const wrapper = shallow(<Map />);
    expect(wrapper).toBeTruthy();
  });
  it('tests the initial state values', () => {
    const wrapper = shallow(<Map />);
    const state = wrapper.state();
    expect(state.completedCheckboxes).toBe(0);
    expect(state.markers.length).toBe(0);
    expect(state.polylines.length).toBe(0);
    expect(state.showingInfoWindow).toBeFalsy();
    expect(state.tripTitle).toBe('');
    expect(state.startDate).toBe('');
    expect(state.endDate).toBe('');
  });
  it('adds a marker when map is clicked on', () => {
    const wrapper = mount(<Map />);
    // const GoogleMaps = wrapper.find('<GoogleMaps');
    // GoogleMaps.simulate('click');
    console.log(wrapper.state());
  });
});
