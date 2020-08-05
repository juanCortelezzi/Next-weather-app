import validate from "./validate.js";
import Router from "next/router";

export default class Form extends React.Component {
  state = {};

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ q: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const valid = validate(this.state.q);
    if (valid.valid) {
      Router.push(`/?q=${valid.query}`);
      e.target.reset();
    } else {
      alert("shit happens");
    }
  };

  render() {
    return (
      <form autoComplete="off" onSubmit={this.handleSubmit}>
        <span id="location-logo"></span>
        <input
          type="text"
          name="q"
          id="q"
          placeholder="ej.New York,US or Buenos Aires,AR"
          onChange={this.handleChange}
          required
        />
      </form>
    );
  }
}
