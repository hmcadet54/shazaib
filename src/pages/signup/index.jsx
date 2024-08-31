import React, { useEffect, useState } from "react";
import styles from "./style.module.css";

import { Form, Link as RouterLink } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { FiUpload } from "react-icons/fi";

export const Signup = () => {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [Authenticated, setAuthenticated] = useState(false);
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No file selected");
  const [previewImage, setPreviewImage] = useState(null);

  const navigate = useNavigate();

  const loginHandler = async (event) => {
    event.preventDefault();

    if (!username || !email || !password) {
      console.log("Please fill all the fields");
      // navigate("/otpverification');
      return;
    }

    setLoading(true);
    let imageUrl = null;

    try {
      if (image) {
        console.log("Uploading Image");
        imageUrl = await uploadImage(image);
        console.log("Image uploaded successfully:", imageUrl);
      } else {
        imageUrl =
          "https://firebasestorage.googleapis.com/v0/b/blog-react-74910.appspot.com/o/images%2Fgrad.png?alt=media&token=25b546a0-c171-4f9e-bbf6-4cc2f18b956c";
      }

      const formresponse = {
        user_name: username,
        email: email,
        password: password,
        imageURL: imageUrl, // Add the image URL to the form data
      };

      await sendSignupReq(formresponse);
      console.log("Form Submitted", formresponse);
    } catch (error) {
      console.error("Error during form submission:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    setFileName(
      selectedFile ? `Selected File: ${selectedFile.name}` : "No file selected"
    );
    setPreviewImage(selectedFile ? URL.createObjectURL(selectedFile) : null);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setFileName("No file selected");
    setPreviewImage(null);
  };

  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch(
        "https://authapi-production-4e0d.up.railway.app/imageupload",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok) {
        return result.data.url; // return the image URL
      } else {
        console.error("Image upload error:", result.message);
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    }
  };
  const sendSignupReq = async (formresponse) => {
    const apiurl = "https://authapi-production-4e0d.up.railway.app/signup";
    try {
      setLoading(true);
      const response = await fetch(apiurl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formresponse),
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setLoading(false);
        setAuthenticated(true);
        console.log("Signup Successfull");
        localStorage.setItem("id", data.user_info._id);
        navigate("/otpverification", { state: { email, Authenticated: true } });
      } else {
        setLoading(false);
        console.log("Signup Failed");
      }
    } catch (error) {
      setLoading(false);
      console.log("Signup Failed");
    }
  };

  return (
    <>
      <div className={styles.containerlogin}>
        <div className={styles.page2}>
          <div className={styles.loginform}>
            <h2>Welcome! test auth API</h2>
            <p>Sign up to test auth api.</p>
            <div className={styles.difauth}>
              <button>Continue with Google</button>
            </div>
            <form onSubmit={loginHandler}>
              <div className={styles.inputfield}>
                <p>Username</p>
                <input
                  type="text"
                  placeholder="abdullahshafiq"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                />
                {/* <p className={styles.ErrorMessage}>{FormError.email}</p> */}
              </div>
              <div className={styles.inputfield}>
                <p>Email</p>
                <input
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* <p className={styles.ErrorMessage}>{FormError.email}</p> */}
              </div>
              <div className={styles.inputfield}>
                <p>Password</p>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* <p className={styles.ErrorMessage}>{FormError.password}</p> */}
              </div>
              <div className={styles.uploadbtn}>
                <label htmlFor="file-input">
                  <FiUpload color="white" size={25} />
                  Upload Image
                </label>
                <input
                  id="file-input"
                  type="file"
                  onChange={handleFileInputChange}
                  style={{ display: "none" }}
                />
              </div>
              <div className={styles.imagecontainer}>
                {/* <div className={styles.fileDisplay}>{fileName}</div> */}
                {previewImage && (
                  <div className={styles.imagePreview}>
                    {/* <img src={previewImage} alt="Preview" /> */}
                    <p>{fileName}</p>
                    <button
                      onClick={handleRemoveImage}
                      className={styles.removeButton}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              <div
                className={loading ? styles.LoadingButton : styles.submitbtn}
              >
                <button>Signup{loading ? <Loader /> : ""}</button>
              </div>
            </form>

            <div className={styles.haveanAcount}>
              <p>
                Already have an account? <RouterLink to="/">Login</RouterLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
