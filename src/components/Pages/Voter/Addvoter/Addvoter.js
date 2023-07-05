import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment/moment";

const steps = ["Basic Profile", "Family", "Location", "Political View"];

export default function AddVoter() {
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(0);
  const [gender, setGender] = useState([]);
  const [profession, setProfession] = useState([]);
  const [getCaste, setGetCaste] = useState([]);
  const [getsubCaste, setsubGetCaste] = useState([]);
  const [state, setState] = useState([]);
  const [district, setDistrict] = useState([]);
  const [city, setCity] = useState([]);
  const [getbyid, setGetbyid] = useState(null);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [citys, setCitys] = useState([]);
  const [booth, setBooth] = useState([]);
  const [relation, setRelation] = useState([]);
  const [role, setRole] = useState([]);
  const [vehicletype, setVehicletype] = useState([]);
  const [view, setView] = useState([]);
  const ListId = location.state?.id ?? null;
  const [editid, setEditid] = useState(null);
  const [data, setData] = useState([]);

  const nevigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5211/api/DropDown/api/panel/get/relation")
      .then((response) => response.json())
      .then((data) => setRelation(data));
  }, []);
  useEffect(() => {
    Getvehicletype();
  }, []);
  const Getvehicletype = () => {
    fetch("http://localhost:5211/api/DropDown/api/panel/get/vehicletype")
      .then((response) => response.json())
      .then((data) => setVehicletype(data));
    setVehicletype(data);
  };
  useEffect(() => {
    GetRole();
  }, []);
  const GetRole = (id) => {
    fetch(`http://localhost:5211/api/DropDown/api/panel/getrole`)
      .then((response) => response.json())
      .then((data) => setRole(data));
    setRole(data);
  };
  const handleSubmit = async (values) => {
    console.log(values);
    let post = await fetch("http://localhost:5211/api/panel/post/entity", {
      method: "post",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (post.ok) {
      toast.success("Data successfully added");
    }
  };
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  useEffect(() => {
    GetGender();
  }, []);
  const GetGender = () => {
    fetch(`http://localhost:5211/api/DropDown/api/panel/getgender`)
      .then((response) => response.json())
      .then((data) => setGender(data));
    setGender(data);
  };
  
  useEffect(() => {
    GetProfession();
  }, []);
  const GetProfession = (id) => {
    fetch(`http://localhost:5211/api/DropDown/api/panel/getProfassion`)
      .then((response) => response.json())
      .then((data) => setProfession(data));
    setProfession(data);
  };

  useEffect(() => {
    fetch("http://localhost:5211/api/DropDown/api/panel/getCaste")
      .then((response) => response.json())
      .then((data) => setGetCaste(data));
  }, []);

  const GetSubCaste = (id) => {
    fetch(`http://localhost:5211/api/DropDown/api/panel/getSubCaste/${id}`)
      .then((response) => response.json())
      .then((data) => setsubGetCaste(data));
    setsubGetCaste(data);
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
      .then((data) => setDistrict(data));
  };
  const GetCity = (id) => {
    fetch(`http://localhost:5211/api/panel/getcitys/${id}`)
      .then((response) => response.json())
      .then((data) => setCity(data));
    setCity(data);
  };

  useEffect(() => {
    fetch("http://localhost:5211/api/panel/getlist/state")
      .then((response) => response.json())
      .then((data) => setStates(data));
  }, []);
  const GetDistricts = (id) => {
    console.log(id);
    fetch(`http://localhost:5211/api/panel/getdistricts/${id}`)
      .then((response) => response.json())
      .then((data) => setDistricts(data));
  };
  const GetCitys = (id) => {
    fetch(`http://localhost:5211/api/panel/getcitys/${id}`)
      .then((response) => response.json())
      .then((data) => setCitys(data));
  };

  useEffect(() => {
    GetView();
  }, []);
  const GetView = (id) => {
    fetch("http://localhost:5211/api/DropDown/api/panel/get/polictical")
      .then((response) => response.json())
      .then((data) => setView(data));
    setView(data);
  };

  useEffect(() => {
    Getbooth();
  }, []);
  const Getbooth = (id) => {
    fetch(`http://localhost:5211/api/panel/getlist/both`)
      .then((response) => response.json())
      .then((data) => setBooth(data));
    setBooth(data);
  };
  const EditPriority = async (ListId, values) => {
    let post = await fetch(
      "http://localhost:5211/api/panel/put/entity/" + ListId,
      {
        method: "put",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (post.ok) {
      toast.success("Data Updated Successfully");
      nevigate("/voterlist");

      console.log("Data Update", post);
      setEditid(null);
    }
  };

  const handleEdit = async () => {
    let get = await fetch(
      `http://localhost:5211/api/panel/listbyid/entity/${ListId}`
    );
    if (get.ok) {
      get = await get.json();
      setGetbyid(get);

      console.log("updated by id", get);
    }
  };
  useEffect(() => {
    if (ListId != null) {
      handleEdit();
    }
  }, [1]);

  return (
    <>
      <div>
        <span
          style={{
            paddingLeft: "747px",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <b>
            <Link to="/voterlist">
              Go To Voter List
              <ArrowForwardIcon />
            </Link>
          </b>
        </span>
      </div>
      <div className="">
        <h1 style={{ fontFamily: "Arial, Helvetica", textAlign: "center" }}>
          Add Voter Profile
        </h1>
        <Box display="flex" justifyContent="center">
          <Card
            sx={{ width: "900px", border: "2px solid blue" }}
            variant="outlined"
          >
            <CardContent>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Formik
                enableReinitialize
                initialValues={{
                  name: getbyid != null ? getbyid.name : "",
                  parentTypeId: getbyid != null ? getbyid.parentTypeId : "",
                  parentName: getbyid != null ? getbyid.parentName : " ",
                  mobileNo: getbyid != null ? getbyid.mobileNo : "",
                  politicalView: getbyid != null ? getbyid.politicalView : "",
                  vehicleType: getbyid != null ? getbyid.vehicleType : "",
                  vehiclestatus: getbyid != null ? getbyid.vehiclestatus : " ",
                  dob:
                    getbyid != null
                      ? moment(getbyid.dob).format("YYYY-MM-DD")
                      : "",
                  genderId: getbyid != null ? getbyid.genderId : "",
                  adharNo: getbyid != null ? getbyid.adharNo : " ",
                  voterId: getbyid != null ? getbyid.voterId : " ",
                  familyID: getbyid != null ? getbyid.familyID : " ",
                  membersinfamily:
                    getbyid != null ? getbyid.membersinfamily : " ",
                  familyHeadType: getbyid != null ? getbyid.familyHeadType : "",
                  cityId: getbyid != null ? getbyid.cityId : "",
                  cityId1: getbyid != null ? getbyid.cityId1 : "",
                  bothId: getbyid != null ? getbyid.bothId : "",
                  address: getbyid != null ? getbyid.address : " ",
                  address1: getbyid != null ? getbyid.address1 : " ",
                  casteId: getbyid != null ? getbyid.casteId : "",
                  subCasteId: getbyid != null ? getbyid.subCasteId : "",
                  professionId: getbyid != null ? getbyid.professionId : "",
                  role: getbyid != null ? getbyid.role : "",
                }}
                onSubmit={async (values, { resetForm }) => {
                  await handleSubmit(values, resetForm);
                  resetForm();
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
                  <form id="myform" onSubmit={handleSubmit}>
                    {activeStep === 0 && (
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr 1fr 1fr",
                          gap: "16px",
                          mt: 3,
                        }}
                      >
                        <TextField
                          name="name"
                          label="Name"
                          value={values.name}
                          onChange={handleChange}
                        />
                        <FormControl>
                          <InputLabel>Relation Type</InputLabel>
                          <Select
                            name="parentTypeId"
                            label="Relation Type"
                            value={values.parentTypeId}
                            onChange={handleChange}
                          >
                            <MenuItem value=""><b>Select Relative:---</b></MenuItem>

                            {relation.map((item, id) => (
                              <MenuItem key={id} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <TextField
                          name="parentName"
                          label="Relative Name"
                          value={values.parentName}
                          onChange={handleChange}
                        />
                        <FormControl>
                          <InputLabel>Gender</InputLabel>
                          <Select
                            name="genderId"
                            label="Gender"
                            value={values.genderId}
                            onChange={handleChange}
                          >
                            <MenuItem value=""><b>Select Gender:---</b></MenuItem>

                            {gender.map((item, id) => (
                              <MenuItem key={id} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <TextField
                          name="dob"
                          label="Date of Birth"
                          type="text"
                          onFocus={(e) => (e.target.type = "date")}
                          onBlur={(e) => (e.target.type = "text")}
                          value={values.dob}
                          onChange={handleChange}
                        />
                        <TextField
                          name="mobileNo"
                          label="Contact Number"
                          value={values.mobileNo}
                          onChange={handleChange}
                        />
                        <TextField
                          name="adharNo"
                          label="Aadhar Number"
                          value={values.adharNo}
                          onChange={handleChange}
                        />
                        <TextField
                          name="voterId"
                          label="Voter ID"
                          value={values.voterId}
                          onChange={handleChange}
                        />
                        <FormControl>
                          <InputLabel>Profession</InputLabel>
                          <Select
                            label="Profession"
                            name="professionId"
                            value={values.professionId}
                            onChange={handleChange}
                          >
                            <MenuItem value=""><b>Select Profession:---</b></MenuItem>

                            {profession.map((item, id) => (
                              <MenuItem key={id} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <FormControl>
                          <InputLabel>Vehicle Type</InputLabel>
                          <Select
                            label="Vehicle Type"
                            name="vehicleType"
                            value={values.vehicleType}
                            onChange={handleChange}
                          >
                            <MenuItem value=""><b>Select Van Type:---</b></MenuItem>

                            {vehicletype.map((item, id) => (
                              <MenuItem key={id} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <TextField
                          name="vehiclestatus"
                          label="Vehicle Number"
                          value={values.vehiclestatus}
                          onChange={handleChange}
                        />
                      </Box>
                    )}

                    {activeStep === 1 && (
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr 1fr 1fr",
                          gap: "16px",
                          mt: 3,
                        }}
                      >
                        <TextField
                          name="familyID"
                          label="Family ID"
                          value={values.familyID}
                          onChange={handleChange}
                        />

                        <FormControl>
                          <InputLabel>Caste</InputLabel>
                          <Select
                            name="casteId"
                            label="Caste"
                            value={values.casteId}
                            onChange={(e) => {
                              handleChange(e);
                              GetSubCaste(e.target.value);
                            }}
                          >
                            <MenuItem value=""><b>Select Caste:---</b></MenuItem>
                            {getCaste.map((item, id) => (
                              <MenuItem key={id} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <FormControl>
                          <InputLabel>Sub-Caste</InputLabel>
                          <Select
                            name="subCasteId"
                            label="Sub-Caste"
                            value={values.subCasteId}
                            onChange={handleChange}
                          >
                            <MenuItem value=""><b>Select Sub-Caste:---</b></MenuItem>
                            {getsubCaste.map((item, id) => (
                              <MenuItem key={id} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <TextField
                          name="membersinfamily"
                          label="Total Family Members"
                          value={values.membersinfamily}
                          onChange={handleChange}
                        />
                        <div style={{ paddingLeft: "40px",borderBlockColor:'blue'}}>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="familyHeadType"
                              id="exampleRadios1"
                              onChange={handleChange}
                              value={"1"}
                              checked={values.familyHeadType === "1"}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleRadios1"
                            >
                              Yes
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="familyHeadType"
                              id="exampleRadios2"
                              onChange={handleChange}
                              value={"0"}
                              checked={values.familyHeadType === "0"}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleRadios2"
                            >
                              No
                            </label>
                          </div>
                        </div>
                      </Box>
                    )}
                    {activeStep === 2 && (
                      <Box sx={{ textAlign: "center" }} variant="h5 ">
                        {" "}
                        <Typography>Permanet Address</Typography>
                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr 1fr",
                            gap: "16px",
                            mt: 3,
                          }}
                        >
                          
                           <FormControl>
                          <InputLabel>State</InputLabel>
                          <Select
                            name="state"
                            label="State"
                            value={values.state}
                            onChange={(e) => {
                              handleChange(e);
                              GetDistrict(e.target.value);
                            }}
                          >
                            <MenuItem value=""><b>Select State:---</b></MenuItem>

                            {state.map((item, id) => (
                              <MenuItem key={id} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                          <FormControl>
                            <InputLabel>District</InputLabel>
                            <Select
                              name="id"
                              label="District"
                              value={values.id}
                              onChange={(e) => {
                                handleChange(e);
                                GetCity(e.target.value);
                              }}
                            >
                              <MenuItem value=""><b>Select District:---</b></MenuItem>
                              {district.map((item, id) => (
                                <MenuItem key={id} value={item.id}>
                                  {item.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <FormControl>
                            <InputLabel>City</InputLabel>
                            <Select
                              name="cityId"
                              label="City"
                              value={values.cityId}
                              onChange={handleChange}
                            >
                              <MenuItem value=""><b>Select City:---</b></MenuItem>
                              {city.map((item, id) => (
                                <MenuItem key={id} value={item.id}>
                                  {item.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <TextField
                            name="address"
                            label="Address-1"
                            value={values.address}
                            onChange={handleChange}
                          />
                        </Box>
                        <Box
                          sx={{ textAlign: "center", marginTop: "20px" }}
                          variant="h5 "
                        >
                          <Typography>Current Address</Typography>
                          <Box
                            sx={{
                              display: "grid",
                              gridTemplateColumns: "1fr 1fr 1fr 1fr",
                              gap: "16px",
                              mt: 3,
                            }}
                          >
                            <FormControl>
                              <InputLabel>State</InputLabel>
                              <Select
                                name="state"
                                label="State"
                                value={values.state}
                                onChange={(e) => {
                                  handleChange(e);
                                  GetDistricts(e.target.value);
                                }}
                              >
                              <MenuItem value=""><b>Select State:---</b></MenuItem>
                                {states.map((item, id) => (
                                  <MenuItem key={id} value={item.id}>
                                    {item.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                            <FormControl>
                              <InputLabel>District</InputLabel>
                              <Select
                                name="districtId"
                                label="District"
                                value={values.districtId}
                                onChange={(e) => {
                                  handleChange(e);
                                  GetCitys(e.target.value);
                                }}
                              >
                              <MenuItem value=""><b>Select District:---</b></MenuItem>
                                {districts.map((item, id) => (
                                  <MenuItem key={id} value={item.id}>
                                    {item.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                            <FormControl>
                              <InputLabel>City</InputLabel>
                              <Select
                                name="cityId1"
                                label="City"
                                value={values.cityId1}
                                onChange={handleChange}
                              >
                              <MenuItem value=""><b>Select City:---</b></MenuItem>
                                {citys.map((item, id) => (
                                  <MenuItem key={id} value={item.id}>
                                    {item.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                            <TextField
                              name="address1"
                              label="Address-2"
                              value={values.address1}
                              onChange={handleChange}
                            />
                          </Box>
                        </Box>
                      </Box>
                    )}
                    {activeStep === 3 && (
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr 1fr 1fr",
                          gap: "16px",
                          mt: 3,
                        }}
                      >
                        <FormControl>
                          <InputLabel>Booth</InputLabel>
                          <Select
                            name="bothId"
                            label="Booth"
                            value={values.bothId}
                            onChange={handleChange}
                          >
                            <MenuItem value=""><b>Select Booth:---</b></MenuItem>
                            {booth.map((item, id) => (
                              <MenuItem key={id} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <FormControl>
                          <InputLabel>Role</InputLabel>
                          <Select
                            name="role"
                            label="Role"
                            value={values.role}
                            onChange={handleChange}
                          >
                            <MenuItem value=""><b>Select Role:---</b></MenuItem>
                            {role.map((item, id) => (
                              <MenuItem key={id} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <FormControl>
                          <InputLabel>Voter View</InputLabel>
                          <Select
                            name="politicalView"
                            label="Voter View"
                            value={values.politicalView}
                            onChange={handleChange}
                          >
                            <MenuItem value=""><b>Select View:---</b></MenuItem>
                            {view.map((item, id) => (
                              <MenuItem key={id} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    )}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: 3,
                      }}
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                        sx={{ ml: 1, marginRight: "10px" }}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        disabled={activeStep === steps.length - 1}
                      >
                        Next
                      </Button>
                      {activeStep === steps.length - 1 && (
                        <>
                          {ListId ? (
                            <Button
                              type="button"
                              variant="contained"
                              onClick={() => EditPriority(ListId, values)}
                              style={{
                                visibility: ListId ? "visible" : "hidden",
                              }}
                              className="btn btn-submit btn-info"
                              sx={{ ml: 1 }}
                            >
                              Update
                            </Button>
                          ) : (
                            <Button
                              type="submit"
                              variant="contained"
                              className="btn btn-submit btn-success"
                              style={{
                                visibility: ListId ? "hidden" : "visible",
                              }}
                              sx={{ ml: 1 }}
                            >
                              Submit
                            </Button>
                          )}
                        </>
                      )}
                    </Box>
                  </form>
                )}
              </Formik>
            </CardContent>
          </Card>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar
          />
        </Box>
      </div>
    </>
  );
}
