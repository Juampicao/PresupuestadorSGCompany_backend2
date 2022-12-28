const GetAllPresupuestos = async (req, res) => {
  const { id } = req.params;

  customLogger.logDebug("[GetAllPresupuestosFn], body:", req.body);
  console.log("DESDE BACKEND");

  fetch("http://localhost:4000/pedidos/2032", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // body: JSON.stringify({ id: 78912 }),
  })
    .then((response) => customLogger.logDebug("response: ", response))
    .then(() =>
      customLogger.logDebug("La respuesta de BD llego bien pero no se lee!")
    );

  try {
    res.json({ msg: "La peticicion al Backend llego correctamente!" });
  } catch (error) {
    customLogger.logDebug("[GetAllPresupuestosFn]", error);
  }
};
