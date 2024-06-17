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
    const [removeContact] = contacts.slice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removeContact;
  } catch (error) {
    console.error('Error removing contact:', error.message);
    return null;
  }
}
