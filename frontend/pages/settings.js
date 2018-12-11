import Link from 'next/link';
import SettingsComponent from '../components/Settings';
import SideNav from '../components/SideNav';
import CommonTopNavbar from '../components/CommonTopNavbar';
import { LgWidthContainer } from '../components/styles/WidthContainers';
import styled from 'styled-components';
import { MainContainer } from '../components/styles/MainContainer';
import { BackgroundImage } from '../components/styles/BackgroundImage';

const Settings = () => (
  <LgWidthContainer>
    <CommonTopNavbar />
    <SideNav />
    <MainContainer>
      <SettingsComponent />
      <BackgroundImage src="../static/kayaking.jpg" />
    </MainContainer>
  </LgWidthContainer>
);

export default Settings;
