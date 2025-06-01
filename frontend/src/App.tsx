import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { NotFound } from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Settings from "./pages/Settings";

function App() {
  return (
    <main className="flex flex-col w-screen bg-[var(--secondary-color)] min-h-screen h-screen">
      <Header />
      <section className="flex-grow px-3 md:px-10 lg:px-20 pb-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </section>
      <Footer />
    </main>
  );
}

export default App;
