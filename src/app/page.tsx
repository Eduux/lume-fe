import CustomersList from "./customers-list";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/data");

  const data = await response.json();

  return (
    <main className=" min-h-screen p-4">
      <div className="max-w-[900px] m-auto">
        <h1 className="text-2xl font-semibold">Customer List</h1>
        <div className="w-full h-full mt-10">
          <CustomersList customers={data} />
        </div>
      </div>
    </main>
  );
}
