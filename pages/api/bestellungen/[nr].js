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

  if (method === "PUT") {
    //Änderung der Bestelldaten
    try {
      const bestellung = await Bestellung.findByIdAndUpdate(nr, req.body, {
        new: true,
      }); // wichtig, dass parameter nr heißt, da doe funciton die nummer hier erwartet
      res.status(200).json(bestellung);
    } catch (error) {
      console.log(error.response.data);
      res.status(500).json(error);
    }
  }

  if (method === "DELETE") {
    //Änderung der Bestelldaten
    try {
      const bestellung = await Bestellung.findByIdAndDelete(nr); // wichtig, dass parameter nr heißt, da doe funciton die nummer hier erwartet
      res.status(200).json(bestellung);
    } catch (error) {
      console.log(error.response.data);
      res.status(500).json(error);
    }
  }
}
