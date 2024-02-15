
import React from "react";
import { useFormik } from "formik";

const validate = (values) => {
  const errors = {};

  if (!values.searchQuery) {
    errors.searchQuery = "Search query is required";
  }

  return errors;
};

const SearchBar = () => {
  const formik = useFormik({
    initialValues: {
      searchQuery: "",
      searchType: "players",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="container mt-4">
      <div className="row">
        <div className="col">
          <input
            id="searchQuery"
            name="searchQuery"
            type="text"
            className="form-control"
            placeholder="Search Query"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.searchQuery}
          />
          {formik.touched.searchQuery && formik.errors.searchQuery ? (
            <div className="text-danger">{formik.errors.searchQuery}</div>
          ) : null}
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col">
          <label className="mr-2">
            <input
              type="radio"
              name="searchType"
              value="players"
              checked={formik.values.searchType === "players"}
              onChange={formik.handleChange}
              className="mr-1"
            />
            Players
          </label>
          <label className="mr-2">
            <input
              type="radio"
              name="searchType"
              value="events"
              checked={formik.values.searchType === "events"}
              onChange={formik.handleChange}
              className="mr-1"
            />
            Events
          </label>
          <label>
            <input
              type="radio"
              name="searchType"
              value="teams"
              checked={formik.values.searchType === "teams"}
              onChange={formik.handleChange}
              className="mr-1"
            />
            Teams
          </label>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
