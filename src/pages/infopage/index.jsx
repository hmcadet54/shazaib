import React, { useState, useEffect, useCallback } from 'react';
import Loader from "../../components/Loader/Loader";
import './style.css';

export const CrimeReportForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    crimeType: '',
    description: '',
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileURL, setFileURL] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const getdata = async () => {
    try {
      const id = localStorage.getItem("id");
      const response = await fetch(`https://shazaib-back-production.up.railway.app/getuser/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setFormData(prevData => ({ ...prevData, email: data.email }));
      console.log('User data fetched:', data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
      if (validTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setError('');
        await uploadFile(selectedFile);
      } else {
        setError('Please upload a PDF, DOC, or image file.');
        setFile(null);
      }
    }
  };

  const uploadFile = async (file) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://shazaib-back-production.up.railway.app/fileupload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      const data = await response.json();
      setFileURL(data.data.url);
    } catch (error) {
      console.error('File upload error:', error);
      setError('File upload failed. Please try again.');
      setFile(null);
    } finally {
      setIsUploading(false);
    }
  };

  const submitForm = useCallback(async () => {
    try {
      const response = await fetch('https://shazaib-back-production.up.railway.app/submitcrime', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email, // Explicitly include the email
          location: formData.location,
          crimeType: formData.crimeType,
          description: formData.description,
          fileURL
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit crime report');
      }

      const result = await response.json();
      console.log('Submission response:', result);

      setFormData({
        name: '',
        email: formData.email, // Preserve the email
        location: '',
        crimeType: '',
        description: '',
      });
      setFile(null);
      setFileURL('');
      setError('');
      setSuccessMessage('Crime report submitted successfully!');
    } catch (error) {
      console.error('Submission error:', error);
      setError('Failed to submit crime report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, fileURL]);

  useEffect(() => {
    getdata();
  }, []);

  useEffect(() => {
    if (fileURL && isSubmitting) {
      submitForm();
    }
  }, [fileURL, isSubmitting, submitForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!formData.name || !formData.email || !formData.location || !formData.crimeType || !formData.description) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    if (!file) {
      submitForm();
    }
  };

  return (
    <div className="containerlogin">
      <div className="page2">
        <div className="loginform">
          <h2>Crime Report Form</h2>
          {successMessage && <div className="success-message" role="alert">{successMessage}</div>}
          {error && <div className="error-message" role="alert">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="inputfield">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                aria-required="true"
              />
            </div>
            <div className="inputfield">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                aria-required="true"
                readOnly
              />
            </div>
            <div className="inputfield">
              <label htmlFor="location">Location</label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                aria-required="true"
              >
                <option value="">Select a location</option>
                <option value="location1">Location 1</option>
                <option value="location2">Location 2</option>
                <option value="location3">Location 3</option>
              </select>
            </div>
            <div className="inputfield">
              <label htmlFor="crimeType">Crime Type</label>
              <select
                id="crimeType"
                name="crimeType"
                value={formData.crimeType}
                onChange={handleInputChange}
                required
                aria-required="true"
              >
                <option value="">Select crime type</option>
                <option value="theft">Theft</option>
                <option value="assault">Assault</option>
                <option value="vandalism">Vandalism</option>
                <option value="fraud">Fraud</option>
              </select>
            </div>
            <div className="inputfield">
              <label htmlFor="description">Brief Information</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                aria-required="true"
              />
            </div>
            <div className="inputfield">
              <label htmlFor="file-upload">Upload File (PDF, DOC, or Image)</label>
              {isUploading ? (
                <Loader />
              ) : (
                <>
                  <input
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    disabled={isUploading || isSubmitting}
                  />
                  {file && <p>Selected file: {file.name}</p>}
                </>
              )}
            </div>
            {file && file.type.startsWith('image/') && (
              <div className="image-preview">
                <img src={URL.createObjectURL(file)} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
              </div>
            )}
            <div className="submitbtn">
              <button type="submit" disabled={isUploading || isSubmitting}>
                {isSubmitting ? <Loader /> : 'Submit Report'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};