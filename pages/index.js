import Head from "next/head";
import Form from "../components/form.js";
import { main_apicall, week_apicall } from "../components/apicall.js";
import { MainCard, WeekCard } from "../components/cards.js";

const Landing = (props) => {
  if (props.allok !== true)
    return (
      <div className="flexcontainer">
        <Head>
          <title>Weather App</title>
          <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
          <link rel="manifest" href="/icons/site.webmanifest" />
        </Head>
        <style jsx global>{`
          body {
            width: 100vw;
            height: 100vh;
          }
        `}</style>
        <Form />
        <h2 className="error__main_card">Something Went Wrong</h2>
      </div>
    );

  const { today_data, week_data } = props;

  return (
    <>
      <Head>
        <title>Weather App</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="manifest" href="/icons/site.webmanifest" />
      </Head>

      <Form />
      <MainCard data={today_data} />
      {week_data.daily.map((x_data) => {
        return <WeekCard key={x_data.dt} data={x_data} />;
      })}
      <footer>
        <a href="https://github.com/juanCortelezzi/next-weather-app">Github</a>
      </footer>
    </>
  );
};

export async function getServerSideProps({ query }) {
  if (typeof query.q === "undefined") {
    query.q = "auckland,nz";
  }
  const today_data = await main_apicall(query.q);

  if (today_data.cod === 404 || today_data.cod === "404") {
    console.log("----- api-error -----");
    const allok = false;
    return { props: { allok } };
  }

  const allok = true;

  const week_data = await week_apicall(today_data.coord.lat, today_data.coord.lon);

  return { props: { today_data, week_data, allok } };
}
export default Landing;
