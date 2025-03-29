import { program } from "commander";
import * as contacts from "./contacts.cjs";
import "colors";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

function printSingle(contact) {
  if (contact) {
    console.table([contact]);
  } else {
    console.error("record not found".red);
  }
}

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await contacts.listContacts();
      console.table(list);
      break;
    case "get":
      const contact = await contacts.getContactById(id);
      printSingle(contact);
      break;

    case "add":
      const saved = await contacts.addContact(name, email, phone);
      console.table([saved]);
      break;

    case "remove":
      const removed = await contacts.removeContact(id);
      printSingle(removed);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
