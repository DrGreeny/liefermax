import { Table, CloseButton, Button, Card } from "react-bootstrap";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { loescheProdukt, leeren } from "../redux/warenkorbSlice";
import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function Warenkorb() {
  const dispatch = useDispatch();
  const warenkorb = useSelector((state) => state.warenkorb);
  const clientID =
    "AXCgEO8JEO1S4bDmVP3nMSINarI_ETv9w9b2Am5eSyFzDyYnQaU14BQx14qixczyEM_HfG04_ivfxytC";
  const [kasse, setKasse] = useState(false);

  const entfernen = (produkt) => {
    dispatch(loescheProdukt(produkt));
    toast.error(produkt.name + " wurde entfernt!", {
      position: "top-center",
      autoClose: 3000,
    });
  };
  const amount = warenkorb.gesamtbetrag.toFixed(2);
  const currency = "EUR";
  const style = { layout: "vertical", height: 30 };
  const router = useRouter();

  const erstelleBestellung = async (data) => {
    try {
      console.log("erstelleBestellung");
      const res = await axios.post(
        "http://localhost:3000/api/bestellungen",
        data
      );
      console.log(res);
      if (res.status === 201) {
        console.log("leeren");
        dispatch(leeren());
        router.push(`/bestellungen/${res.data._id}`);
      }
    } catch (error) {
      console.log("erstelleBestellung error:");
      console.log(error.response.data);
    }
  };

  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);
    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const kunde = details.purchase_units[0].shipping;
              erstelleBestellung({
                kunde: kunde.name.full_name,
                adresse:
                  kunde.address.address_line_1 +
                  ", " +
                  kunde.address.admin_area_2,
                betrag: warenkorb.gesamtbetrag,
                status: 0,
                zahlung: 1,
                produkte: warenkorb.produkte.map((produkt) => ({
                  name: produkt.name,
                  menge: produkt.menge,
                  extras: produkt.extras.map((extra) => extra.text),
                })),
              });
            });
          }}
        />
      </>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }} //hier fängt die animation an, d.h. komplette Seite ist quasi ausgeblendet
      animate={{ opacity: 1, x: 0 }} // animiert wird bis zu opacity = 1 = voll eingeblendet
      //transition={{ ease: "easeOut", duration: 3 }} //ausfaden von einer anderen Seite auf diese heißt längeres Faden
      transition={{ type: "spring", stiffness: 200 }}
    >
      {warenkorb.wAnzahl === 0 ? (
        <h2>Warenkorb ist leer</h2>
      ) : (
        <div>
          <h1>Warenkorb</h1>
          <div className="row mt-4">
            <div className="col-9">
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Bild</th>
                    <th>Name</th>
                    <th>Extras</th>
                    <th>Menge</th>
                    <th>Betrag</th>
                    <th>
                      <CloseButton disabled />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {warenkorb.produkte.map((produkt) => (
                    <tr key={produkt._id}>
                      <td>
                        <Image
                          src={produkt.bild}
                          alt={produkt.name}
                          width={50}
                          height={50}
                        />
                      </td>
                      <td>
                        <Link
                          href={`/produkte/${produkt.url}`}
                          className="text-danger"
                        >
                          {produkt.name}
                        </Link>
                      </td>
                      <td>
                        {produkt.extras.map((extra) => (
                          <span key={extra._id}>{extra.text}</span>
                        ))}
                      </td>
                      <td>{produkt.menge}</td>
                      <td>{(produkt.preis * produkt.menge).toFixed(2)}EUR</td>
                      <td>
                        <Button
                          className="btn-sm"
                          onClick={() => entfernen(produkt)}
                        >
                          x
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div className="col-3 p-2">
              <Card>
                <Card.Header as="h5">Gesamt</Card.Header>
                <Card.Body className="text-center">
                  <Card.Title>{warenkorb.gesamtbetrag.toFixed(2)} €</Card.Title>
                  {kasse ? (
                    <PayPalScriptProvider
                      options={{
                        "client-id": clientID,
                        components: "buttons",
                        currency: "EUR",
                        //"disable-funding":"sofort" - einzelne Optionen deaktivieren
                      }}
                    >
                      <ButtonWrapper currency={currency} showSpinner={false} />
                    </PayPalScriptProvider>
                  ) : (
                    <Button variant="primary" onClick={() => setKasse(true)}>
                      Zur Kasse
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
