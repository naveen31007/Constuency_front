import { IconButton } from "@mui/material";
import axios from "axios";
import { Field, Formik, resetForm } from "formik";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextField } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FormGroup, Label } from "reactstrap";

export default function AddDistrict() {
  const [data, setData] = useState([]);
  const [getbyid, setGetbyid] = useState([]);
  const [editid, setEditid] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5211/api/panel/getlist/state")
      .then((response) => response.json())
      .then((data) => setOptions(data));
    setOptions(data);
  }, []);

  useEffect(() => {
    GetData();
  }, []);
  const GetData = () => {
    axios
      .get("http://localhost:5211/api/panel/getlist/district")
      .then((resp) => {
        setData(resp.data);
        setFilteredData(resp.data);
      });
  };
  const EditPriority = async (id, values) => {
    try {
      await axios.put(
        `http://localhost:5211/api/panel/put/district/${id}`,
        values
      );
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
        `http://localhost:5211/api/panel/getById/district/${id}`
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
      await axios.post(
        "http://localhost:5211/api/panel/post/district/",
        values
      );
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
      `http://localhost:5211/api/panel/delete/district/${id}`,
      {
        method: "POST",
      }
    );

    toast.success("Data deleted successfully");
    GetData();
  };

  const handleStateChange = (event) => {
    const stateId = event.target.value;
    setSelectedItem(stateId);

    if (stateId) {
      const filtered = data.filter((item) => item.stateId === stateId);
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <div>
      <div className="container-admin">
        <div className="card add-card">
          <div className="card-body">
            <h5
              style={{ paddingTop: "20px", marginLeft: "400px" }}
              className="card-title"
            >
              Add District
            </h5>
            <Formik
              enableReinitialize
              initialValues={{
                name: getbyid != null ? getbyid.name : "",
                stateId: getbyid != null ? getbyid.stateId : "",
                isActive:
                  selectedItem && selectedItem.isActive
                    ? selectedItem.isActive.toString()
                    : "1",
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
                    <FormControl fullWidth>
                      <InputLabel id="inputName5">State List</InputLabel>
                      <Select
                        labelId="inputName5"
                        id="mySelect"
                        name="stateId"
                        label="State List"
                        value={values.stateId}
                        onChange={(event) => {
                          handleChange(event);
                          handleStateChange(event);
                        }}
                      >
                        <MenuItem value="">--Select State--</MenuItem>
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
                      id="mySelect"
                      type="text"
                      label="Name"
                      name="name"
                      onFocus={(e) => (e.target.type = "name")}
                      onBlur={(e) => (e.target.type = "text")}
                      value={values.name}
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                    />
                  </div>
                  <div style={{ paddingLeft: "40px" }}>
                    <FormGroup tag="fieldset" className="col-md-2">
                      <legend className="col-form-label">
                        <b>IsActive</b>
                      </legend>
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
                      <h5
                        style={{ paddingTop: "20px", marginLeft: "400px" }}
                        className="card-title"
                      >
                        District List
                      </h5>
                      <table className="table table-hover table-striped table-bordered mt-5">
                        <thead>
                          <tr>
                            <th>Sr.No</th>
                            <th>Sr.No</th>
                            <th>District</th>
                            <th>Status</th>
                            <th>State ID</th>
                            <th colSpan={2} style={{ textAlign: "center" }}>
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredData.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.id}</td>
                              <td>{item.name}</td>
                              <td>{item.isActive ? "Active" : "Inactive"}</td>
                              <td>{item.stateId}</td>
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
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}
