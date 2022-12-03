import { Table, Button, CloseButton } from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Bestellung({ bestellungen }) {
  const router = useRouter();

  const status = ["Eingegangen", "Zubereitung", "Unterwegs", "Ausgeliefert"];
  const statusUpdate = async (id, aktuellerStatus) => {
    try {
      if (aktuellerStatus <= 2) {
        await axios.put(`http://localhost:3000/api/bestellungen/` + id, {
          status: aktuellerStatus + 1,
        });
        router.reload(); //Neu laden der Seite (man hätte hier auch über States arbeiten können)
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const bestellungEntfernen = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/bestellungen/` + id);
      router.reload(); //Neu laden der Seite (man hätte hier auch über States arbeiten können)
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <h1>Admin backend</h1>
      <div className="row mt-4">
        <div className="col-12">
          <Table hover responsive>
            <thead>
              <tr>
                <th>Bestellnummer</th>
                <th>Kunde</th>
                <th>Addresse</th>
                <th>Status</th>
                <th>
                  <CloseButton disabled />
                </th>
              </tr>
            </thead>

            <tbody>
              {bestellungen.map((bestellung) => (
                <tr key={bestellung._id}>
                  <td>
                    <Link
                      href={`/bestellungen/${bestellung._id}`}
                      className="text-danger"
                    >
                      {bestellung._id}
                    </Link>
                  </td>
                  <td>{bestellung.kunde}</td>
                  <td>{bestellung.adresse}</td>
                  <td>
                    <Button
                      onClick={() =>
                        statusUpdate(bestellung._id, bestellung.status)
                      }
                    >
                      {status[bestellung.status]}
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => {
                        bestellungEntfernen(bestellung._id);
                      }}
                    >
                      X
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const meinCookie = ctx.req?.cookies || "";
  if (meinCookie.token != process.env.TOKEN) {
    //Nutzer, die keinen COokie haben, können diese Seite nicht mehr laden
    return {
      redirect: {
        destination: "/backend/login",
        permanent: false,
      },
    };
  }
  const res = await axios.get(`http://localhost:3000/api/bestellungen/`);
  //console.log(res.data);
  return {
    props: {
      bestellungen: res.data,
    },
  };
}
