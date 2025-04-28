"use client";

import {
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState
} from "react";
import { Lato } from "next/font/google";

const lato400 = Lato({ subsets: ["latin"], weight: "400" });
const lato700 = Lato({ subsets: ["latin"], weight: "700" });
const lato900 = Lato({ subsets: ["latin"], weight: "900" });

interface Advocate {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
  createdAt: string;
}

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAdvocates("");
  }, []);

  const fetchAdvocates = async (searchTerm: string) => {
    const response = await fetch(`/api/advocates?search=${searchTerm}`);
    const jsonResponse = await response.json();

    setAdvocates(jsonResponse.data);
  }

  const onChange: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    fetchAdvocates(e.target.value);
  };

  const onClick: MouseEventHandler = () => {
    setSearchTerm("");
    fetchAdvocates("");
  };

  return (
    <main className={`m-2 text-xs lg:text-md lg:m-8 ${lato400.className}`}>
      <h1 className={`mb-8 ${lato900.className} text-2xl`}>Solace Advocates</h1>
      <div className="flex mb-8">
        <input value={searchTerm} placeholder="Search..." className="mr-4 p-2.5 w-full bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:border-[#d7a13b]" onChange={onChange} />
        <a className="flex flex-col items-center justify-center px-8 py-1 cursor-pointer rounded-md bg-[#d7a13b] text-center" onClick={onClick}>Clear</a>
      </div>
      <table className="table-auto w-full bg-white border border-gray-500">
        <thead className={`bg-[#265b4e] ${lato700.className} text-white`}>
          <tr>
            <th className="border border-gray-300 px-4 py-2">First Name</th>
            <th className="border border-gray-300 px-4 py-2">Last Name</th>
            <th className="border border-gray-300 px-4 py-2">City</th>
            <th className="border border-gray-300 px-4 py-2">Degree</th>
            <th className="border border-gray-300 px-4 py-2">Specialties</th>
            <th className="border border-gray-300 px-4 py-2">Years of Experience</th>
            <th className="border border-gray-300 px-4 py-2">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {advocates.map((advocate: Advocate) => {
            return (
              <tr key={advocate.id}>
                <td className="border border-gray-300 px-4 py-2">{advocate.firstName}</td>
                <td className="border border-gray-300 px-4 py-2">{advocate.lastName}</td>
                <td className="border border-gray-300 px-4 py-2">{advocate.city}</td>
                <td className="border border-gray-300 px-4 py-2">{advocate.degree}</td>
                <td className="border border-gray-300 px-6 py-2">
                  <ul>
                    {advocate.specialties.map((s: string, i: number) => (
                      <li key={i} className="list-disc">{s}</li>
                    ))}
                  </ul>
                </td>
                <td className="border border-gray-300 px-4 py-2">{advocate.yearsOfExperience}</td>
                <td className="border border-gray-300 px-4 py-2">{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
