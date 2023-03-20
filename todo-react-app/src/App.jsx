import { Route, Routes } from "react-router-dom";
import LoginView from "./views/LoginView";
import TodosView from "./views/TodosView";
import UserProfileView from "./views/UserProfileView";
import NotFoundView from "./views/NotFoundView";
import TheHeader from "./components/TheHeader";

function App() {
  return (
    <div className="App">
      {/* TheHeader will be here */}
      <TheHeader />
      <Routes>
        <Route path="/" element={<TodosView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/profile/:username" element={<UserProfileView />} />
        <Route path="*" element={<NotFoundView />} />
      </Routes>
    </div>
  );
}

export default App;
