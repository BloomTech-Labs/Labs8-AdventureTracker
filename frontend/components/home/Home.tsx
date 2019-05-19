import "./home.less";
import Navbar from "./components/Navbar/Navbar";

export interface HomeProps {}

const Home: React.SFC<HomeProps> = () => {
  return (
    <div className="home">
      <Navbar />
    </div>
  );
};

export default Home;
