import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavigationBar from "../Common/NavigationBar";
import HomePage from "../Pages/Home/HomePage";
import Classification from "../ClientComponents/Classificationpage/Classification";
// import Tr30Page from "../ClientComponents/Tr30Page/Tr30Page";
import CreateBill from "../CreateBill/CreateBill";
import Bills from "../CreateBill/Bills";
import Staff from "../staff/Staff";
import Vendors from "../vendor/Vendor";
import CreateVendor from "../vendor/CreateVendor";
import CreateStaff from "../staff/CreateStaff";
import Footer from "../Common/Footer";
import Login from "../Common/Login";
import Signup from "../Common/Signup";
const AppRoutes = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bills/classification/:id" element={<Classification />} />
        {/* <Route path="/bills/tr30/:id" element={<Tr30Page />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/bills" element={<Bills />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/vendor" element={<Vendors />} />
        <Route path="/create-vendor" element={<CreateVendor/>}/>
        <Route path="/create-staff" element={<CreateStaff/>}/>
        {/* Catch-all route (404 page) */}
        <Route path="*" element={<Navigate to="/" />} />
        
      </Routes>
      <Footer/>
    </Router>
  );
};

export default AppRoutes;
