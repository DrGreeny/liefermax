import Produktliste from "../components/Produktliste";
import Slider from "../components/Slider";
import mongodb from "../utils/mongodb";
import Produkt from "../models/Produkt";

export default function Home({ produkte }) {
  return (
    <div>
      <Slider />
      <Produktliste produkte={produkte} />
    </div>
  );
}

export async function getServerSideProps() {
  await mongodb.dbConnect();
  const produkte = await Produkt.find({}).lean(); //gibt mongoose object zurück ohne lean()
  //mongoose ist schlau genug die Datenbank verbindung ndanach wieder zu sclhießen
  return {
    props: {
      produkte: JSON.parse(JSON.stringify(produkte)),
    },
  };
}
