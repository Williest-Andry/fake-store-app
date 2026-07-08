import { useNavigate } from "react-router";
import Reload from "/reload.png";

export default function ErrorSection() {
  const navigate = useNavigate();

  return (
    <div className="font-work flex flex-col  gap-10 justify-center items-center mt-100">
      <p className="text-3xl text-red-600">Something goes wrong !</p>
      <button className="cursor-pointer" onClick={() => navigate(0)}>
        <img src={Reload} alt="reload icon" />
      </button>
      <button className="cursor-pointer text-2xl" onClick={() => navigate("/")}>
        Go back home
      </button>
    </div>
  );
}
