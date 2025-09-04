import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
}

interface ContactContextType {
  contacts: Contact[];
  choosenContact: Contact;
  error: string | null;
  fetchContacts: () => Promise<void>;
  fetchUserId : (id: number) => Promise<void>;
  deleteContact: (id: number) => Promise<void>;
  createContact: (data: Omit<Contact, "id" | "created_at">) => Promise<void>;
}

const ContactContext = createContext<ContactContextType | null>(null);

export function useContacts() {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error("useContacts must be used inside ContactProvider");
  return ctx;
}

export function ContactProvider({ children } : any) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [choosenContact, setChoosenContact] = useState<Contact[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/contacts");
      setContacts(response.data);
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.detail || err.message);
      } else {
        setError("Unknown error fetching contacts.");
      }
    }
  };

  const fetchUserId = async (id : number) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/contacts/${id}`);
      setChoosenContact(response.data)
    } catch(err) {
      if (axios.isAxiosError(err)) {
        setError(err.detail || err.message);
      } else {
        setError("Unknown error fetching choosen contacts.");
      }
    }
  }

  const deleteContact = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/contacts/${id}`);
      await fetchContacts();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.detail || err.message);
      } else {
        setError("Unknown error deleting contact.");
      }
    }
  };

  const createContact = async (data : Object) => {
    try {
      await axios.post("http://127.0.0.1:8000/api/contacts", data);
      await fetchContacts();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.detail || err.message);
      } else {
        setError("Unknown error creating contact.");
      }
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <ContactContext.Provider value={{ contacts, choosenContact, error, fetchContacts, fetchUserId, deleteContact, createContact }}>
      {children}
    </ContactContext.Provider>
  );
}
