import Link from 'next/link';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import LandingContainer from '../components/home/LandingContainer';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

const Home = props => (
  <div>
    <LandingContainer />
  </div>
);

export default Home;
