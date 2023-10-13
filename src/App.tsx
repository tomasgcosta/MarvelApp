import "./App.css";
import { Character } from "./components/Character";
import { Navbar } from "./components/NavBar";

const App: React.FC = () => {
  return (
    <div className="bg-[#151315] min-h-[100vh]">
      <Navbar />
      <Character />
    </div>
  );
};

export default App;
