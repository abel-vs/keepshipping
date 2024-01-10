import ShipInput from "./ship-input";

export default function SubmitShipSection() {
  return (
    <>
      <span className="text-7xl md:text-8xl">🚢</span>
      <h1 className="text-2xl md:text-4xl font-bold text-center">
        what did you ship today?
      </h1>
      <div className=" max-w-sm items-center mt-8">
        <ShipInput text="today i shipped..." />
      </div>
    </>
  );
}
