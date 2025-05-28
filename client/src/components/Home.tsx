import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import toast from "react-hot-toast";
import photo from "../images/photo.JPG";

interface SignupFormData {
  FirstName: string;
  LastName: string;
  email: string;
  ConfirmEmail: string;
  RegNum: string;
}

export default function Home() {
  const [formData, setFormData] = useState<SignupFormData>({
    FirstName: "",
    LastName: "",
    email: "",
    ConfirmEmail: "",
    RegNum: "",
  });

  const EmailsMatch =
    formData.email === formData.ConfirmEmail || formData.ConfirmEmail === "";
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (formData.email === formData.ConfirmEmail) {
        await axios.post(
          // "http://localhost:3001/user/register", 
          "https://server-nine-beryl-27.vercel.app/user/register",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // Only if using cookies/sessions
          }
        );
        toast.success("Registration Completed!");
      } else {
        console.log("Email does not match");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Registration failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center sm:h-[595px]">
      <section className="bg-gray-100 w-[1200px] p-8 rounded shadow-md justify-center items-center sm:h-screen">
        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:h-[400px] sm:w-[900px] sm:mx-28 sm:mt-10">
          <div className=" md:flex-2">
            <h1 className="text-2xl font-bold mb-3 text-center">
              Contact Information
            </h1>
            <hr className="mb-4 sm:m-1" />
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="FirstName"
                value={formData.FirstName}
                onChange={handleChange}
                placeholder="FIRST NAME"
                className="border-2 border-gray-400 h-12 sm:h-12 w-[100%] sm:w-[48%] sm:m-1 rounded p-4 mb-3"
                required
              />
              <input
                type="text"
                name="LastName"
                value={formData.LastName}
                onChange={handleChange}
                placeholder="LAST NAME"
                className="border-2 border-gray-400 h-12 sm:h-12 w-[100%] sm:w-[48%] sm:m-1 rounded p-4 mb-3"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="EMAIL ADDRESS"
                className="border-2 border-gray-400 h-12 sm:h-12 w-[100%] sm:w-[48%] sm:m-1 rounded p-4 mb-3"
                required
              />
              <input
                type="email"
                name="ConfirmEmail"
                value={formData.ConfirmEmail}
                onChange={handleChange}
                placeholder="CONFIRM EMAIL ADDRESS"
                className="border-2 border-gray-400 h-12 sm:h-12 w-[100%] sm:w-[48%] sm:m-1 rounded p-4 sm:mb-6"
                required
              />
              {!EmailsMatch && (
                <p className="text-red-500 text-sm sm:-mt-1">
                  Emails do not match
                </p>
              )}
              <div className="grid grid-cols-1 sm:m-1">
                <div className="flex items-center space-x-2 sm:mb-6">
                  <input
                    type="checkbox"
                    name="subscribe"
                    className="h-6 w-6 "
                  />
                  <p className="text-sm">
                    Keep me updated on more events and news from this event
                    organizer.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" name="subscribe" className="h-6 w-6" />
                  <p className="text-sm">
                    Send me emails about the best events happening nearby or
                    online.
                  </p>
                </div>
                <div className="flex flex-row">
                  <p className="flex items-center mt-3 sm:mb-2 mb-3 text-sm ">
                    By selecting Register, I agree to the Tech O'Clock Terms of
                    Service
                  </p>
                </div>
              </div>
              <div className="flex flex-start">
                <button
                  type="submit"
                  className="text-white text-2xl cursor-pointer rounded w-[100%] sm:w-[35%] h-12 sm:m-1"
                >
                  Register
                </button>
              </div>
            </form>
            <hr className="mt-6 sm:mt-4 sm:m-1" />
            <p className="text-center">
              Powered by <span className="italic">Tech O'Clock</span>
            </p>
          </div>
          <div className="md:flex-1">
            <img
              src={photo}
              alt="flier"
              className="h-[30%] w-[100%] sm:h-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
