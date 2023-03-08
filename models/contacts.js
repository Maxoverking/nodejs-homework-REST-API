const fs = require("fs").promises;
const path = require("path");
// получаем полный путь к файлу
const contactsPath = path.join(__dirname, "contacts.json");

const updateFileOperation = async (addToContactFile) => {
  const data = await listContacts();

  const contactFile = data.filter(({ id }) => id !== addToContactFile.id);
  const addNewContact = [addToContactFile, ...contactFile];

  const convertToString = JSON.stringify(addNewContact);
  await fs.writeFile(contactsPath, convertToString, "utf-8");
};

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log("🚀  error:", error);
  }
};

const getContactById = async ({ contactId }) => {
  try {
    const data = await listContacts();
    const contact = data.filter(({ id }) => id === contactId);
    return contact;
  } catch (error) {
    console.log("🚀  error:", error);
  }
};

const removeContact = async ({ contactId }) => {
  try {
    const data = await listContacts();

    const contactIndex = data.some((item) => item.id === contactId);
    const newContactsArray = data.filter(({ id }) => id !== contactId);

    await fs.writeFile(contactsPath, JSON.stringify(newContactsArray), "utf-8");
    return contactIndex;
  } catch (error) {
    console.log("🚀  error:", error);
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const newContact = { id: Date.now().toString(), name, email, phone };
    updateFileOperation(newContact);
    return newContact;
  } catch (error) {
    console.log("🚀  error:", error);
  }
};

const updateContact = async ({ contactId }, { name, email, phone }) => {
  try {
    const data = await listContacts();
    const changeContacts = data.reduce((acc, contact) => {
      if (contact.id === contactId) {
        acc.id = contactId;
        acc.name = name;
        acc.email = email;
        acc.phone = phone;
      }
      return acc;
    }, {});

    updateFileOperation(changeContacts);
    return changeContacts;
  } catch (error) {
    console.log("🚀  error:", error);
  }
};

listContacts();

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
