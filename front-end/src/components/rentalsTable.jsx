import React, { Component } from "react";
import Table from "./common/table";
import auth from "../services/authService";
import { Link } from "react-router-dom";

class RentalsTable extends Component {
  columns = [
    {
      path: "_id",
      label: "RentalID",
      content: (rental) => (
        <Link to={`/rentals/${rental._id}`}>{rental._id}</Link>
      ),
    },
    { path: "customer.name", label: "Customer Number" },
    { path: "customer.phone", label: "Phone Number" },
    { path: "movie.title", label: "Movie Name" },
    { path: "movie.dailyRentalRate", label: "Rate" },
  ];

  deleteColumn = {
    key: "delete",
    content: (rental) => (
      <button
        onClick={() => this.props.onDelete(rental)}
        className="btn btn-danger btn-sm"
      >
        DELETE
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { rentals, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={rentals}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default RentalsTable;
