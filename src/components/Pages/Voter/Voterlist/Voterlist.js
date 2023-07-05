import React, { useEffect, useState, useMemo } from "react";
import "./VoterList.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {
  Button,
  Card,
  CardContent,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Voterlist() {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const nevigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return data.filter((item) => {
      const id = item.id ? item.id.toString() : "";
      const name = item.name || "";
      const parent = item.parent || "";
      const parentName = item.parentName ? item.parentName.toString() : "";
      const gender = item.gender ? item.gender.toString().toLowerCase() : "";
      const dob = item.dob || "";
      const mobileNo = item.mobileNo ? item.mobileNo.toString() : "";
      const adharNo = item.adharNo ? item.adharNo.toString() : "";
      const voterId = item.voterId ? item.voterId.toString() : "";
      const profession = item.profession || "";
      const vicile = item.vicile || "";
      const vehiclestatus = item.vehiclestatus || "";
      const familyID = item.familyID ? item.familyID.toString() : "";
      const caste = item.caste || "";
      const subcaste = item.subcaste || "";
      const membersinfamily = item.membersinfamily
        ? item.membersinfamily.toString()
        : "";
      const familyHeadType = item.familyHeadType
        ? item.familyHeadType.toString()
        : "";
      const address = item.address || "";
      const location = item.location || "";
      const address1 = item.address1 || "";
      const city1 = item.city1 || "";
      const both = item.both || "";
      const roles = item.roles || "";
      const political = item.political || "";
      const age = moment().diff(moment(item.dob), "years");

      return (
        id.includes(lowerCaseSearchTerm) ||
        name.toLowerCase().includes(lowerCaseSearchTerm) ||
        parent.toLowerCase().includes(lowerCaseSearchTerm) ||
        parentName.toLowerCase().includes(lowerCaseSearchTerm) ||
        gender === lowerCaseSearchTerm ||
        gender.startsWith(lowerCaseSearchTerm + " ") ||
        gender.endsWith(" " + lowerCaseSearchTerm) ||
        gender.includes(" " + lowerCaseSearchTerm + " ") ||
        dob.includes(lowerCaseSearchTerm) ||
        age.toString().includes(lowerCaseSearchTerm) ||
        mobileNo.includes(lowerCaseSearchTerm) ||
        adharNo.includes(lowerCaseSearchTerm) ||
        voterId.includes(lowerCaseSearchTerm) ||
        profession.toLowerCase().includes(lowerCaseSearchTerm) ||
        vicile.toLowerCase().includes(lowerCaseSearchTerm) ||
        vehiclestatus.toLowerCase().includes(lowerCaseSearchTerm) ||
        familyID.includes(lowerCaseSearchTerm) ||
        caste.toLowerCase().includes(lowerCaseSearchTerm) ||
        subcaste.toLowerCase().includes(lowerCaseSearchTerm) ||
        membersinfamily.includes(lowerCaseSearchTerm) ||
        familyHeadType.includes(lowerCaseSearchTerm) ||
        address.toLowerCase().includes(lowerCaseSearchTerm) ||
        location.toLowerCase().includes(lowerCaseSearchTerm) ||
        address1.toLowerCase().includes(lowerCaseSearchTerm) ||
        city1.toLowerCase().includes(lowerCaseSearchTerm) ||
        both.includes(lowerCaseSearchTerm) ||
        roles.toLowerCase().includes(lowerCaseSearchTerm) ||
        political.toLowerCase().includes(lowerCaseSearchTerm)
      );
    });
  }, [data, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = async (id) => {
    nevigate("/addvoter", { state: { id } });
  };

  useEffect(() => {
    GetData();
  }, []);

  const GetData = async () => {
    const response = await fetch("http://localhost:5211/api/panel/list/entity");
    const data = await response.json();
    setData(data);
  };

  const handleView = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setOpenModal(false);
  };
  const handleDelete = async (id) => {
    let Delete = await fetch(
      `http://localhost:5211/api/panel/delete/entity/${id}`,
      {
        method: "POST",
      }
    );

    toast.success("Data deleted successfully");
    GetData();
  };
  return (
    <>
      <div>
        <span
          style={{
            paddingLeft: "8px",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <b>
            <Link to="/addvoter">
              <KeyboardBackspaceIcon /> Add New Voter
            </Link>
          </b>
        </span>
      </div>
      <div className="mb-3">
        <input
          style={{
            width: "25%",
            height: "40px",
            padding: "10px",
            border: "2px solid black",
            borderRadius: "5px",
            float: "right",
            marginBottom: "20px",
          }}
          type="text"
          placeholder="Search... "
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="table-container">
      {/* <table className="table table-hover table-condensed">  */}
      <table className="table table-hover table-striped table-bordered mt-5">
          <thead >
            <tr style={{fontSize: 11.5}}>
              <th>View</th>
              <th>ID</th>
              <th>Name</th>
              <th>Relation With</th>
              <th>Relative Name</th>
              <th>Gender</th>
              <th>DOB</th>
              <th>Age</th>
              <th>Contact</th>
              <th>Aadhar</th>
              <th>Voter ID</th>
              <th>Profesion</th>
              <th>Vehicle Type</th>
              <th>Vehicle No</th>
              <th>Family ID</th>
              <th>Caste</th>
              <th>Sub-Caste</th>
              <th>Total In Family</th>
              <th>Is Family Head</th>

              <th colSpan={2} style={{ textAlign: "center" }}>
                Permanent Address
              </th>
              <th colSpan={2} style={{ textAlign: "center" }}>
                Current Address
              </th>
              <th>Booth No</th>
              <th>Role</th>
              <th>Voter View</th>
              <th colSpan={2} style={{ textAlign: "center" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr style={{ fontSize: 11.5}} key={item.id}>
                <td>
                  <IconButton onClick={() => handleView(item)}>
                    <Visibility />
                  </IconButton>
                </td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.parent}</td>
                <td>{item.parentName}</td>
                <td>{item.gender}</td>
                <td>{moment(item.dob).format("MM-DD-YYYY")}</td>
                <td>{moment().diff(moment(item.dob), "years")}</td>
                <td>{item.mobileNo}</td>
                <td>{item.adharNo}</td>
                <td>{item.voterId}</td>
                <td>{item.profession}</td>
                <td>{item.vicile}</td>
                <td>{item.vehiclestatus}</td>
                <td>{item.familyID}</td>
                <td>{item.caste}</td>
                <td>{item.subcaste}</td>
                <td>{item.membersinfamily}</td>

                <td>
                  {item.familyHeadType === 0
                    ? "No"
                    : item.familyHeadType === 1
                    ? "Yes"
                    : "Unknown"}
                </td>
                <td>{item.address}</td>
                <td>{item.location}</td>
                <td>{item.address1}</td>
                <td>{item.city1}</td>
                <td>{item.both}</td>
                <td>{item.roles}</td>
                <td>{item.political}</td>
                <td>
                  <IconButton
                    onClick={() => handleEdit(item.id)}
                    color="success"
                    aria-label="Edit"
                  >
                    <EditIcon />
                  </IconButton>
                </td>
                <td>
                  <IconButton
                    onClick={() => handleDelete(item.id)}
                    color="warning"
                    aria-label="Delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          className="modal-container"
        >
          <div className="modal-card">
            <Card style={{ maxWidth: "800px", margin: "50px auto" }}>
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  style={{
                    textAlign: "center",
                    marginBottom: "20px",
                    fontFamily: "Arial, sans-serif",
                    fontWeight: "bold",
                    color: "blue",
                  }}
                >
                  <span style={{ color: "blue" }}>Voter Details</span> <br />
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    style={{ color: "green", fontSize: "24px" }}
                  />
                </Typography>
                {selectedItem && (
                  <div className="details-container">
                    <div className="details-column">
                      <Typography>
                        <b>ID:</b> {selectedItem.id}
                      </Typography>
                      <Typography>
                        <b>Name:</b> {selectedItem.name}
                      </Typography>
                      <Typography>
                        <b>Relation With:</b> {selectedItem.parent}
                      </Typography>
                      <Typography>
                        <b>Relative Name:</b> {selectedItem.parentName}
                      </Typography>
                      <Typography>
                        <b>Gender:</b> {selectedItem.gender}
                      </Typography>
                      <Typography>
                        <b>DOB:</b>{" "}
                        {moment(selectedItem.dob).format("MM-DD-YYYY")}
                      </Typography>
                      <Typography>
                        <b>Age:</b>
                        {moment().diff(moment(selectedItem.dob), "years")}
                      </Typography>
                      <Typography>
                        <b>Contact:</b> {selectedItem.mobileNo}
                      </Typography>
                      <Typography>
                        <b>Aadhar:</b> {selectedItem.adharNo}
                      </Typography>
                      <Typography>
                        <b>Voter ID:</b> {selectedItem.voterId}
                      </Typography>
                      <Typography>
                        <b>Profession:</b> {selectedItem.profession}
                      </Typography>
                      <Typography>
                        <b>Vehicle Type:</b> {selectedItem.vicile}
                      </Typography>
                      <Typography>
                        <b>Vehicle Number:</b> {selectedItem.vehiclestatus}
                      </Typography>
                    </div>
                    <div className="details-column">
                      <Typography>
                        <b>Family ID:</b> {selectedItem.familyID}
                      </Typography>
                      <Typography>
                        <b>Caste:</b> {selectedItem.caste}
                      </Typography>
                      <Typography>
                        <b>Sub-Caste:</b> {selectedItem.subcaste}
                      </Typography>
                      <Typography>
                        <b>Total In Family:</b> {selectedItem.membersinfamily}
                      </Typography>
                      <Typography>
                        <b>Family Head Status:</b> 
                        {selectedItem.familyHeadType === 0
                          ? "No"
                          : selectedItem.familyHeadType === 1
                          ? "Yes"
                          : "Unknown"}
                      </Typography>
                      <Typography>
                        <b>Permanent Address:</b>
                      </Typography>
                      <Typography>
                        <b>City:</b> {selectedItem.location}
                      </Typography>
                      <Typography>
                        <b>Address:</b> {selectedItem.address}
                      </Typography>
                      <Typography>
                        <b>Current Address:</b>
                      </Typography>
                      <Typography>
                        <b>City: </b>
                        {selectedItem.city1}
                      </Typography>
                      <Typography>
                        <b>Address:</b> {selectedItem.address1}
                      </Typography>
                      <Typography>
                        <b>Booth:</b> {selectedItem.both}
                      </Typography>
                      <Typography>
                        <b>Role:</b> {selectedItem.roles}
                      </Typography>
                      <Typography>
                        <b>Voter View:</b> {selectedItem.political}
                      </Typography>
                    </div>
                  </div>
                )}
                <div className="button-container">
                  <Button
                    variant="contained"
                    color="info"
                    onClick={handleCloseModal}
                  >
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </Modal>

        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
    </>
  );
}
