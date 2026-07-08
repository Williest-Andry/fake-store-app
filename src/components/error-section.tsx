import { useNavigate } from "react-router";
import Reload from "/reload.png";

type ErrorSectionProps = {
  message?: string;
  showReloadButton?: boolean;
};

export default function ErrorSection({
  message = "Something goes wrong !",
  showReloadButton = true,
}: ErrorSectionProps) {
  const navigate = useNavigate();

  return (
    <div className="font-work flex flex-col  gap-10 justify-center items-center mt-100">
      <p className="text-3xl text-red-600">{message}</p>
      {showReloadButton && (
        <button className="cursor-pointer" onClick={() => navigate(0)}>
          <img src={Reload} alt="reload icon" />
        </button>
      )}
      <button className="cursor-pointer text-2xl" onClick={() => navigate("/")}>
        {"<= Go back home"}
      </button>
    </div>
  );
}
