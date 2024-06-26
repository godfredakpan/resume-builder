import React, { useState } from 'react';
import ResumeForm from './components/ResumeForm';
import './App.css'; 

const App = () => {
  const [formData, setFormData] = useState(null);

  const handleSubmit = (values) => {
    setFormData(values);
  };

  return (
    <div className="App">
      <ResumeForm onSubmit={handleSubmit} values={formData} />
    </div>
  );
};

export default App;
