import {
  blurAdventureTrackerJumbo,
  blurNorthAmericaWithMarkers,
} from "./base64Images";
//@ts-ignore
import AdventureTrackerJumbo from "static/adventure-tracker-jumbo.png";
import NorthAmericaWithMarkers from "static/north-america-with-markers.png";
import "./home.less";
import Navbar from "./components/Navbar/Navbar";
import {
  InfoSection,
  TextContent,
  Title,
  Description,
} from "./components/SectionStyles/SectionStyles";
import BlurImage from "../BlurImage/BlurImage";
//@ts-ignore

export interface HomeProps {}

const Home: React.SFC<HomeProps> = () => {
  return (
    <div className="home">
      <Navbar />
      <section className="jumbotron">
        <BlurImage
          className="jumbotron__bg-image"
          src={AdventureTrackerJumbo}
          alt=""
          base64={blurAdventureTrackerJumbo}
        />
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
      <section className="plan-trip">
        <TextContent>
          <Title>Plan Your Trip</Title>
          <Description>
            No matter how big or small <br /> we've got you covered.
          </Description>
        </TextContent>
        <BlurImage
          className="plan-trip__img"
          src={NorthAmericaWithMarkers}
          base64={blurNorthAmericaWithMarkers}
          alt=""
        />
      </section>
    </div>
  );
};

export default Home;
