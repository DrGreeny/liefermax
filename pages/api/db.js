// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongodb from "../../utils/mongodb";
import jsondb from "../../jsondb/produkte";
import Produkt from "../../models/Produkt";

export default async function handler(req, res) {
  await mongodb.dbConnect();
  await Produkt.deleteMany(); //alle existierenden Produkte aus der COllection entfernen
  await Produkt.insertMany(jsondb.produkte);
  const produkte = await Produkt.find({});
  await mongodb.dbDisconnect();
  res.send(produkte);
}
