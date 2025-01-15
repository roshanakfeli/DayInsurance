import "./assets/css/index.css";
import MainTemplate from "./components/templates/mainTemplate";

function App() {
  return (
    <div className="">
      <MainTemplate
        children={
          <div className="bg-white shadow-custom-shadow rounded-lg p-6">
            <h2 className="text-center text-gray-800 text-xl font-semibold">
              Centered Component
            </h2>
            <p className="text-center text-gray-600 mt-2">
              This is a white component centered on the screen.
            </p>
          </div>
        }
      />
    </div>
  );
}

export default App;
