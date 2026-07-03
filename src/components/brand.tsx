import Logo from "/ecommerce-32.png";

export default function Brand() {
  return (
    <div className="flex gap-4 items-center justify-center font-work cursor-pointer">
      <img src={Logo} alt="logo icon" />
      <p className="text-3xl font-black">Efake</p>
    </div>
  );
}
