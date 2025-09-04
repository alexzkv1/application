import {  useState } from "react";
import { useContacts } from "../context/ContactContext";
import { XCircle, CheckCircle } from "lucide-react";
import { Link } from 'react-router-dom'

export default function ContactForm() {
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [success, setSuccess] = useState(false);
    const { createContact, error } = useContacts();

    const submit = async (e : React.FormEvent) =>{
      e.preventDefault();
      await createContact({first_name: name, last_name: lastName, email: email})
      setSuccess(true)
    }
    
    
  return (
    <>
    {!success && (<div className="fixed inset-0 flex items-center justify-center z-50">
      
      <div className="relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-md z-10">

        <Link
            to="/"
            className={`mt-4 px-4 py-2 rounded-lg text-black font-semibold flex justify-end`}
          >
            X
          </Link>

        <form className="flex flex-col gap-4" onSubmit={submit}>
          <label className="flex flex-col gap-1">
            <span className="font-semibold">First Name</span>
            <input
              type="text"
              required
              name="firstName"
              className="border border-gray-300 rounded px-3 py-2 text-black"
              value={name}
              onChange={(e) => {setName(e.target.value)}}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="font-semibold">Last Name</span>
            <input
              type="text"
              required
              name="lastName"
              className="border border-gray-300 rounded px-3 py-2 text-black"
              value={lastName}
              onChange={(e) => {setLastName(e.target.value)}}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="font-semibold">Email</span>
            <input
              type="email"
              required
              name="email"
              className="border border-gray-300 rounded px-3 py-2 text-black"
              value={email}
              onChange={(e) => {setEmail(e.target.value)}}
            />
          </label>
          <button className="bg-blue-500 font-bold rounded-md p-2 submit">Create</button>
        </form>
        
      </div>
    </div>)}
    {success && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full text-center">
        <div className="flex flex-col items-center gap-3">
          {error ? (
  <>
    <XCircle className="text-red-600 w-10 h-10" />
    <p>{error}</p>
  </>
) : (
  <>
    <CheckCircle className="text-green-600 w-10 h-10" />
    <p>Contact created successfully!</p>
  </>
)}
          <Link
            to="/"
            className={`mt-4 px-4 py-2 rounded-lg text-white font-semibold ${
              error ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            Close
          </Link>
        </div>
      </div>
    </div>
    )}
    </>
  );
}
