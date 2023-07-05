// import React, { useContext, useEffect } from "react";
// import Header from "./Header/Header";
// import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import Footer from "./Footer/Footer";
// import { Provider } from "../Context";

// function Layout(props) {
//   const context = useContext(Provider);
//   const navigate = useNavigate();
//   const location = useLocation();
//   useEffect(() => {
//     checkUser();
//   }, []);
//   const checkUser = () => {
//     if (context.user == null) {
//       navigate("/login");
//     }
//   };
//   return (
//     <>
//       <div> 
//         <div className="container">
//           <Header />
//           <div className="container-fluid page-body-wrapper">
//             <main id="main" className="main">
//               <div className="content-wrapper">
//                 <Outlet />

//                 <Footer />
//               </div>
//             </main>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Layout;

// import React, { useContext, useEffect } from "react";
// import Header from "./Header/Header";
// import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import Footer from "./Footer/Footer";
// import { Provider } from "../Context";





// function Layout(props) {
//   const context = useContext(Provider);
//   const navigate = useNavigate();
//   const location = useLocation();
//   useEffect(() => {
//     checkUser();
//   }, []);

//   const checkUser = () => {
//     if (context.user == null) {
//       navigate("/login");
//     }
//   };

//   return (
//     <>
//       <div className="container-fluid px-0">
//         <div className="container-scroller">
//           <Header />
//           <div className="container-fluid page-body-wrapper">
//             <main id="main" className="main">
//               <div className="content-wrapper">
//                 <Outlet />

//                 <Footer />
//               </div>
//             </main>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Layout;
import React, { useContext, useEffect } from "react";
import Header from "./Header/Header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer/Footer";
import { Provider } from "../Context";

// Import Bootstrap CSS file
import "bootstrap/dist/css/bootstrap.min.css";

function Layout(props) {
  const context = useContext(Provider);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = () => {
    if (context.user == null) {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="container-fluid px-0">
        <div className="container-scroller">
          <Header />

          <div className="container-fluid page-body-wrapper">
            <main id="main" className="main">
              <div className="content-wrapper">
                <Outlet />

                <Footer />
              </div>
            </main>
          </div>

          <footer className="footer mt-auto py-3 bg-light">
            <div className="container">
              {/* <span className="text-muted">Footer content here</span> */}
              <span className="text-muted"></span>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default Layout;
