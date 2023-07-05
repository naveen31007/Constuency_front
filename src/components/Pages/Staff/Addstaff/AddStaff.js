import axios from "axios";
import { Formik, Form } from "formik";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { Card, CardTitle, CardBody, Table, Button } from "reactstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddStaff() {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  // call select value for party
  const [party, setParty] = useState([]);

  const FormRow = styled("div")({
    display: "flex",
    gap: "1.5rem",
    marginBottom: "1.5rem",
  });

  const FormField = styled(FormControl)({
    flex: "1",
  });

  const getData = () => {
    axios
      .get("http://localhost:5211/api/panel/list/staff")
      .then((resp) => setData(resp.data));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleEdit = (item) => {
    setSelectedItem(item);
  };

  const handleSubmit = async (values, { resetForm }) => {
    if (selectedItem) {
      // Update existing item
      const { id } = selectedItem;

      try {
        await axios.put(
          `http://localhost:5211/api/panel/put/staff/${id}`,
          values
        );
        toast.success("Data updated successfully");
        getData();
        resetForm();
        setSelectedItem(null);
      } catch (error) {
        toast.error("Failed to update data");
      }
    } else {
      // Submit new item
      try {
        await axios.post("http://localhost:5211/api/panel/post/staff", values);
        toast.success("Data added successfully");
        getData();
        resetForm();
      } catch (error) {
        toast.error("Failed to add data");
      }
    }
  };

  const handleDelete = async (id) => {
    let Delete = await fetch(
      `http://localhost:5211/api/panel/delete/staf/${id}`,
      {
        method: "POST",
      }
    );
    toast.success("Data deleted successfully");
    getData();
  };

  
  useEffect(() => {
    GetParty();
  }, []);

  const GetParty = (id) => {
    fetch(`http://localhost:5211/api/DropDown/api/panel/getparty`)
      .then((response) => response.json())
      .then((data) => setParty(data));
    setParty(data);
  };

  return (
    < >
      <div className="container-admin">
        <Card className="add-card">
          <CardBody>
            <CardTitle tag="h5" className="text-center">
              ADD Staff
            </CardTitle>
            <Formik
              enableReinitialize
              initialValues={{
                name: selectedItem ? selectedItem.name : "",
                fatherName: selectedItem ? selectedItem.fatherName : "",
                emailId: selectedItem ? selectedItem.emailId : "",
                mobileNo: selectedItem ? selectedItem.mobileNo : "",
                address: selectedItem ? selectedItem.address : "",
                partyId: selectedItem ? selectedItem.partyId : "",
              }}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, handleReset }) => (
                <Form>
                  <div className="col-md-6 offset-md-3 col-12 mb-3">
                    <FormRow>
                      <FormField>
                        <TextField
                          type="text"
                          name="name"
                          label="Name"
                          value={values.name}
                          onChange={handleChange}
                        />
                      </FormField>
                      <FormField>
                        <TextField
                          type="text"
                          name="fatherName"
                          label="Father Name"
                          value={values.fatherName}
                          onChange={handleChange}
                        />
                      </FormField>
                    </FormRow>
                  </div>

                  <div className="col-md-6 offset-md-3 col-12 mb-3 ">
                    <FormRow>
                      <FormField>
                        <TextField
                          type="email"
                          name="emailId"
                          label="Email-Id"
                          value={values.emailId}
                          onChange={handleChange}
                        />
                      </FormField>

                      <FormField>
                        <TextField
                          type="text"
                          name="mobileNo"
                          label="Mobile No"
                          value={values.mobileNo}
                          onChange={handleChange}
                        />
                      </FormField>
                    </FormRow>
                  </div>

                  <div className="col-md-6 offset-md-3 col-12 mb-3 ">
                    <FormRow>
                      <FormField>
                        <TextField
                          type="text"
                          name="address"
                          label="Address"
                          value={values.address}
                          onChange={handleChange}
                        />
                      </FormField>

                      <FormField>
                        <FormControl>
                          <InputLabel>Party</InputLabel>
                          <Select
                            type="text"
                            name="partyId"
                            label="Party"
                            value={values.partyId}
                            onChange={handleChange}
                          >
                        <MenuItem value=""><b>Select Party:---</b></MenuItem>
                            {party.map((item, id) => (
                              <MenuItem key={id} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </FormField>
                    </FormRow>
                  </div>

                  <div className="col-12 text-center mt-3">
                    {selectedItem ? (
                      <>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          Update
                        </Button>
                        <Button
                        style={{margin:'15px'}} 
                          type="button"
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            handleReset();
                            setSelectedItem(null);
                          }}
                          className="ml-2"
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button type="submit" color="primary">
                        Submit
                      </Button>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>

        <Card className="show-card">
          <CardBody>
            <CardTitle tag="h5" className="text-center">
              State List
            </CardTitle>
            <Table className="table table-hover table-striped table-bordered mt-5">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Father Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Party</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.fatherName}</td>
                    <td>{item.mobileNo}</td>
                    <td>{item.emailId}</td>
                    <td>{item.address}</td>
                    <td>{item.party}</td>

                    <td>
                      <IconButton
                        onClick={() => handleEdit(item)}
                        color="success"
                        aria-label="Edit"
                      >
                        <EditIcon />
                      </IconButton>
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
            </Table>
          </CardBody>
        </Card>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </ >
  );
}
