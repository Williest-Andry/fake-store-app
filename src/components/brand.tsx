import Logo from "../../public/ecommerce-32.png";

export default function Brand() {
  return (
    <div className="flex gap-4 items-center justify-center font-work cursor-pointer">
      <img src={Logo} alt="logo icon" />
      <h1 className="text-3xl font-black">Efake</h1>
    </div>
  );
}
