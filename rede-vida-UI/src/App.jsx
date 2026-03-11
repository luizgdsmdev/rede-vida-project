import Footer from "./components/shared/footer/Footer.jsx";
import Header from "./components/shared/Header/Header.jsx";
import { Outlet } from "react-router-dom";
import { useNavigation } from "react-router-dom";
import Loading from "./components/shared/Loading/Loading.jsx";
import ThemeToggle from "./components/shared/themeToggle/ThemeToggle.jsx";

function App() {
  const navigation = useNavigation();
  return (
    <>
      <Header />
      {navigation.state === "loading" ? <Loading /> : <Outlet />}
      <Footer />
      <ThemeToggle />
    </>
  );
}

export default App;
