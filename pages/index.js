import Produktliste from "../components/Produktliste";
import Slider from "../components/Slider";
import mongodb from "../utils/mongodb";
import Produkt from "../models/Produkt";
import { motion } from "framer-motion";

export default function Home({ produkte }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }} //hier fängt die animation an, d.h. komplette Seite ist quasi ausgeblendet
      animate={{ opacity: 1, x: 0 }} // animiert wird bis zu opacity = 1 = voll eingeblendet
      //transition={{ ease: "easeOut", duration: 3 }} //ausfaden von einer anderen Seite auf diese heißt längeres Faden
      transition={{ type: "spring", stiffness: 200 }}
    >
      <Slider />
      <Produktliste produkte={produkte} />
    </motion.div>
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
