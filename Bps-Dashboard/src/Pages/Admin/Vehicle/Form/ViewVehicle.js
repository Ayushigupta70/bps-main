import React,{useEffect} from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
} from "@mui/material";
import { LocalShipping as LocalShippingIcon } from "@mui/icons-material";

import { useNavigate,useParams } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {clearViewedVehicle, getVehicleById} from '../../../../features/vehicle/vehicleSlice';

const ViewVehicle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {vehicleId} = useParams();
 const vehicle = useSelector((state) => state.vehicles.viewedVehicle);



  useEffect(()=>{
    if(vehicleId)
    {
      dispatch(getVehicleById(vehicleId));
    }
    return ()=>{
                dispatch(clearViewedVehicle());
            }
  },[vehicleId,dispatch])
if (!vehicle) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6">Loading vehicle details...</Typography>
            </Box>
        );
    }
  
console.log("Vehicle",vehicle);
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Box p={3} bgcolor="#f5f7f6">
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Vehicle Details
        </Typography>
        <Box display="flex" alignItems="center" mb={2}>
          <LocalShippingIcon fontSize="large" color="primary" sx={{ mr: 2 }} />
          <Typography variant="h5">
            {vehicle.vehicleModel} ({vehicle.manufactureYear})
          </Typography>
        </Box>
        <Typography variant="subtitle1" color="text.secondary">
          Registration: {vehicle.registrationNumber}
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          Basic Information
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Registration Number
            </Typography>
            <Typography variant="body1">{vehicle.registrationNumber}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Registration Date
            </Typography>
            <Typography variant="body1">{formatDate(vehicle.registrationDate)}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Registration Expiry
            </Typography>
            <Typography variant="body1">{formatDate(vehicle.regExpiryDate)}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Make/Model
            </Typography>
            <Typography variant="body1">{vehicle.vehicleModel}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Year of Manufacture
            </Typography>
            <Typography variant="body1">{vehicle.manufactureYear}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Owned By
            </Typography>
            <Typography variant="body1">{vehicle.ownedBy}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Current Location
            </Typography>
            <Typography variant="body1">{vehicle.currentLocation}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          Purchase Information
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Date of Purchase
            </Typography>
            <Typography variant="body1">{formatDate(vehicle.dateofPurchase)}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Purchased From
            </Typography>
            <Typography variant="body1">{vehicle.purchasedFrom}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Purchased Under
            </Typography>
            <Typography variant="body1">{vehicle.PurchasedUnder}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Purchase Price
            </Typography>
            <Typography variant="body1">{vehicle.purchasePrice}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Depreciation (%)
            </Typography>
            <Typography variant="body1">{vehicle.depreciation}%</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Current Value
            </Typography>
            <Typography variant="body1">{vehicle.currentValue}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          Insurance Details
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Insurance Provider
            </Typography>
            <Typography variant="body1">{vehicle.currentInsuranceProvider}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Policy Number
            </Typography>
            <Typography variant="body1">{vehicle.policyNumber}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Policy Type
            </Typography>
            <Typography variant="body1">{vehicle.policyType}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Policy Start Date
            </Typography>
            <Typography variant="body1">{formatDate(vehicle.policyStartDate)}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Policy End Date
            </Typography>
            <Typography variant="body1">{formatDate(vehicle.policyEndDate)}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Policy Premium
            </Typography>
            <Typography variant="body1">{vehicle.policyPremium}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          Fitness & Registration Details
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Last Fitness Renewal
            </Typography>
            <Typography variant="body1">{formatDate(vehicle.lastFitnessRenewalDate)}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Fitness Valid Until
            </Typography>
            <Typography variant="body1">{formatDate(vehicle.currentFitnessValidUpto)}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              First Registration Valid Until
            </Typography>
            <Typography variant="body1">{formatDate(vehicle.firstRegValidUpto)}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Last Renewal Date
            </Typography>
            <Typography variant="body1">{formatDate(vehicle.renewalDate)}</Typography>
          </Grid>
          <Grid size={{xs:12, sm:6, md:4}}>
            <Typography variant="subtitle2" color="text.secondary">
              Renewal Valid Until
            </Typography>
            <Typography variant="body1">{formatDate(vehicle.renewalValidUpto)}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          Additional Comments
        </Typography>
        <Typography variant="body1" paragraph>
          {vehicle.addcomment}
        </Typography>
      </Paper>

    
    </Box>
  );
};

export default ViewVehicle;