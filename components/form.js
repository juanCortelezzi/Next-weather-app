import validate from "./validate.js";
import Router from "next/router";
import { useState } from "react";

export default function Form() {
  const [q, setq] = useState("");

  const handleChange = ({ target }) => {
    const { value } = target;
    setq(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = validate(q);
    if (valid.valid) {
      Router.push(`/?q=${valid.query}`);
      e.target.reset();
    } else {
      alert(`${q} is not valid`);
    }
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <label htmlFor="q">
        <img id="location-logo" src="/location-logo.svg" alt="location logo" />
      </label>
      <input
        type="text"
        name="q"
        id="q"
        placeholder="ej.New York,US or Buenos Aires,AR"
        onChange={handleChange}
        required
      />
    </form>
  );
}
