import Link from "next/link";
import { useRouter } from "next/router";
import jsondb from "../../jsondb/produkte";
import Image from "next/image";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";

export default function Produktseite() {
  const router = useRouter();
  const { url } = router.query; //Übergabe des text hinter der Route
  const produkt = jsondb.produkte.find((a) => a.url === url);

  if (!produkt) {
    //Produkt gefunden ??
    return (
      <div>
        <h2>Produkt nicht vorhanden!!</h2>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Link href="/" className="text-dark">
          ← Startseite
        </Link>
      </div>

      <div className="row row-cols-2 mt-2">
        <div>
          <Image
            className="rounded-3"
            src={produkt.bild}
            alt={produkt.name}
            width={600}
            height={600}
            layout="responsive"
          />
        </div>
        <div>
          <h1>{produkt.name}</h1>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2 className="text-danger">{produkt.preis} €</h2>
            </ListGroupItem>
            <ListGroupItem>{produkt.beschreibung}</ListGroupItem>
            <ListGroupItem>
              Extras: doppelt
              <input className="form-check-input me-2" type="checkbox" />
              extra Pommes
              <input className="form-check-input me-2" type="checkbox" />
            </ListGroupItem>
            <ListGroupItem>
              <input
                className="form-control w-50"
                type="number"
                placeholder="1"
                min="1"
              />
            </ListGroupItem>
            <ListGroupItem>
              <Button variant="danger">zum Warenkorb</Button>
            </ListGroupItem>
          </ListGroup>
        </div>
      </div>
    </div>
  );
}
