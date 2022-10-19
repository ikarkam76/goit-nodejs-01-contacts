const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      return JSON.parse(data);
    })
    .then((data) => {
      return Promise.all(
        data.map((elem) => {
          return {
            Id: elem.id,
            Name: elem.name,
            Email: elem.email,
            Phone: elem.phone,
          };
        })
      );
    })
    .then((res) => console.table(res))
    .catch((error) => console.log(error));
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      return JSON.parse(data).filter((el) => el.id === contactId);
    })
    .then((data) => console.table(data))
    .catch((error) => console.log(error));
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      return JSON.parse(data).filter((el) => el.id !== contactId);
    })
    .then((res) => {
      fs.writeFile(contactsPath, JSON.stringify(res))
        .then(() => console.log("deleted contact number", contactId))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8")
    .then(data => {return JSON.parse(data)})
    .then((data) => {
      return [
        ...data,
        {
          id: data.length + 1,
          name: name,
          email: email,
          phone: phone,
        },
      ];
    })
    .then((res) => { 
      fs.writeFile(contactsPath, JSON.stringify(res))
        .then(() => console.log("added new contact"))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
