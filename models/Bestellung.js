import mongoose from "mongoose";

const BestellungsSchema = new mongoose.Schema(
  {
    kunde: {
      type: String,
      required: true,
      maxLength: 100,
    },
    adresse: {
      type: String,
      required: true,
      maxLength: 200,
    },
    betrag: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    zahlung: {
      type: Number,
      required: true,
    },
    produkte: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          menge: {
            type: Number,
            required: true,
          },
          extras: {
            type: [
              {
                type: String,
              },
            ],
          },
        },
      ],
    },
  }
  // { timestamps: true }
);
//delete mongoose.connection.model["Bestellung"];
export default mongoose.models.Bestellung ||
  mongoose.model("Bestellung", BestellungsSchema);
