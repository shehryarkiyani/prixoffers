import React, { useState } from "react";
import { getCookie } from "cookies-next";
import { FormattedMessage } from "react-intl";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
const Contact = () => {
  const [formData, setformData] = useState({
    name: "",
    email: "",

    message: "",
    code: 0,
  });
  const [erros, setErrors] = useState({
    name: "",
    email: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getCookie("token");
    var data = JSON.stringify(formData);
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    if (formData.name == "" || formData.email == "") {
      let error = {
        name: "",
        email: "",
      };
      if (formData.name == "") {
        error.name = "Name required";
      }
      if (formData.email == "") {
        error.email = "Email Required";
      }
      setErrors(error);
    } else {
      setErrors({
        name: "",
        email: "",
      });
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contactus/`, {
        method: "POST",
        headers: headers,
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          toast("Contact submit successfully");
          setformData({
            name: "",
            email: "",
            message: "",
            code: 0,
          });
        });
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="flex flex-col items-center py-28 bg-secondary justify-center ">
        <div className=" text-center w-96 md:w-[500px] shadow-lg bg-white p-10 rounded-lg">
          <div className="font-bold text-4xl mb-10">
            <FormattedMessage id="ContactUs" />
          </div>
          <div className="flex flex-col w-full  px-2 gap-3">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setformData({ ...formData, name: e.target.value });
                if (e.target.value !== "") {
                  setErrors({ ...erros, name: "" });
                }
              }}
              className=" focus:outline-none p-4 bg-gray-200"
              placeholder="Name"
              name="name"
            />
            <p className="text-left text-[red]">{erros.name}</p>
            <input
              type="text"
              value={formData.email}
              onChange={(e) => {
                setformData({ ...formData, email: e.target.value });
                if (e.target.value !== "") {
                  setErrors({ ...erros, email: "" });
                }
              }}
              className=" focus:outline-none p-4 bg-gray-200"
              placeholder="Email"
              name="email"
            />
            <p className="text-left text-[red]">{erros.email}</p>
            <input
              type="textarea"
              height="200px"
              value={formData.message}
              onChange={(e) => {
                setformData({ ...formData, message: e.target.value });
              }}
              className=" focus:outline-none p-4 bg-gray-200"
              placeholder="Message"
              name="status"
            />
            <div>
              <select
                id="code"
                name="code"
                className="p-4 w-full bg-gray-200 "
                value={formData.code}
                onChange={(e) =>
                  setformData({ ...formData, code: Number(e.target.value) })
                }
              >
                <option value="0">
                  <FormattedMessage id="ModerationQuery" />
                </option>
                <option value="1">
                  {" "}
                  <FormattedMessage id="HaveQuestion" />
                </option>
                <option value="2">
                  <FormattedMessage id="Unsubscribe" />
                </option>
                <option value="3">
                  <FormattedMessage id="WorkWith" />
                </option>
                <option value="4">
                  <FormattedMessage id="ReportTech" />
                </option>
                <option value="5">
                  <FormattedMessage id="Shopping" />
                </option>
                <option value="6">
                  <FormattedMessage id="Other" />
                </option>
                <option value="7">
                  <FormattedMessage id="DeleteAccount" />
                </option>
              </select>
            </div>
            <button
              onClick={handleSubmit}
              className="bg-[#5A0064] mt-3 text-white p-2 pl-3 pr-3 flex justify-center align-middle items-center rounded-md h-[50px]"
            >
              <FormattedMessage id="Submit" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
