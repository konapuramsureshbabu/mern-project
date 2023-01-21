import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Edit from './pages/Edit/Edit';
import Profile from './pages/Profile/Profile';
import Header from './components/Headers/Header';
import {Routes,Route} from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/userprofile/:id' element={<Profile />} />
        <Route path='/edit/:id' element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;
