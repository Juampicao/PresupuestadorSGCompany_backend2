import mongoose from "mongoose";
const EmpresaSchema = mongoose.Schema(
  {
    nombreEmpresa: { type: String },
    direccionEmpresa: "",
    contactoEmpresa: "",
    observacionesParticulares: "",
    aclaracionesGenerales: "",
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
