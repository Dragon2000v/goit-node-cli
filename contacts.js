const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const parseData = JSON.parse(data);
    //console.log(parseData);
    return parseData;
  } catch (error) {
    console.error('Error reading contacts:', error.message);
    return [];
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    //console.log(contacts.filter(el => el.id === contactId));
    return contacts.filter(el => el.id === contactId) || null;
  } catch (error) {
    console.error('Error reading contacts:', error.message);
    return null;
  }
}

//getContactById('rsKkOQUi80UsgVPCcLZZW');

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
      return null;
    }
    const [removedContact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContact;
  } catch (error) {
    console.error('Error removing contact:', error.message);
    return null;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: (contacts.length > 0
        ? contacts[contacts.length - 1].id + 1
        : 1
      ).toString(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.error('Error adding contact:', error.message);
    return null;
  }
}

// listContacts();
//getContactById('rsKkOQUi80UsgVPCcLZZW1');
// addContact('Ден Хомяк', 'winter_dragon@ukr.net', '0999421705');
removeContact('rsKkOQUi80UsgVPCcLZZW1');

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
