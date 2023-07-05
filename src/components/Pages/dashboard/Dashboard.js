import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import './Dashboard.css';

export default function Dashboard() {
  const [data, setData] = useState({});
  const [filteredData, setFilteredData] = useState({});

  const getData = () => {
    axios
      .get('http://localhost:5211/api/DashBoard/api/penel/Report/Dashboard')
      .then((resp) => {
        setData(resp.data);
        setFilteredData(resp.data);
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (<>
    <div style={{paddingLeft:"90px"}}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="dashboard-card mt-4">
            <div className="card-inner">
              <CardContent className="card-front">
                <Typography variant="h6" component="div">
                   Voters <br/><span style={{marginLeft:"22px"}}>{filteredData.totalVoter}</span> 
                </Typography>
              </CardContent>
              <CardContent className="card-back">
                <Typography variant="h6" component="div">
                   Voters<br/><span style={{marginLeft:"22px"}}>{filteredData.totalVoter}</span>
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="dashboard-card mt-4">
            <div className="card-inner">
              <CardContent className="card-front">
                <Typography variant="h6" component="div">
                   Male <br/> <span style={{marginLeft:"14px"}}>{filteredData.totalMale}</span>
                </Typography>
              </CardContent>
              <CardContent className="card-back">
                <Typography variant="h6" component="div">
                   Male <br/><span style={{marginLeft:"14px"}}>{filteredData.totalMale}</span>
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="dashboard-card mt-4">
            <div className="card-inner">
              <CardContent className="card-front">
                <Typography variant="h6" component="div">
                   Female <br/><span style={{marginLeft:"25px"}}  >{filteredData.totalFemale}</span> 
                </Typography>
              </CardContent>
              <CardContent className="card-back">
                <Typography variant="h6" component="div">
                   Female<br/><span style={{marginLeft:"25px"}}>{filteredData.totalFemale}</span>  
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
        {/* <Grid item xs={12} sm={6} md={3}>
          <Card className="dashboard-card mt-4">
            <div className="card-inner">
              <CardContent className="card-front">
                <Typography variant="h6" component="div">
                   General<br/><span style={{marginLeft:"14px"}}>{filteredData.totalGeneral}</span>  
                </Typography>
              </CardContent>
              <CardContent className="card-back">
                <Typography variant="h6" component="div">
                   General<br/> <span style={{marginLeft:"14px"}}>{filteredData.totalGeneral}</span> 
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="dashboard-card mt-4">
            <div className="card-inner">
              <CardContent className="card-front">
                <Typography variant="h6" component="div">
                   OBC<br/><span style={{marginLeft:"14px"}}>{filteredData.totalOBC}</span>  
                </Typography>
              </CardContent>
              <CardContent className="card-back">
                <Typography variant="h6" component="div">
                OBC<br/> <span style={{marginLeft:"14px"}}>{filteredData.totalOBC}</span> 
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="dashboard-card mt-4">
            <div className="card-inner">
              <CardContent className="card-front">
                <Typography variant="h6" component="div">
                   Other Category<br/><span style={{marginLeft:"50px"}}>{filteredData.totalOther}</span>  
                </Typography>
              </CardContent>
              <CardContent className="card-back">
                <Typography variant="h6" component="div">
                Other Category<br/> <span style={{marginLeft:"50px"}}>{filteredData.totalOther}</span> 
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid> */}
        <Grid item xs={12} sm={6} md={3}>
          <Card className="dashboard-card mt-4">
            <div className="card-inner">
              <CardContent className="card-front">
                <Typography variant="h6" component="div">
                   Govt.Employee<br/><span style={{marginLeft:"50px"}}>{filteredData.totalGovtEmployee}</span>  
                </Typography>
              </CardContent>
              <CardContent className="card-back">
                <Typography variant="h6" component="div">
                Govt.Employee<br/> <span style={{marginLeft:"50px"}}>{filteredData.totalGovtEmployee}</span> 
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="dashboard-card mt-4">
            <div className="card-inner">
              <CardContent className="card-front">
                <Typography variant="h6" component="div">
                Businessmen<br/><span style={{marginLeft:"44px"}}>{filteredData.totalBusinessmen}</span>  
                </Typography>
              </CardContent>
              <CardContent className="card-back">
                <Typography variant="h6" component="div">
                Businessmen<br/> <span style={{marginLeft:"44px"}}>{filteredData.totalBusinessmen}</span> 
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="dashboard-card mt-4">
            <div className="card-inner">
              <CardContent className="card-front">
                <Typography variant="h6" component="div">
                Pvt.Employee<br/><span style={{marginLeft:"54px"}}>{filteredData.totalPrivateEmployee}</span>  
                </Typography>
              </CardContent>
              <CardContent className="card-back">
                <Typography variant="h6" component="div">
                Pvt.Employee<br/> <span style={{marginLeft:"54px"}}>{filteredData.totalPrivateEmployee}</span> 
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="dashboard-card mt-4">
            <div className="card-inner">
              <CardContent className="card-front">
                <Typography variant="h6" component="div">
                   Booth<br/><span style={{marginLeft:"14px"}}>{filteredData.totalBoth}</span>  
                </Typography>
              </CardContent>
              <CardContent className="card-back">
                <Typography variant="h6" component="div">
                   Booth<br/> <span style={{marginLeft:"14px"}}>{filteredData.totalBoth}</span> 
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
    </>
  );
}
