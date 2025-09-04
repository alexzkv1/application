import ContactItem from "../components/ContactItem";
import { useContacts } from "../context/ContactContext";
import {Link} from 'react-router-dom'

export interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
}

export default function ContactPage() {
  const { contacts, deleteContact } = useContacts()

  return (
    <>
      <div className="mt-10 flex justify-center">
        <Link
          to="/form"
          className="bg-amber-500 rounded-md p-2 "
        >
          Create new contact
        </Link>
      </div>

      <div className="flex justify-center items-center mt-12">
        <div className="border-2 p-20 min-w-200">
          {contacts.map((contact) => (
            <ContactItem
              key={contact.id}
              id={contact.id}
              firstName={contact.first_name}
              lastName={contact.last_name}
              email={contact.email}
              deleteContact={deleteContact}
            />
          ))}
        </div>
      </div>
    </>

  );
}
