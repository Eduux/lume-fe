"use client";

import { FixedSizeList as List } from "react-window";
import { AutoSizer } from "react-virtualized";
import { Ellipsis } from "lucide-react";
import useDebounce from "./hooks/debounce";
import { useMemo, useState } from "react";
import { capitalizeFirstLetter } from "./utls";
import { Customer } from "./types";
import CustomersDetails from "./customers-details";

interface TableRowProps {
  index: number;
  style: React.CSSProperties;
  data: Customer[];
  onClick(customer: Customer): void;
}

interface IProps {
  customers: Customer[];
}

const TableRow: React.FC<TableRowProps> = ({ index, style, data, onClick }) => {
  const item = data[index];

  return (
    <div className="pb-4" style={style}>
      <div className="shadow flex items-center rounded-xl px-8 py-5 bg-white">
        <div className="flex-1 sm:grid sm:grid-cols-5">
          <div className="flex items-center">{item.name}</div>
          <div className="hidden sm:flex items-center col-span-2">
            {item.email}
          </div>
          <div className="hidden md:flex items-center">{item.phone}</div>
          <div className="hidden md:flex items-center">
            <div
              className={`${
                item.gender === "male"
                  ? "bg-[#f0f4ff] text-[#81abff]"
                  : "bg-[#fef4f0] text-[#f9af95]"
              } rounded-2xl px-5 py-1.5`}
            >
              {capitalizeFirstLetter(item.gender)}
            </div>
          </div>
        </div>
        <div
          className="flex items-center justify-center cursor-pointer"
          onClick={() => onClick(item)}
        >
          <Ellipsis
            color="gray"
            className="transition-all hover:stroke-black"
          />
        </div>
      </div>
    </div>
  );
};

export default function CustomersList({ customers }: IProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [openDetails, setOpenDetails] = useState<Customer | null>(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const projectsFiltered = useMemo(() => {
    return debouncedSearchTerm
      ? customers.filter((customer) => {
          return customer.name
            ?.toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase());
        })
      : customers;
  }, [customers, debouncedSearchTerm]);

  return (
    <>
      <input
        className="rounded-lg border px-4 py-2 mb-4"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Customer"
      />
      <div className="mt-4 flex pl-8 pr-12 pb-3">
        <div className="text-gray-500 flex-1 sm:grid sm:grid-cols-5">
          <div>Name</div>
          <div className="hidden sm:flex col-span-2">Email</div>
          <div className="hidden md:flex">Phone</div>
          <div className="hidden md:flex">Gender</div>
        </div>
        <div className="w-[24px]"></div>
      </div>
      <div className="h-[calc(100vh-220px)]">
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              itemCount={projectsFiltered.length}
              itemSize={85}
              width={width}
              itemData={projectsFiltered}
            >
              {(props) => <TableRow {...props} onClick={setOpenDetails} />}
            </List>
          )}
        </AutoSizer>
      </div>

      <CustomersDetails
        customer={openDetails!}
        onClose={() => setOpenDetails(null)}
      />
    </>
  );
}
