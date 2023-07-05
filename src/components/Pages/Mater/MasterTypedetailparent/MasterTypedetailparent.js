import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
export default function MasterTypedetailparent() {
  const [data, setData] = useState([]);
  const [getbyid, setGetbyid] = useState([]);
  const [editid, setEditid] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5211/api/panel/mastertype/details/list")
      .then((response) => response.json())
      .then((data) => setOptions(data));
    setOptions(data);
    console.log(options);
  }, []);

  const GetData = () => {
    axios
      .get("http://localhost:5211/api/panel/mastertype/details/list")
      .then((resp) => setData(resp.data));
  };

  useEffect(() => {
    GetData();
  }, []);

  const EditPriority = async (id, values) => {
    try {
      await axios.put(
        `http://localhost:5211/api/panel/mastertype/details/${id}`,
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
        `http://localhost:5211/api/panel/mastertype/details/${id}`
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
        "http://localhost:5211/api/panel/mastertype/details",
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
      `http://localhost:5211/api/panel/mastertype/details/${id}`,
      {
        method: "POST",
      }
    );

    toast.success("Data deleted successfully");

    GetData();
  };

  return (
    <div>
      <div className="container-admin">
        <div className="card add-card ">
          <div className="card-body">
            <h5 className="card-title">Master Type Parent Details</h5>
            <Formik
              enableReinitialize
              initialValues={{
                name: getbyid != null ? getbyid.name : "",
                parentId: getbyid != null ? getbyid.parentId : "",
                // typeId:  0,
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
                      <InputLabel>Master Type Detail</InputLabel>
                      <Select
                        id="mySelect"
                        type="text"
                        name="parentId"
                        label="Master Type"
                        value={values.parentId}
                        onChange={handleChange}
                      >
                        <MenuItem value="">--Select MesterType--</MenuItem>
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
                      label="Name"
                      value={values.name}
                      onChange={handleChange}
                    />
                  </div>
                  {/* <button type="button" onClick={resetForm}>reset</button> */}
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
                      <h5 className="card-title">Master Type Details List</h5>
                      <table className="table table-hover table-striped table-bordered mt-5">
                        <thead>
                          <tr>
                            <th>Sr.No</th>
                            <th>Sr.No</th>
                            <th>Name</th>
                            <th>parentId</th>
                            <th>Parent Name</th>
                            <th>TypetId</th>
                            <th>Type Name</th>
                            <th colSpan={2} style={{ textAlign: "center" }}>
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.id}</td>
                              <td>{item.name}</td>
                              <td>{item.parentId}</td>
                              <td>{item.parent}</td>
                              <td>{item.typeId}</td>
                              <td>{item.type}</td>

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
