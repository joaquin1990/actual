import Contenedor from "./src/managers/contenedor.js";
// const Contenedor = require("./managers/contenedor.js");

const contenedorService = new Contenedor();
const environment = async () => {
  let item = {
    title: "Vela de Pera",
    price: 790,
    thumbnail: "https://m.media-amazon.com/images/I/612AagQtN-L._AC_SS450_.jpg",
  };
  // console.log(await contenedorService.getById(1));
  await contenedorService.save(item);
  //   await contenedorService.getById(1);
  // await contenedorService.deleteById(8);
  //   await contenedorService.deleteAll();
};

environment();
