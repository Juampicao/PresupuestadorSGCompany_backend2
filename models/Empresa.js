import mongoose from "mongoose";
const EmpresaSchema = mongoose.Schema(
  {
    nombreEmpresa: { type: String, default: "" },
    direccionEmpresa: { type: String, default: "" },
    contactoEmpresa: { type: String, default: "" },
    observacionesParticulares: { type: String, default: "" },
    aclaracionesGenerales: { type: String, default: "" },
    creador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let Empresa;
if (mongoose.models.Empresa) {
  Empresa = mongoose.model("Empresa");
} else {
  Empresa = mongoose.model("Empresa", EmpresaSchema);
}

export default Empresa;
