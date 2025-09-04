import ContactPage from "./pages/ContactPage";
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import ContactForm from "./components/ContactForm";
import { ContactProvider } from "./context/ContactContext";


function App() {

  return (
    <>
    <ContactProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContactPage />} />
        <Route path="/form" element={<ContactForm />} />
      </Routes>
      </BrowserRouter>
    </ContactProvider>
    </>
  );
}

export default App;
