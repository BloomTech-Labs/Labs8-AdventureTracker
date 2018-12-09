import Breadcrumbs from '../Breadcrumbs';
import { shallow } from 'enzyme';
import Link from 'next/link';

describe('<Breadcrumbs />', () => {
  const INDEX = '/';
  const TRIPLIST = '/triplist';
  const BILLING = '/billing';
  const SETTINGS = '/settings';
  const ARCHIVES = '/archivelist';
  it('renders and displays properly', () => {
    const wrapper = shallow(<Breadcrumbs router={{ route: '/' }} />);
    expect(wrapper).toBeTruthy();
  });
  it('displays the home -> trip breadcrumbs', () => {
    const wrapper = shallow(<Breadcrumbs startCrumb={'/'} router={{ route: TRIPLIST }} />);
    const Links = wrapper.children().find(Link);
    expect(Links.find({ href: INDEX }).length).toBe(1);
    expect(Links.find({ href: TRIPLIST }).length).toBe(1);
    expect(Links.length).toBe(2);
  });
  it('displays the home -> archive breadcrumbs', () => {
    const wrapper = shallow(<Breadcrumbs startCrumb={'/'} router={{ route: ARCHIVES }} />);
    const Links = wrapper.children().find(Link);
    expect(Links.find({ href: INDEX }).length).toBe(1);
    expect(Links.find({ href: ARCHIVES }).length).toBe(1);
    expect(Links.length).toBe(2);
  });
  it('displays the home -> settings breadcrumbs', () => {
    const wrapper = shallow(<Breadcrumbs startCrumb={'/'} router={{ route: SETTINGS }} />);
    const Links = wrapper.children().find(Link);
    expect(Links.find({ href: INDEX }).length).toBe(1);
    expect(Links.find({ href: SETTINGS }).length).toBe(1);
    expect(Links.length).toBe(2);
  });
  it('displays the home -> billing breadcrumbs', () => {
    const wrapper = shallow(<Breadcrumbs startCrumb={'/'} router={{ route: BILLING }} />);
    const Links = wrapper.children().find(Link);
    expect(Links.find({ href: INDEX }).length).toBe(1);
    expect(Links.find({ href: BILLING }).length).toBe(1);
    expect(Links.length).toBe(2);
  });
  it.skip('displays the home -> triplist -> map name breadcrumbs', () => {
    const wrapper = shallow(<Breadcrumbs startCrumb={'/'} router={{ route: BILLING }} />);
    const Links = wrapper.children().find(Link);
    expect(Links.find({ href: INDEX }).length).toBe(1);
    expect(Links.find({ href: BILLING }).length).toBe(1);
    expect(Links.length).toBe(2);
  });
});
