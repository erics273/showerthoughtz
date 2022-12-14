import Header from "../../components/header/Header";
import Login from "../../components/login/Login";
import Registration from "../registration/Registration";

function Home(props) {
  return (
    <div className="Home">
        <Header/>
        <Login/>
        <Registration/>
    </div>
  );
}

export default Home;
