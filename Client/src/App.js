import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Sidebar, NotesNavbar } from "./layout";
import {
  AllNotes,
  TagNotes
} from "./pages";
import { TagsModal, CreateNoteModal } from "./components";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import ExercisesPage from './pages/Exercises/ExercisesPage'
import Layout from "antd/es/layout/layout";
import ExerciseDetail from "./pages/ExerciseDetails/ExerciseDetail";
import Event from "./pages/Event/Event";
import DayPlan from "./pages/DayPlan/DayPlan";
import SendMessage from "./pages/SendMassege/SendMessege";
import Navbar from "./layout/Naxbar/Navbar";
import { RegisterPage } from "./pages/Register/RegisterPage";
import { LoginPage } from "./pages/Login/LoginPage";
import { Logout } from "./pages/Logout/Logout";
import { CabinetPage } from "./pages/Cabinet/CabinetPage";
import { AdminPage } from "./pages/Admin/AdminPage";
import { MusicPage } from "./pages/Music/MusicPage";
import { FavMusicPage } from "./pages/Music/FavMusicPage";
import { Test } from "./pages/Test/Test";

const App = () => {
  const { viewEditTagsModal, viewCreateNoteModal } = useSelector(
    (state) => state.modal
  );

  return (
    <Layout className="app">
      {/* modals */}
      {viewCreateNoteModal && <CreateNoteModal />}
      {viewEditTagsModal && <TagsModal type="edit" />}

      <ToastContainer
        position="bottom-right"
        theme="light"
        pauseOnHover
        autoClose={1500}
      />
      <Router>
        <div className="app__container" >
          <Navbar />
          <NotesNavbar />
          <Routes>
            <Route path="/" element={<Navigate to="/exercises"/>} />
            <Route path="/notes" element={<AllNotes />} />
            <Route path="/tag/:name" element={<TagNotes />} />
            <Route path="/exercises" element={<ExercisesPage />} />
            <Route path="/exercise/:id" element={<ExerciseDetail />} />
            <Route path="/event-calendar" element={<Event />} />
            <Route path="/day-plan" element={<DayPlan/>} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/logout" element={<Logout/>} />
            <Route path="/cabinet" element={<CabinetPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/send-message" element={<SendMessage />} />
            <Route path='/music' element={<MusicPage />} />
            <Route path='/fav-music' element={<FavMusicPage />} />
            <Route path='/test' element={<Test />} />
          </Routes>
        </div>
      </Router>
    </Layout>
  );
};

export default App;