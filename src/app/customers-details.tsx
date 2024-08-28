"use client";

import { useMemo } from "react";
import { Customer } from "./types";
import { capitalizeFirstLetter } from "./utls";

interface IProps {
  customer: Customer | null;
  onClose(): void;
}

export default function CustomersDetails({ customer, onClose }: IProps) {
  const closeModal = () => {
    onClose();
  };

  const isOpen = useMemo(() => !!customer, [customer]);

  return (
    <div
      className={`${
        isOpen ? "flex" : "hidden"
      }  items-center justify-center fixed w-full h-full bg-black/60 top-0 left-0 p-4`}
      onClick={(event) => {
        event.stopPropagation();
        closeModal();
      }}
    >
      <div className="bg-white shadow rounded-lg max-w-[900px] w-full py-6 px-8">
        <h1 className="text-2xl font-semibold">Details</h1>

        {!!customer && (
          <div className="space-y-4 mt-6">
            <div>
              <p className="font-bold">Name</p>
              <p>{customer?.name}</p>
            </div>
            <div>
              <p className="font-bold">Email</p>
              <p>{customer?.email}</p>
            </div>
            <div>
              <p className="font-bold">Phone</p>
              <p>{customer?.phone}</p>
            </div>
            <div>
              <p className="font-bold">Gender</p>
              <p>{capitalizeFirstLetter(customer.gender)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
