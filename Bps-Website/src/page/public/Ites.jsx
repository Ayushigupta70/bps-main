import { Box, Typography, Card, CardContent, Grid, List, ListItem, Stack, Container } from "@mui/material";
import React from "react";
import backimg from "../../assets/images/rpo.jpg"
import Rpo1 from "../../assets/images/rpo11.png"; 
import sh from "../../assets/images/resume.jpg"
import hh from "../../assets/images/shot.jpg"
const Ites = () => {
  return (
    <>
    <Box mt={15} sx={{  px: { xs: 2, sm: 4, md: 10, lg: 15 } }}>
      
    <Box mt={20} >
    <Typography variant="h4" fontWeight="bold">requirements Process</Typography>
   </Box>
    <Box
      sx={{
        position: "relative",
        backgroundImage: `url(${backimg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: 350,
        display: "flex",
        alignItems: "center",
        
      }}
    >
      
      <Container maxWidth="lg">
        <Box
          sx={{
            backgroundColor: "rgba(0, 41, 79, 0.8)",
            color: "white",
            padding: 3,
            maxWidth: 400,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            "We have the capabilities and experience to deliver the answers you need to move forward."
          </Typography>
          <Typography variant="body2" mt={2}>
            - Deepak Kumar
          </Typography>
        </Box>
      </Container>
    </Box>
      {/* Section Title */}
      <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ mt: 6 }}>
        Recruitment Process Outsourcing
      </Typography>

     
      <Grid container spacing={2} sx={{ mt: 6 }} alignItems="center">
        {/* Left Side - Image */}
        <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
          <img
            src={Rpo1}
            alt="RPO Process"
            style={{
              width: "280px",
              maxWidth: "300px",
              height: "auto",
            }}
          />
        </Grid>

        {/* Right Side - Text Content */}
        <Grid item xs={12} md={8}>
          <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
          Recruitment Process Outsourcing (RPO) an IT Enables Service (ITES) is a form of business process outsourcing (BPO) where an employer transfers all or part of its recruitment processes to Spirale Hr Solutions Pvt.Ltd.(Formerly Spirale india solutions) . We extend RPO services for permanent as well as contractual staffing. We manage the entire recruiting/hiring process from job profiling through the on boarding of the new hire, including staff, technology, method and reporting. We may if need be adopt the client company's technology, methodologies and reporting Spirale Hr Solutions Pvt.Ltd.(Formerly Spirale india solutions) RPO solution differs greatly from all our other Recruitment services in that RPO assumes ownership of the design, management and control of the recruitment process and the responsibility of results. We offer a range of RPO services for permanent as well as contractual staffing. RPO makes the talent acquisition process simpler, more efficient and cost effective.For Our clients, which may be International placement agencies or direct employers, we are geared to provide 24x7 RPO services . We assume ownership for the entire design, execution and control of the recruitment process and the responsibility of results. We may if need be adopt the client company's process, technology, methodologies and reporting. Our recruiters are equipped with access to all major propriety and external resume databases, Job Portals, social media networks and powerful E recruitment methods and technology to identify both active and passive jobseekers. We can also use your subscriptions to Job Portals to source candidates for your requirements.
          </Typography>
        </Grid>
      </Grid>

      {/* SHSPL RPO Advantage */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center">
          SHSPL RPO Advantage
        </Typography>
        <List sx={{ mt: 2 }}>
          <ListItem>Saving costs, reducing cycle time, and providing verifiable metrics.</ListItem>
          <ListItem>Job Postings and management on the Company’s Career site.</ListItem>
          <ListItem>Job Postings and management on external Job Portals.</ListItem>
          <ListItem>Resume Search using the client’s or own subscription to a Job Portal.</ListItem>
          <ListItem>Response management from client’s own Print Media Advertising.</ListItem>
          <ListItem>Screening through Tele interviews and Personal Interviews.</ListItem>
          <ListItem>Head Hunting Research using advanced technology and skilled professionals.</ListItem>
          <ListItem>Maintaining & Reporting metrics.</ListItem>
        </List>
      </Box>

      {/* Recruitment Processes */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" fontWeight="bold">
          Recruitment Processes We Handle:
        </Typography>
        <List sx={{ mt: 2 }}>
          <ListItem>Writing Job Descriptions / Job Specifications.</ListItem>
          <ListItem>Managing Job Postings on the Company’s Career site and external job portals.</ListItem>
          <ListItem>Resume Database Search and Screening.</ListItem>
          <ListItem>Handling Employee Referral schemes and Walk-In Interviews.</ListItem>
          <ListItem>Head Hunting Research for qualified professionals.</ListItem>
          <ListItem>Response management from various media platforms.</ListItem>
          <ListItem>Providing detailed recruitment analytics and reports.</ListItem>
        </List>
      </Box>

      {/* Client Expectations */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" fontWeight="bold">
          What We Expect from Our Clients:
        </Typography>
        <List sx={{ mt: 2 }}>
          <ListItem>Providing job descriptions and specifications.</ListItem>
          <ListItem>Clarifying hiring requirements and expectations.</ListItem>
          <ListItem>Ensuring smooth communication during the hiring process.</ListItem>
          <ListItem>Active participation in final selection processes.</ListItem>
        </List>
      </Box>

      {/* Job Posting Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center">
          Job Postings
        </Typography>
        <ListItem>Outsourcing the job posting process alone to Spirale Hr Solutions Pvt.Ltd.(Formerly Spirale india solutions) , client’s can save a lot of precious and valuable time & resources and can focus on their core HR activities.</ListItem>
        <ListItem>Clients share with us all the basic information/job specifications including Job designations, locations, desired qualifications, age, experience, salary, KRAs job type and description.</ListItem>
        <ListItem>Our recruitment Processing Executives are experts at extracting the relevant content and creating candidate-targetrd recruitment advertisements from the job specifications shared by clients .</ListItem>
        <ListItem>We post /edit/renew client’s job requirements manually on job boards where client’s directly have subscriptions to Job Portals and also remotely on the client’s Corporate Career site.</ListItem>
        
      </Box>
      <Box sx={{mt:6}}>
         <Typography variant="h4" fontWeight="bold" textAlign="center">
          Resume Database Search
          </Typography>
          <ListItem >This is the most crucial functions within the Candidate Generation process that requires knowledge, experience, tact, time and people .By outsourcing this process you recruiting department grows without increasing head count .</ListItem>
          <ListItem>We optimise your resume Database search process through very effective utilisation of existing databases and database subscriptions for maximised return on expenditure.</ListItem>
          <ListItem>We undertake Resume Database search for our client’s manpower needs from internal and external resume databases, Job Portals, social media networks deploying powerful E recruitment methods and technology to identify both active and passive jobseekers.</ListItem>
      </Box>
       {/* Section Title */}
       <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ mt: 6 }}>
        Resume Screening & Shortlisting
      </Typography>

      {/* Image & Description Section */}
      <Grid container spacing={4} sx={{ mt: 6 }} alignItems="center">
        {/* Left Side - Image */}
        <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
          <img
            src={sh}
            alt="RPO Process"
            style={{
              width: "100%",
              maxWidth: "400px",
              height: "auto",
              borderRadius: "8px",
            }}
          />
        </Grid>

        {/* Right Side - Text Content */}
        <Grid item xs={12} md={6}>
          <ListItem variant="body1" sx={{ lineHeight: 1.8 }}>
          This is the next step after resumes have been sourced through various methodologies like Job Postings , Print Media, Referrals ,Placement agencies, Career site and Resume databases. Outsourcing this function increase sourcing productivity by focusing only on pre screened and evaluated candidates who have passed through the screening funnel by Spirale Hr Solutions Pvt.Ltd.(Formerly Spirale india solutions) .It also saves a lot of your core recruitment time .
          </ListItem>
          <ListItem>You just need to give us your job specifications, selection criteria, mandatory and desirable skills and other selection parameters. We will carefully sift through all the resumes and shortlist the right resumes as per your specifications and present you those who match very close to your requirements. Acting as another layer in the virtual funnel, our screening solution delivers the most qualified and interested candidates into the hands of your recruitment team.</ListItem>
           <ListItem>Your recruiters may be wasting valuable time contacting candidates who are no longer available? Not interested? Not suitable? Or simply not contactable? Or you are faced with the situation where you had advertised on the job boards or your corporate website and are now inundated with resumes? Also you are not sure about the screening criteria to follow in this case – having too stringent criteria can lead to elimination of good candidates from the potential pool whereas having too lenient criteria can result in an unnecessarily large pool with too many unqualified candidates.</ListItem>

        </Grid>
        </Grid>
         {/* How does it work */}
         <Stack>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center">
          How does it work
        </Typography>
        <List sx={{ mt: 2 }}>
          <ListItem>We contact potential candidates by email and/or telephone.</ListItem>
          <ListItem>We contact candidates from 9:00 am to 10:00pm 7 days a week</ListItem>
          <ListItem>Uses customised templates with specific screening questions</ListItem>
          <ListItem>Undertake detailed telephone assessments and skills validation</ListItem>
          <ListItem>Administer the selection tests and schedule interviews</ListItem>
          
        </List>
      </Box>
           {/* Your Benefits */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center">
          Your Benefits
        </Typography>
        <List sx={{ mt: 2 }}>
          <ListItem>Increase sourcing productivity by only focusing on available, interested and qualified candidates</ListItem>
          <ListItem>Increase TAT by speedily contacting a high number of pre screened candidates in a shorter time</ListItem>
          
          
        </List>
      </Box>
      </Stack>
        
      <Box sx={{mt:6}}>
         <Typography variant="h4" fontWeight="bold" textAlign="center">
          Resume Management
          </Typography>
          <ListItem >Posting jobs on career sites and Job Portals is today an indispensible and therefore a widely used means of sourcing resumes. However posting these advertisements, managing responses, short listing resumes and integrating them with client’s proprietary resume Management systems requires colossal amount of time ,resources and energy. The Search House simplifies this process. Our dedicated team of Recruitment Process Executives work on your manpower requirements to ensure that all vacancies are timely advertised, responses monitored, all resumes received are dealt with as per your selection criteria and prompt communications are sent out. All you do is E mail and share your candidate requirements we take care of the rest. We can process and manage huge amount of resumes received by e-mail and post etc. and convert this data into the electronic format and transmit the data for uploading on to a searchable Recruitment management system.</ListItem>
         
      </Box>

              {/* Section Title */}
       <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ mt: 6 }}>
        Resume Screening & Shortlisting
      </Typography>

      {/* Image & Description Section */}
      <Grid container spacing={4} sx={{ mt: 6 }} alignItems="center">
        {/* Left Side - Image */}
        <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
          <img
            src={hh}
            alt="RPO Process"
            style={{
              width: "100%",
              maxWidth: "400px",
              height: "auto",
              borderRadius: "8px",
            }}
          />
        </Grid>

        {/* Right Side - Text Content */}
        <Grid item xs={12} md={6}>
          <ListItem variant="body1" sx={{ lineHeight: 1.8 }}>
          Our RPO Executives are experts ,highly focused, specialist internet researchers, who are adept at utilising the web and published materials to compile valuable head-hunting leads for global client’s Client’s just need to specify the position and we identify the right candidate names in the right organizations.. Our head hunters have lot of expertise and are experts in mapping companies and people in their constant endeavour to identify the Right and the Best candidates for specialized positions.
          </ListItem>
          <ListItem>By outsourcing this crucial phase of your talent search process to us you are at an advantage. Our extensive search and reach leads to an extremely cost effective solution for your hiring process while maximizing both quality and service excellence .</ListItem>
           
        </Grid>
            
      </Grid>
            
    </Box>
          
    </>
  );
};

export default Ites;

