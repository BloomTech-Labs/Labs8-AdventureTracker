import "./home.less";
import Navbar from "./components/Navbar/Navbar";

export interface HomeProps {}

const Home: React.SFC<HomeProps> = () => {
  return (
    <div className="home">
      <Navbar />
      <section className="jumbotron">
        <div className="jumbotron__content">
          <h2 className="jumbotron__heading">
            Experience
            <br />
            Adventure
          </h2>
          <p className="jumbotron__text">
            With Adventure Tracker, we want to improve your trip experience
            and keep your friends and family informed of your whereabouts.
          </p>
          <button className="jumbotron__cta-btn">
            Start Your Adventure
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
