import Head from "next/head";
import Form from "../components/form.js";
import { main_apicall, week_apicall } from "../components/apicall.js";
import { MainCard, WeekCard } from "../components/cards.js";

const Landing = (props) => {
  if (props.allok !== true)
    return (
      <div className="flexcontainer">
        <Head>
          <title>Juans Weather App - The CLI For The X User</title>
        </Head>
        <style jsx global>{`
          body {
            width: 100vw;
            height: 100vh;
          }
        `}</style>
        <Form />
        <h1 className="error__main_card">Something Went Wrong</h1>
      </div>
    );

  const { today_data, week_data } = props;

  return (
    <>
      <Head>
        <title>Juans Weather App - The CLI For The X User</title>
      </Head>

      <Form />

      <MainCard data={today_data} />

      {week_data.daily.map((x_data) => {
        return <WeekCard key={x_data.dt} data={x_data} alldata={week_data} />;
      })}

      <footer>
        <a href="https://github.com/juanCortelezzi/next-weather-app" className="footer_link">
          <img src="/github-logo.svg" alt="github-logo" />
          <p>Github</p>
        </a>
        <a href="https://nextweatherapp.herokuapp.com/api/auckland,nz" className="footer_link">
          <img src="/bash-logo.svg" alt="bash-logo" />
          Weather CLI
        </a>
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
    return { props: { allok: false } };
  }

  const allok = true;

  const week_data = await week_apicall(today_data.coord.lat, today_data.coord.lon);

  return { props: { today_data, week_data, allok } };
}
export default Landing;
