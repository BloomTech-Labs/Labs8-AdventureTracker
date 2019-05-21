import {
  blurAdventureTrackerJumbo,
  blurNorthAmericaWithMarkers,
  blurFamily,
} from "./base64Images";
//@ts-ignore
import AdventureTrackerJumbo from "static/adventure-tracker-jumbo.png";
//@ts-ignore
import NorthAmericaWithMarkers from "static/north-america-with-markers.png";
//@ts-ignore
import ShareWithFamilySrc from "static/family.jpg";
import "./stylesheets/home.less";
import "./stylesheets/jumbotron.less";
import "./stylesheets/plan-your-trip.less";
import "./stylesheets/share-family.less";
import Navbar from "./components/Navbar/Navbar";
import {
  TextContent,
  Title,
  Description,
} from "./components/SectionStyles/SectionStyles";
import BlurImage from "../BlurImage/BlurImage";
import {useState} from "react";
import HamburgerNavMenu from "./components/HamburgerNavMenu/HamburgerNavMenu";

export interface HomeProps {}

const Home: React.SFC<HomeProps> = () => {
  const [navbarMenuActive, setNavbarMenuActive] = useState(false);
  return (
    <div className="home">
      <Navbar
        setMenuActive={setNavbarMenuActive}
        isMenuActive={navbarMenuActive}
      />
      {navbarMenuActive ? (
        <HamburgerNavMenu setMenuActive={setNavbarMenuActive} />
      ) : null}
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
      <section className="plan-trip" id="plan-trip">
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
      <section className="share-family" id="share">
        <TextContent className="share-family__content">
          <Title className="share-family__title">Share</Title>
          <Description>
            Share your trip with friends and family by sending a link.
          </Description>
        </TextContent>
        <BlurImage
          className="share-family__img"
          src={ShareWithFamilySrc}
          base64={blurFamily}
          alt=""
        />
      </section>
      <section className="contact" id="contact" />
    </div>
  );
};

export default Home;
