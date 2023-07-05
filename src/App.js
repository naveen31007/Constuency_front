import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import AddStaff from './components/Pages/Staff/Addstaff/AddStaff';
import Dashboard from './components/Pages/dashboard/Dashboard';
import Addvoter from './components/Pages/Voter/Addvoter/Addvoter';
import Mastertype from './components/Pages/Mater/Mastertype/Mastertype';
import Mastertypedetail from './components/Pages/Mater/Mastertypedetail/Mastertypedetail';
import Block from './components/Pages/Mater/Block/Block';
import Booth from './components/Pages/Mater/Booth/Booth';
import AddState from './components/Pages/Mater/Locations/State/AddState';
import AddDistrict from './components/Pages/Mater/Locations/District/AddDistrict';
import AddCity from './components/Pages/Mater/Locations/City/AddCity';
import Login from './components/Admin/Login/Login';
import { Provider } from './components/Context';
import Error404 from './components/Pages/ErrorPages/Error404';
import MasterTypedetailparent from './components/Pages/Mater/MasterTypedetailparent/MasterTypedetailparent';
import "bootstrap/dist/css/bootstrap.min.css";
import Voterlist from './components/Pages/Voter/Voterlist/Voterlist';

function App() {
  const context = useContext(Provider);

  if (context.loading) {
    return <div style={{ color: '#000' }}>loading....</div>
  }

  return (
    <>
      <Routes>
        <Route index path="*" element={<Error404 />} />
        <Route index path="/login/:id?/:name?" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard/:id?" element={<Dashboard />} />
          <Route path="/addstaff/:id?" element={<AddStaff />} />
          <Route path="/addvoter/:id?" element={<Addvoter />} />
          <Route path="/voterlist" element={<Voterlist />} />
          <Route path="/mastertype/:id?" element={<Mastertype />} />
          <Route path="/mastertypedetail/:id?" element={<Mastertypedetail />} />
          <Route path="/masterTypedetailparent/:id?" element={<MasterTypedetailparent />} />
          <Route path="/addblock/:id?" element={<Block />} />
          <Route path="/addbooth/:id?" element={<Booth />} />
          <Route path="/addstate/:id?" element={<AddState />} />
          <Route path="/adddistrict/:id?" element={<AddDistrict />} />
          <Route path="/addcity/:id?" element={<AddCity />} />

        </Route>
      </Routes>
    </>
  );
}

export default App;
