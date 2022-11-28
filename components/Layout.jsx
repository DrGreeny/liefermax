import Head from "next/head";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Liefermax - Dein Lieferservice</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <div className="container">{children}</div>
      <Footer />
    </div>
  );
}
