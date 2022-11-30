import { Button, Card } from "react-bootstrap";
import Link from "next/link";

export default function Produktliste({ produkte }) {
  return (
    <div>
      <div className="row row-cols-3">
        {produkte?.map((produkt) => (
          <div key={produkt.name} className="mt-3 col">
            <Card>
              <Link href={`/produkte/${produkt.url}`} passHref>
                <Card.Img variant="top" src={produkt.bild} />
              </Link>
              <Card.Body>
                <Card.Title>
                  {produkt.name} {produkt.preis.toFixed(2)}€
                </Card.Title>
                <Card.Text>{produkt.beschreibung}</Card.Text>
                <Link href={`/produkte/${produkt.url}`}>
                  <Button variant="danger">Bestellung</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <br />
    </div>
  );
}
