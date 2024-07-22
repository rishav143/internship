import React, { useEffect, useState } from 'react';
import opportunitiesData from "../opportunities.json";
import Grid from '@mui/material/Unstable_Grid2';
import styled from '@mui/system/styled';
import Box from '@mui/system/Box';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function OpportunitiesComponent() {
  const [appliedOpportunities, setAppliedOpportunities] = useState([]);

  useEffect(() => {
    fetchAppliedOpportunities();
  }, []);

  const fetchAppliedOpportunities = async () => {
    try {
      const response = await axios.get("http://localhost:3000/auth/applied-opportunities");
      setAppliedOpportunities(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Internship Opportunities</h1>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={4}>
          {Object.values(opportunitiesData.internships_meta).map((opportunity, index) => (
            <Grid item xs={12} md={6} key={index}>
              <OpportunityCard
                opportunity={opportunity}
                appliedOpportunities={appliedOpportunities}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

const Item = styled('div')(({ theme }) => ({
  backgroundColor: "#F7F9F2",
  border: '1px solid',
  borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
  padding: theme.spacing(2),
  borderRadius: '4px',
  textAlign: 'center',
  boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
}));

const OpportunityCard = ({ opportunity, appliedOpportunities }) => {
  const navigate = useNavigate();
  const {
    id,
    profile_name,
    company_name,
    stipend,
    start_date,
    locations,
    duration,
  } = opportunity;

  const isApplied = Array.isArray(appliedOpportunities) && appliedOpportunities.some(item => item.id === id);

  const applyForOpportunity = async (opportunity) => {
    try {
      await axios.post("http://localhost:3000/auth/apply", { opportunity });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Item>
      <h1>{profile_name}</h1>
      <p><strong>Company:</strong> {company_name}</p>
      <p><strong>Stipend:</strong> {stipend.salary}</p>
      <p><strong>Location:</strong> {locations.map(location => location.string).join(', ')}</p>
      <p><strong>Duration:</strong> {duration}</p>
      <p><strong>Start Date:</strong> {start_date}</p>
      {isApplied ? (
        <button disabled>Applied</button>
      ) : (
        <button onClick={() => applyForOpportunity(opportunity)}>Apply Now</button>
      )}
    </Item>
  );
};