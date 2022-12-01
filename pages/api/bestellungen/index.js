import mongodb from "../../../utils/mongodb";
import Bestellung from "../../../models/Bestellung";

export default async function handler(req, res) {
  console.log("API_handler called");
  const { method } = req;
  await mongodb.dbConnect();
  if (method === "GET") {
    try {
      const bestellungen = await Bestellung.find();

      res.status(200).json(bestellungen);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  if (method === "POST") {
    //Speicherung der Bestelldaten
    try {
      console.log("Bestelle...");
      const bestellung = await Bestellung.create(req.body);
      console.log(bestellung);
      res.status(201).json(bestellung);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  res.status(405).send("Method Not Allowed");
}
