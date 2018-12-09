import SideNav from '../SideNav';
import { shallow } from 'enzyme';

describe('<SideNav />', () => {
  it('renders and displays properly', () => {
    const wrapper = shallow(<SideNav />);
    expect(wrapper).toBeTruthy();
  });
});
