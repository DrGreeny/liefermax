import mongodb from "../../../utils/mongodb";
import Bestellung from "../../../models/Bestellung";

export default async function handler(req, res) {
  console.log("API_handler called");
  const {
    method,
    query: { nr },
  } = req;

  await mongodb.dbConnect();
  if (method === "GET") {
    try {
      const bestellung = await Bestellung.findById(nr);

      res.status(200).json(bestellung);
    } catch (error) {
      res.status(200).json(error); //Fehlermeldung soll später auf der Bestellseite bearbetiet werden
    }
  }

  /*   if (method === "PUT") {
    //Änderung der Bestelldaten
    try {
      console.log("Bestelle...");
      const bestellung = await Bestellung.create(req.body);
      console.log(bestellung);
      res.status(201).json(bestellung);
    } catch (error) {
      res.status(500).json(error);
    }
  } */
}
