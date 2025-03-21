import React from 'react';
import ResumeForm from './components/ResumeForm';
import './App.css'; 

const App = () => {
  const initialValues = {
    name: "",
    role: "",
    address: "",
    linkedin: "",
    email: "",
    phone: "",
    about: "",
    workExperience: [
      {
        jobTitle: "",
        jobCompany: "",
        jobDuration: "",
        responsibilities: [""],
      },
    ],
    education: [
      {
        study: "",
        school: "",
        duration: "",
      },
    ],
    skills: [""],
    tools: [""],
  };

  const handleSubmit = (values) => {
    console.log("Form submitted with values:", values);
  };

  return (
    <div>
      <ResumeForm onSubmit={handleSubmit} initialValues={initialValues} />
    </div>
  );
};

export default App;