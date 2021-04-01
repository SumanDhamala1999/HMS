import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getCustomers } from "./../services/customerService";
import { getRental, saveRental } from "./../services/rentalService";
import { getMovies } from "./../services/movieService";

class RentalForm extends Form {
  state = {
    data: {
      customerId: "",
      movieId: "",
    },
    customers: [],
    movies: [],
    errors: {},
  };

  schema = {
    customerId: Joi.string().required().label("Customer"),
    movieId: Joi.string().required().label("Movie"),
  };

  async populateCustomers() {
    const { data: customers } = await getCustomers();
    this.setState({ customers });
  }

  async populateMovies() {
    const { data: movies } = await getMovies();
    this.setState({ movies });
  }

  async populateRental() {
    try {
      const rentalId = this.props.match.params.id;
      if (rentalId === "new") return;

      const { data: rental } = await getRental(rentalId);
      this.setState({ data: this.mapToViewModel(rental) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateCustomers();
    await this.populateMovies();
    await this.populateRental();
  }

  mapToViewModel(rental) {
    return {
      _id: rental._id,
      customerId: rental.customer._id,
      movieId: rental.movie._id,
    };
  }

  doSubmit = async () => {
    await saveRental(this.state.data);

    this.props.history.push("/rentals");
  };

  render() {
    if (this.state.movies) {
      console.log(this.state.movies);
    }
    return (
      <div>
        <h1>Rental Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderSelect("customerId", "Customer", this.state.customers)}
          {this.renderSelect2("movieId", "Movie", this.state.movies)}

          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default RentalForm;
