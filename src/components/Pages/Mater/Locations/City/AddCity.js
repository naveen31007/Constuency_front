import { IconButton } from "@mui/material";
import axios from "axios";
import { Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextField } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FormGroup, Label } from "reactstrap";

export default function AddCity() {
  const [data, setData] = useState([]);
  const [getbyid, setGetbyid] = useState([]);
  const [editid, setEditid] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [state, setState] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5211/api/panel/getlist/state")
      .then((response) => response.json())
      .then((data) => setOptions(data));
    setOptions(data);
    console.log(options);
  }, []);

  const GetData = () => {
    axios
      .get("http://localhost:5211/api/panel/getlist/district")
      .then((resp) => setData(resp.data));
  };

  useEffect(() => {
    GetData();
  }, []);

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
    try {
      await axios.post(
        `http://localhost:5211/api/panel/delete/district/${id}`
      );
      toast.success("Data deleted successfully");
      GetData();
    } catch (error) {
      console.error("Failed to delete data:", error);
      toast.error("Failed to delete data");
    }
  };

  useEffect(() => {
    fetch("http://localhost:5211/api/panel/getlist/state")
      .then((response) => response.json())
      .then((data) => setState(data));
    setState(data);
  }, []);

  const GetDistrict = (id) => {
    console.log(id);
    fetch(`http://localhost:5211/api/panel/getdistricts/${id}`)
      .then((response) => response.json())
      .then((data) => setDistricts(data));
  };

  return (
    <div>
      <div className="container-admin">
        <div className="card add-card">
          <div className="card-body">
            <h5 style={{ paddingTop: "20px", marginLeft: "400px" }} className="card-title">Add City</h5>
            <Formik
              enableReinitialize
              initialValues={{
                name: getbyid != null ? getbyid.name : "",
                stateId: getbyid != null ? getbyid.stateId : "",
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
                    <FormControl fullWidth>
                      <InputLabel id="inputName5">State List</InputLabel>
                      <Select
                        labelId="inputName5"
                        id="mySelect"
                        name="stateId"
                        label="State List"
                        value={values.stateId}
                        onChange={(e) => {
                          handleChange(e);
                          GetDistrict(e.target.value);
                        }}
                      >
                        <MenuItem value=""><b>--Select State--</b></MenuItem>
                        {options.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-md-10">
                    <FormControl fullWidth>
                      <InputLabel>District</InputLabel>
                      <Select
                        name="districtId"
                        label="District"
                        value={values.districtId}
                        onChange={handleChange}
                      >
                        <MenuItem value=""><b>--Select District--</b></MenuItem>

                        {districts.map((item, id) => (
                          <MenuItem key={id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-md-10">
                    <TextField
                      id="inputName5"
                      label="Name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                    />
                  </div>
                  <div style={{ paddingLeft: '40px' }}>
                    <FormGroup tag="fieldset" className="col-md-2">
                      <legend className="col-form-label"><b>IsActive</b></legend>
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
                  <div>
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
            <div className="card-body">
              <h5 style={{ paddingTop: "20px", marginLeft: "400px" }} className="card-title">City List</h5>
              <table className="table table-striped table-bordered mt-5">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>StateId</th>
                    <th>DistrictId</th>
                    <th>IsActive</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, id) => (
                    <tr key={id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.stateId}</td>
                      <td>{item.districtId}</td>
                      <td>{item.isActive}</td>
                      <td>
                        <IconButton
                        color="success"
                          onClick={(e) => handleEdit(item.id, e)}

                        >
                          <EditIcon />
                        </IconButton>

                      </td>
                      <td>
                        <IconButton
                        color="warning"
                          onClick={(e) => handleDelete(item.id)}
                          className="btn btn-danger"
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
        <ToastContainer />
      </div>
    </div>
  );
}

 