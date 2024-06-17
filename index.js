const { program } = require('commander');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require('./contacts');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case 'get':
      if (!id) {
        console.log('Будь ласка, вкажіть ID контакту.');
        return;
      }
      const contact = await getContactById(id);
      console.table(contact);
      break;

    case 'add':
      if (!name || !email || !phone) {
        console.log(
          "Будь ласка, вкажіть ім'я, email та телефон для додавання контакту."
        );
        return;
      }
      const newContact = await addContact(name, email, phone);
      console.table(newContact);
      break;

    case 'remove':
      if (!id) {
        console.log('Будь ласка, вкажіть ID контакту для видалення.');
        return;
      }
      const removedContact = await removeContact(id);
      if (removedContact) {
        console.table(removedContact);
      } else {
        console.log('Контакт з таким ID не знайдено');
      }
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(options);
