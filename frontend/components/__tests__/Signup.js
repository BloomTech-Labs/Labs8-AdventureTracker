import Signup from '../Signup';
import { shallow } from 'enzyme';
import Link from 'next/link';

describe('<Signup />', () => {
  it('renders and displays properly', () => {
    const wrapper = shallow(<Signup />);
    expect(wrapper).toBeTruthy();
  });
  it('fields are empty at start and form starts at step 1 of the process and passwordMatch to start out as true', () => {
    const wrapper = shallow(<Signup />);
    const state = wrapper.state();
    expect(state.step).toBe(1);
    expect(state.password).toBe('');
    expect(state.password2).toBe('');
    expect(state.name).toBe('');
    expect(state.passwordMatch).toBeTruthy();
  });
  it('passwordMatch should be be when both passwords are the same', () => {
    const wrapper = shallow(<Signup />);
    //test 1:
    wrapper.setState({ password: 'dungeon', password2: 'dungeon' });
    wrapper.instance().passwordMatch();
    expect(wrapper.state().password).toBe('dungeon');
    expect(wrapper.state().password2).toBe('dungeon');
    expect(wrapper.state().passwordMatch).toBeTruthy();

    //test 2:
    wrapper.setState({ password: '', password2: '' });
    wrapper.instance().passwordMatch();
    expect(wrapper.state().password).toBe('');
    expect(wrapper.state().password2).toBe('');
    expect(wrapper.state().passwordMatch).toBeTruthy();
  });
  it("passwordMatch should be false when both passwords don't match", () => {
    const wrapper = shallow(<Signup />);
    wrapper.setState({ password: 'dragon', password2: 'drag' });
    wrapper.instance().passwordMatch();
    const state = wrapper.state();
    expect(state.password).toBe('dragon');
    expect(state.password2).toBe('drag');
    expect(state.passwordMatch).toBeFalsy();
  });
});
