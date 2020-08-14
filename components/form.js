import validate from "./validate.js";
import Router from "next/router";
import { useState, useEffect } from "react";
import Spinner from "./spinner.js";
import Help from "./help";

export default function Form() {
  const [q, setq] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setLoader(true);
    };
    const handleRouteChangeCompleted = () => {
      setLoader(false);
    };

    Router.events.on("routeChangeStart", handleRouteChangeStart);
    Router.events.on("routeChangeComplete", handleRouteChangeCompleted);

    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart);
      Router.events.off("routeChangeComplete", handleRouteChangeCompleted);
    };
  }, []);

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

  if (loader) {
    return (
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Spinner />
        <p>{q}</p>
      </form>
    );
  }
  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <label htmlFor="q" id="location-logo_wrapper">
        <img id="location-logo" src="/images/location-logo.svg" alt="location logo" />
      </label>
      <input
        type="text"
        name="q"
        id="q"
        placeholder="ej.New York,US or Buenos Aires,AR"
        onChange={handleChange}
        required
      />
      <Help />
    </form>
  );
}
