import React from "react";
import { Formik, Form, Field } from "formik";

const SearchBar = () => {
  return (
    <Formik
      initialValues={{
        searchQuery: ""
      }}
      onSubmit={(values, actions) => {
        console.log("Submitting form with values:", values);
        // You can perform the search functionality here
        actions.setSubmitting(false);
      }}
    >
      {(formikProps) => (
        <Form className="form-inline justify-content-center mt-4">
          <div className="input-group">
            <Field
              type="text"
              name="searchQuery"
              className="form-control"
              placeholder="Search for a team, player, or event"
            />
            <button type="submit" className="btn btn-primary ml-2">
              Search
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SearchBar;
