import React, { Component } from "react";
import Table from "./common/table";
import auth from "../services/authService";
import { Link } from "react-router-dom";

class CustomersTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: (customer) => (
        <Link to={`/customers/${customer._id}`}>{customer.name}</Link>
      ),
    },
    { path: "phone", label: "Phone Number" },
  ];

  deleteColumn = {
    key: "delete",
    content: (customer) => (
      <button
        onClick={() => this.props.onDelete(customer)}
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
    const { customers, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={customers}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default CustomersTable;
