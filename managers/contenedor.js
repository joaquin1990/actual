import fs from "fs";
// const fs = require("fs");

const path = "../src/files/items.json";
export default class Contenedor {
  getAll = async () => {
    try {
      console.log(path);
      if (fs.existsSync(path)) {
        let fileData = await fs.promises.readFile(path, "utf8");
        let items = JSON.parse(fileData);
        return items;
      } else {
        return [];
      }
    } catch (error) {
      console.log("Cannot read File : " + error);
    }
  };

  save = async (item) => {
    try {
      let items = await this.getAll();
      if (items.length === 0) {
        item.id = 1;
        items.push(item);
        await fs.promises.writeFile(path, JSON.stringify(items, null, "\t"));
        console.log(`El id del item agregado es el "${item.id}", items:`);
        console.log(items);
      } else {
        item.id = items[items.length - 1].id + 1;
        items.push(item);
        await fs.promises.writeFile(path, JSON.stringify(items, null, "\t"));
        console.log(`El id del item agregado es el "${item.id}", items:`);
        console.log(items);
      }
    } catch (error) {
      console.log("Cannot write file: " + error);
    }
  };

  getById = async (number) => {
    try {
      let items = await this.getAll();
      let findItem = items.find((object) => object.id === number);
      if (findItem) {
        // console.log("We,ve finded this item:");
        // console.log(findItem);
        return findItem;
      } else {
        console.log("No se ha encontrado el item con ese id!");
        return null;
      }
    } catch (error) {
      console.log("Cannot get file: " + error);
    }
  };
  deleteById = async (number) => {
    try {
      let items = await this.getAll();
      let findItem = items.find((item) => item.id === number);
      let newItems = items.filter((item) => item.id != number);
      if (findItem) {
        await fs.promises.writeFile(path, JSON.stringify(newItems, null, "\t"));
        console.log("Se ha eliminado el siguiente item: ");
        console.log(findItem);
      } else {
        console.log(`El id "${number}" no existe!`);
      }
    } catch (error) {
      console.log("Cannot delete item: " + error);
    }
  };

  deleteAll = async () => {
    try {
      let items = await this.getAll();
      items = [];
      await fs.promises.writeFile(path, JSON.stringify(items, null, "\t"));
      console.log("Se han eliminado todos los items");
    } catch (error) {}
  };
}

// module.exports = Contenedor;
// export default Contenedor;
