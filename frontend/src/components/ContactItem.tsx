import { User } from "lucide-react";
import { useState } from "react";
import {  useContacts } from "../context/ContactContext";

interface ContactItemProps {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  deleteContact: (id: number) => void;
}

export default function ContactItem({ id, firstName, lastName, deleteContact }: ContactItemProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [fetchUser, setFetchUser] = useState<boolean>(false);
  const { choosenContact, fetchUserId } = useContacts();

  const handleClick = async (id: number) => {
    setFetchUser(true)
    await fetchUserId(id)
  };

  return (
    <>
    {fetchUser && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      
      <div className="bg-white flex flex-col rounded-2xl shadow-lg p-6 max-w-sm w-full text-center">
        <button className="flex justify-end text-black text-2xl" onClick={() => {setFetchUser(false)}}>X</button>
          <p className="text-xl mb-5">Name: {choosenContact.first_name}</p>
           <p className="text-xl mb-5">Last name: {choosenContact.last_name}</p>
            <p className="text-xl mb-5">Email: {choosenContact.email}</p>
             <p className="text-xl mb-5">Created at: {choosenContact.created_at}</p>
        </div>
      </div>
    )}
    {openModal && (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full text-center">
          <p className="text-xl mb-5">Delete this contact?</p>
          <div className="flex justify-center gap-5">
            <button className="btn bg-blue-600 rounded-md px-5 py-2" onClick={() => {deleteContact(id)}}>Yes</button>
            <button className="btn bg-red-600 rounded-md px-5 py-2" onClick={() => {setOpenModal(false)}}>No</button>
          </div>
        </div>
      </div>
    )}
    <div
      className="flex justify-between items-center gap-6 mb-4 border-2 border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition bg-white"
      key={id}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600">
          <User className="h-5 w-5" />
        </div>
        <div>
          <p className="font-semibold text-gray-800">{firstName} {lastName}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => {handleClick(id)}}
          className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm font-medium"
        >
          More
        </button>
        <button
          onClick={() => {setOpenModal(true)}}
          className="px-3 py-1.5 bg-red-600 text-white rounded-md text-sm font-medium"
        >
          Delete
        </button>
      </div>
    </div>
    </>
  );
}
