import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
export default function Booth() {
  const [data, setData] = useState([]);
  const [getbyid, setGetbyid] = useState([]);
  const [editid, setEditid] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    fetch("http://localhost:5211/api/panel/getlist/block")
      .then((response) => response.json())
      .then((data) => setOptions(data));
    setOptions(data);
    console.log(options);
  }, []);

  const GetData = () => {
    axios
      .get("http://localhost:5211/api/panel/getlist/both")
      .then((resp) => setData(resp.data));
  };

  useEffect(() => {
    GetData();
  }, []);

  const EditPriority = async (id, values) => {
    try {
      await axios.put(`http://localhost:5211/api/panel/put/both/${id}`, values);
      document.getElementById("myForm").reset();
      document.getElementById("mySelect").value = "";
      toast.success("Data successfully updated");
      setGetbyid([]);
      GetData();
      setEditid(null);
    } catch (error) {
      console.error("Failed to update data:", error);
      toast.error("Failed to update data");
    }
  };

  const handleEdit = async (id, e) => {
    try {
      e.preventDefault();
      const response = await fetch(
        `http://localhost:5211/api/panel/getbyid/both/${id}`
      );
      if (response.ok) {
        const data = await response.json();
        setGetbyid(data);
      }
      setEditid(id);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handleSubmit = async (values, resetForm) => {
    try {
      await axios.post("http://localhost:5211/api/panel/post/both", values);
      toast.success("Data successfully added");
      GetData();
      document.getElementById("myForm").reset();
      resetForm();
    } catch (error) {
      console.error("Failed to add data:", error);
      toast.error("Failed to add data");
    }
  };
  const handleDelete = async (id) => {
    let Delete = await fetch(
      `http://localhost:5211/api/panel/delete/both/${id}`,
      {
        method: "POST",
      }
    );

    toast.success("Data deleted successfully");
    GetData();
  };

  const handleView = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5211/api/panel/getbyid/both/${id}`
      );
      if (response.ok) {
        const data = await response.json();
        setGetbyid(data);
        setModalOpen(true);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div>
      <div className="container-admin">
        <div className="card add-card ">
          <div className="card-body">
            <h5 className="card-title">
              <b>
                <i>Add Booth</i>
              </b>
            </h5>
            <Formik
              enableReinitialize
              initialValues={{
                blockId: getbyid != null ? getbyid.blockId : "",
                name: getbyid != null ? getbyid.name : "",
                isActive: selectedItem ? selectedItem.isActive.toString() : "1",
              }}
              onSubmit={(values, { resetForm }) => {
                handleSubmit(values, resetForm);
              }}
            >
              {({
                values,
                handleChange,
                handleSubmit,
                handleReset,
                isSubmitting,
                resetForm,
              }) => (
                <form id="myForm" className="row g-3" onSubmit={handleSubmit}>
                  <div className="col-md-10">
                    <FormControl sx={{ width: "750px" }}>
                      <InputLabel>Block</InputLabel>
                      <Select
                        id="mySelect"
                        type="text"
                        name="blockId"
                        label="Block List"
                        value={values.blockId}
                        onChange={handleChange}
                      >
                        <MenuItem value="">--Select Block--</MenuItem>
                        {options.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-md-10">
                    <TextField
                      sx={{ width: "750px" }}
                      type="text"
                      name="name"
                      label="Insert Booth Number"
                      value={values.name}
                      onChange={handleChange}
                    />
                    <FormGroup tag="fieldset" className="col-md-2">
                      <legend className="col-form-label">IsActive</legend>
                      <FormGroup check>
                        <Label check>
                          <Field
                            type="radio"
                            name="isActive"
                            value="1"
                            className="form-check-input"
                          />
                          Active
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Field
                            type="radio"
                            name="isActive"
                            value="0"
                            className="form-check-input"
                          />
                          Inactive
                        </Label>
                      </FormGroup>
                    </FormGroup>
                  </div>
                  <div className="text-center">
                    {editid ? (
                      <div>
                        <button
                          type="button"
                          onClick={() => EditPriority(editid, values)}
                          className="btn btn-submit btn-primary"
                          disabled={isSubmitting}
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            handleReset();
                            setEditid(null);
                          }}
                          className="btn btn-submit btn-secondary mx-2"
                          disabled={isSubmitting}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-submit btn-primary"
                        disabled={isSubmitting}
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
        <div>
          <section className="section">
            <div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="card list-card">
                    <div className="card-body">
                      <h5 className="card-title">Booth List</h5>
                      <table className="table table-hover table-striped table-bordered mt-5">
                        <thead>
                          <tr>
                            <th>Sr.No</th>
                            <th>Name</th>
                            <th>blockId</th>
                            <th>IsActive</th>
                            <th colSpan={3} style={{ textAlign: "center" }}>
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.name}</td>
                              <td>{item.blockId}</td>
                              <td>{item.isActive ? "Active" : "Inactive"}</td>
                              <td>
                                <IconButton
                                  onClick={(e) => handleEdit(item.id, e)}
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
                              <td>
                                <IconButton
                                  onClick={() => handleView(item.id)}
                                  color="primary"
                                  aria-label="View"
                                >
                                  <VisibilityIcon />
                                </IconButton>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Modal
        style={{ maxWidth: "500px", margin: "50px auto" }}
        isOpen={modalOpen}
        toggle={closeModal}
        className="modal-container"
      >
        <div className="modal-card">
          <ModalHeader
            variant="h5"
            component="div"
            style={{ textAlign: "center", marginBottom: "20px" }}
            toggle={closeModal}
          >
            Booth Details
            <br />
            <FontAwesomeIcon
              icon={faCheckCircle}
              style={{ color: "green", fontSize: "24px" }}
            />
          </ModalHeader>
          <div style={{ marginLeft: "130px", color: "#641E16" }}>
            <ModalBody>
              <div>
                <p>Block ID: {getbyid.blockId}</p>
                <p>Name: {getbyid.name}</p>
                <p>IsActive: {getbyid.isActive ? "Active" : "Inactive"}</p>
              </div>
            </ModalBody>
          </div>

          <ModalFooter>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Button variant="contained" color="primary" onClick={closeModal}>
                Close
              </Button>
            </div>
          </ModalFooter>
        </div>
      </Modal>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}
