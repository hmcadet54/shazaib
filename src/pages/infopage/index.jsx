import React, { useState } from 'react';
// import { Alert, AlertDescription } from '@/components/ui/alert';
import './style.css';

export const CrimeReportForm = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [crimeType, setCrimeType] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log({ name, location, crimeType, description, file });
    // Reset form after submission
    setName('');
    setLocation('');
    setCrimeType('');
    setDescription('');
    setFile(null);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'].includes(selectedFile.type)) {
        setFile(selectedFile);
        setError('');
      } else {
        setError('Please upload a PDF, DOC, or image file.');
        setFile(null);
      }
    }
  };

  return (
    <div className="containerlogin">
      <div className="page2">
        <div className="loginform">
          <h2>Crime Report Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="inputfield">
              <p>Name</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="inputfield">
              <p>Location</p>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              >
                <option value="">Select a location</option>
                <option value="location1">Location 1</option>
                <option value="location2">Location 2</option>
                <option value="location3">Location 3</option>
              </select>
            </div>
            <div className="inputfield">
              <p>Crime Type</p>
              <select
                value={crimeType}
                onChange={(e) => setCrimeType(e.target.value)}
                required
              >
                <option value="">Select crime type</option>
                <option value="theft">Theft</option>
                <option value="assault">Assault</option>
                <option value="vandalism">Vandalism</option>
                <option value="fraud">Fraud</option>
              </select>
            </div>
            <div className="inputfield">
              <p>Brief Information</p>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="inputfield">
              <p>Upload File (PDF, DOC, or Image)</p>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
            </div>
            {/* {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )} */}
            <div className="submitbtn">
              <button type="submit">Submit Report</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

