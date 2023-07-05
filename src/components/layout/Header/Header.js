import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Provider } from "../../Context";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SettingsIcon from "@mui/icons-material/Settings";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeshboardIcon from "./Navbutton/DeshboardIcon";
import VoterIcon from "./Navbutton/VoterIcon";
import StaffIcon from "./Navbutton/StaffIcon";
import MasterTypeIcon from "./Navbutton/MasterTypeIcon";
import LocationIcon from "./Navbutton/LocationIcon";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
//

//
function Header() {
  const context = useContext(Provider);
  const navRef = useRef(null);
  const [isToggled, setIsToggled] = useState(false);
  const buttonStyle = {
    color: "black",
    fontWeight: "bold",
    fontFamily: "Arial, sans-serif",
    fontSize: "16px", // Adjust the font size as per your preference
    borderRadius: "5px", // Adds rounded corners to the button
    padding: "10px 20px", // Adds padding around the button text
    backgroundColor: "#00d9ff", // Sets a background color for the button
    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)", // Adds a subtle shadow to the button
    transition: "background-color 0.3s ease", // Adds a smooth transition effect on hover
    /* Add more properties as needed */
  };

  useEffect(() => {
    if (isToggled) {
      document.body.classList.add("toggle-sidebar");
    } else {
      document.body.classList.remove("toggle-sidebar");
    }
  }, [isToggled]);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const handleLogout = () => {
    context.logout();
  };

  return (
    <>
      {/* ======= Header ======= */}
      <header
        style={{ backgroundColor: "#b9e2ed" }}
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <Link to="/dashboard" className="logo d-flex align-items-center">
            <span
              style={buttonStyle}
              className="d-none d-lg-block d-flex align-items-center"
            >
              My-Constituency
            </span>
          </Link>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleToggle}
          >
            <MenuIcon />
          </IconButton>
        </div>
        {/* <!-- End Logo --> */}

        {/*Navbar Headers*/}

        <IconButton>
          <DeshboardIcon style={{ marginRight: "10px" }} />
        </IconButton>
        <IconButton>
          <StaffIcon style={{ marginRight: "10px" }} />
        </IconButton>
        <IconButton>
          <VoterIcon style={{ marginRight: "10px" }} />
        </IconButton>
        <IconButton>
          <MasterTypeIcon style={{ marginRight: "10px" }} />
        </IconButton>
        <IconButton>
          <LocationIcon style={{ marginRight: "10px" }} />
        </IconButton>
        {/* <div className="search-bar">
          <form
            className="search-form d-flex align-items-center"
            method="POST"
            action="#"
          >
            <input
              type="text"
              name="query"
              placeholder="Search"
              title="Enter search keyword"
            />
            <button type="submit" title="Search">
              <i className="bi bi-search"></i>
            </button>
          </form>
        </div> */}
        {/* <!-- End Search Bar --> */}

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item d-block d-lg-none">
              <Link className="nav-link nav-icon search-bar-toggle " to="#">
                <i className="bi bi-search"></i>
              </Link>
            </li>
            {/* <!-- End Search Icon--> */}

            <li className="nav-item dropdown pe-3">
              <Link
                className="nav-link nav-profile d-flex align-items-center pe-0"
                to="#"
                data-bs-toggle="dropdown"
              >
                {/* Corenere icon for logout */}
                <AccountCircleIcon />
              </Link>
              {/* <!-- End Profile Iamge Icon --> */}

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
               <Link to='addstaff'><li className="dropdown-item d-flex align-items-center">
                  <i className="bi bi-person "></i>
                  <span>
                    <b>Profile</b>
                  </span>
                </li></Link> 
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li
                  className="dropdown-item d-flex align-items-center"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right"></i>
                  <span>
                    <b>Sign Out</b>
                  </span>
                </li>
              </ul>
              {/* <!-- End Profile Dropdown Items --> */}
            </li>
            {/* <!-- End Profile Nav --> */}
          </ul>
        </nav>
        {/* <!-- End Icons Navigation --> */}
      </header>
      {/* -- End Header -- */}

      <div ref={navRef}>
        <aside
          style={{ backgroundColor: "#e6eaeb" }}
          id="sidebar"
          className="sidebar"
        >
          <Link to="/dashboard">
            <img
              style={{ height: "150px", width: "250px" }}
              src={require("../../../constituency.jpg")}
              alt="constituency"
            />
          </Link>
          <ul className="sidebar-nav" id="sidebar-nav">
            <li className="nav-heading">Deshboard</li>
            <li className="nav-item">
              <Link className="nav-link " to="/dashboard">
                {" "}
                <DashboardIcon sx={{ color: "black" }} />
                <sapn style={{ color: "gray", paddingLeft: "49px" }}>
                  Dashboard
                </sapn>
              </Link>
            </li>
            {/* <!-- End Dashboard Nav --> */}
            <li className="nav-heading">Staff</li>
            <li className="nav-item">
              <Link
                className="nav-link collapsed"
                data-bs-target="#components-nav"
                data-bs-toggle="collapse"
                to="#"
              >
                <PeopleAltIcon sx={{ color: "black" }} />
                <sapn style={{ color: "gray", paddingLeft: "60px" }}>
                  Staff
                  <i
                    style={{
                      color: "black",
                      fontSize: "1.1rem",
                      paddingLeft: "80px",
                    }}
                    className="bi bi-chevron-down ms-auto"
                  ></i>
                </sapn>
              </Link>
              <ul
                id="components-nav"
                className="nav-content collapse "
                data-bs-parent="#sidebar-nav"
              >
                <li>
                  <Link to="/addstaff">
                    <FiberManualRecordIcon />
                    <span style={{ color: "#999999", paddingLeft: "20px" }}>
                      Add Staff
                    </span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-heading">Voter</li>
            <li className="nav-item">
              <Link
                className="nav-link collapsed"
                data-bs-target="#components-nav1"
                data-bs-toggle="collapse"
                to="#"
              >
                <EmojiEventsIcon sx={{ color: "black" }} />
                <sapn style={{ color: "gray", paddingLeft: "60px" }}>
                  Voter
                  <i
                    style={{
                      color: "black",
                      fontSize: "1.1rem",
                      paddingLeft: "75px",
                    }}
                    className="bi bi-chevron-down ms-auto"
                  ></i>
                </sapn>
              </Link>
              <ul
                id="components-nav1"
                className="nav-content collapse "
                data-bs-parent="#sidebar-nav"
              >
                <li>
                  <Link to="/addvoter">
                    <FiberManualRecordIcon />
                    <span style={{ color: "#999999", paddingLeft: "20px" }}>
                      Add Voter
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/voterlist">
                    <FiberManualRecordIcon />
                    <span style={{ color: "#999999", paddingLeft: "20px" }}>
                      Voter List
                    </span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-heading">Master Type</li>
            <li className="nav-item">
              <Link
                className="nav-link collapsed"
                data-bs-target="#components-nav2"
                data-bs-toggle="collapse"
                to="#"
              >
                <SettingsIcon sx={{ color: "black" }} />
                <sapn style={{ color: "gray", paddingLeft: "50px" }}>
                  Master Type
                  <i
                    style={{
                      color: "black",
                      fontSize: "1.1rem",
                      paddingLeft: "40px",
                    }}
                    className="bi bi-chevron-down ms-auto"
                  ></i>
                </sapn>
              </Link>
              <ul
                id="components-nav2"
                className="nav-content collapse "
                data-bs-parent="#sidebar-nav"
              >
                <li>
                  <Link to="/mastertype">
                    <FiberManualRecordIcon />
                    <span style={{ color: "#999999", paddingLeft: "20px" }}>
                      Add MasterType
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/mastertypedetail">
                    <FiberManualRecordIcon />
                    <span style={{ color: "#999999", paddingLeft: "20px" }}>
                      Add MasterTypeDetail
                    </span>
                  </Link>
                  <Link to="/masterTypedetailparent">
                    <FiberManualRecordIcon />
                    <span style={{ color: "#999999", paddingLeft: "20px" }}>
                      Add Parent
                    </span>
                  </Link>
                  <Link to="/addblock">
                    <FiberManualRecordIcon />
                    <span style={{ color: "#999999", paddingLeft: "20px" }}>
                      Add Block
                    </span>
                  </Link>
                  <Link to="/addbooth">
                    <FiberManualRecordIcon />
                    <span style={{ color: "#999999", paddingLeft: "20px" }}>
                      Add Booth
                    </span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-heading">Location </li>
            <li className="nav-item">
              <Link
                className="nav-link collapsed"
                data-bs-target="#components-nav3"
                data-bs-toggle="collapse"
                to="#"
              >
                <LocationOnIcon sx={{ color: "black" }} />
                <sapn style={{ color: "gray", paddingLeft: "50px" }}>
                  Locations
                  <i
                    style={{
                      color: "black",
                      fontSize: "1.1rem",
                      paddingLeft: "60px",
                    }}
                    className="bi bi-chevron-down ms-auto"
                  ></i>
                </sapn>
              </Link>
              <ul
                id="components-nav3"
                className="nav-content collapse "
                data-bs-parent="#sidebar-nav"
              >
                <li>
                  <Link to="/addstate">
                    <FiberManualRecordIcon />
                    <span style={{ color: "#999999", paddingLeft: "20px" }}>
                      Add State
                    </span>
                  </Link>{" "}
                </li>
                <li>
                  <Link to="/adddistrict">
                    <FiberManualRecordIcon />
                    <span style={{ color: "#999999", paddingLeft: "20px" }}>
                      Add District
                    </span>
                  </Link>
                  <Link to="/addcity">
                    <FiberManualRecordIcon />
                    <span style={{ color: "#999999", paddingLeft: "20px" }}>
                      Add City
                    </span>
                  </Link>
                </li>
              </ul> 
              <li className="nav-heading"></li>
              <li className="nav-item">
                <span className="nav-link " onClick={handleLogout}>
                  
                  <ExitToAppIcon sx={{ color: "black" }} />
                  <sapn style={{ color: "gray", paddingLeft: "49px" }}>
                    Sign Out
                  </sapn>
                </span>
              </li>
            </li>
            {/* <!-- End Components Nav --> */}
          </ul>
        </aside>
      </div>
    </>
  );
}

export default Header;
