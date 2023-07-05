import axios from "axios";
import { Formik, Form, Field } from "formik";
import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Card,
  CardTitle,
  CardBody,
  Table,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddState() {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const getData = () => {
    axios
      .get("http://localhost:5211/api/panel/getlist/state")
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
          `http://localhost:5211/api/panel/put/state/${id}`,
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
        await axios.post("http://localhost:5211/api/panel/post/state", values);
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
      `http://localhost:5211/api/panel/delete/state/${id}`,
      {
        method: "POST",
      }
    );
    toast.success("Data deleted successfully");
    getData();
  };

  return (
    <div>
      <div className="container-admin">
        <Card className="add-card">
          <CardBody>
            <CardTitle
              style={{ paddingTop: "20px", marginLeft: "400px" }}
              tag="h5"
            >
              ADD State
            </CardTitle>
            <Formik
              enableReinitialize
              initialValues={{
                name: selectedItem ? selectedItem.name : "",
                isActive:
                  selectedItem && selectedItem.isActive
                    ? selectedItem.isActive.toString()
                    : "1",
              }}
              onSubmit={handleSubmit}
            >
              {({ values, handleChange, handleReset }) => (
                <Form className="row g-3">
                  <FormGroup className="col-md-10">
                    <Label for="inputName5" className="form-label">
                      State Name
                    </Label>
                    <Input
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <div style={{ paddingLeft: "40px" }}>
                    <FormGroup tag="fieldset" className="col-md-2">
                      <legend className="col-form-label">IsActive</legend>
                      <FormGroup check>
                        <Label check>
                          <Field
                            type="radio"
                            name="isActive"
                            value="1"
                            checked={values.isActive === "1"}
                            className="form-check-input"
                            onChange={handleChange}
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
                            checked={values.isActive === "0"}
                            className="form-check-input"
                            onChange={handleChange}
                          />
                          Inactive
                        </Label>
                      </FormGroup>
                    </FormGroup>
                  </div>
                  <div style={{ paddingLeft: "400px" }} className="col-12">
                    {selectedItem ? (
                      <>
                        <Button type="submit" color="primary">
                          Update
                        </Button>
                        <Button
                          type="button"
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
            <CardTitle
              style={{ paddingTop: "20px", marginLeft: "400px" }}
              tag="h5"
            >
              State List
            </CardTitle>
            <Table className="table table-hover table-striped table-bordered mt-5">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th colSpan={2} style={{ textAlign: "center" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.isActive}</td>
                    <td>
                      {item.isActive === "0"
                        ? "No"
                        : item.isActive === "1"
                        ? "Yes"
                        : "Unknown"}
                    </td>

                    <td>
                      <IconButton
                        onClick={() => handleEdit(item)}
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
            </Table>
          </CardBody>
        </Card>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}
