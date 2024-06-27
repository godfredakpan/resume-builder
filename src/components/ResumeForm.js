import React from "react";
import { Formik, Field, Form, FieldArray } from "formik";
import * as Yup from "yup";
import ResumePDF from "./ResumePDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DeleteBtn from "./DeleteBtn";
// import { ToastContainer, toast } from "react-toastify"; // TODO : Adding toasts when there is an error
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  role: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  linkedin: Yup.string().url("Invalid URL").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string().required("Required"),
  about: Yup.string().required("Required"),
  workExperience: Yup.array().of(
    Yup.object().shape({
      jobTitle: Yup.string().required("Required"),
      jobCompany: Yup.string().required("Required"),
      jobDuration: Yup.string().required("Required"),
      responsibilities: Yup.array().of(Yup.string().required("Required")),
    })
  ),
  education: Yup.array().of(
    Yup.object().shape({
      study: Yup.string().required("Required"),
      school: Yup.string().required("Required"),
      duration: Yup.string().required("Required"),
    })
  ),
  skills: Yup.array().of(Yup.string().required("Required")),
  tools: Yup.array().of(Yup.string().required("Required")),
});

const ResumeForm = ({ onSubmit, values }) => {

  const fileName = `${values?.name}-${values?.role}-Resume`;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <div className="flex justify-end items-center mb-6">
        <span className="text-gray-500">Resume builder powered by</span>
        <img
          src={"https://www.werunhq.com/images/logo.png"}
          width={70}
          alt="Logo"
          className="ml-2"
        />
      </div>

      <Formik
        initialValues={{
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
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values }) => (
          <Form className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field
                  name="name"
                  placeholder="Name"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <Field
                  name="role"
                  placeholder="Role"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <Field
                  name="address"
                  placeholder="Address"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <Field
                  name="linkedin"
                  placeholder="LinkedIn URL"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <Field
                  name="email"
                  placeholder="Email"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <Field
                  name="phone"
                  placeholder="Phone"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <Field
                  name="about"
                  as="textarea"
                  placeholder="About"
                  className="w-full p-3 border border-gray-300 rounded-lg h-24 md:col-span-3"
                />
              </div>
            </div>

            <FieldArray name="workExperience">
              {({ push, remove }) => (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Work Experience:</h3>
                  {values.workExperience.map((_, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-300 rounded-lg space-y-3"
                    >
                      <Field
                        name={`workExperience[${index}].jobTitle`}
                        placeholder="Job Title"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      />
                      <Field
                        name={`workExperience[${index}].jobCompany`}
                        placeholder="Job Company"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      />
                      <Field
                        name={`workExperience[${index}].jobDuration`}
                        placeholder="Job Duration"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      />

                      <FieldArray
                        name={`workExperience[${index}].responsibilities`}
                      >
                        {({ push: pushResp, remove: removeResp }) => (
                          <div className="space-y-3">
                            {values.workExperience[index].responsibilities.map(
                              (_, rIndex) => (
                                <div
                                  key={rIndex}
                                  className="flex items-center space-x-3"
                                >
                                  <Field
                                    name={`workExperience[${index}].responsibilities[${rIndex}]`}
                                    placeholder="Responsibility"
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeResp(rIndex)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <DeleteBtn />
                                  </button>
                                </div>
                              )
                            )}
                            <button
                              type="button"
                              onClick={() => pushResp("")}
                              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            >
                              Add Responsibility +
                            </button>
                          </div>
                        )}
                      </FieldArray>
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <DeleteBtn />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      push({
                        jobTitle: "",
                        jobRole: "",
                        jobDuration: "",
                        responsibilities: [""],
                      })
                    }
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    Add Job +
                  </button>
                </div>
              )}
            </FieldArray>

            <FieldArray name="education">
              {({ push, remove }) => (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Education</h3>
                  {values.education.map((_, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-300 rounded-lg space-y-3"
                    >
                      <Field
                        name={`education[${index}].study`}
                        placeholder="Study"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      />
                      <Field
                        name={`education[${index}].school`}
                        placeholder="School"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      />
                      <Field
                        name={`education[${index}].duration`}
                        placeholder="Duration"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <DeleteBtn />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      push({ study: "", school: "", duration: "" })
                    }
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    Add Education +
                  </button>
                </div>
              )}
            </FieldArray>

            <FieldArray name="skills">
              {({ push, remove }) => (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Skills</h3>
                  {values.skills.map((_, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Field
                        name={`skills[${index}]`}
                        placeholder="Skill"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <DeleteBtn />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push("")}
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    Add Skill +
                  </button>
                </div>
              )}
            </FieldArray>

            <FieldArray name="tools">
              {({ push, remove }) => (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Tools & Technologies</h3>
                  {values.tools.map((_, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Field
                        name={`tools[${index}]`}
                        placeholder="Tool"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <DeleteBtn />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push("")}
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    Add Tool +
                  </button>
                </div>
              )}
            </FieldArray>

            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center"
              >
                Generate Resume
                <svg
                  className="w-4 h-4 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {values && (
        <PDFDownloadLink
          document={<ResumePDF formData={values} />}
          fileName={fileName}
        >
          {({ blob, url, loading, error }) => (
            <div className="mt-8 flex justify-center">
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center"
              >
                {loading ? "Generating document..." : "Download PDF"}
                <svg
                  className="w-4 h-4 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          )}
        </PDFDownloadLink>
      )}
    </div>
  );
};

export default ResumeForm;
