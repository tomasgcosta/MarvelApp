import "./App.css";
import { Character } from "./components/Character";
import { Creator } from "./components/Creator";
import { Navbar } from "./components/NavBar";

const App: React.FC = () => {
  return (
    <div className="bg-[#e9e9e9] min-h-screen">
      <Navbar />
      <Character />
      {/* <Creator /> */}
    </div>
  );
};

export default App;
