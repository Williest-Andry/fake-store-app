import { useNavigate } from "react-router";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="font-work flex flex-col  gap-10 justify-center items-center mt-100">
      <p className="text-3xl text-black font-bold">
        {"Oops! The page you're looking for does not exist."}
      </p>
      <button className="cursor-pointer text-2xl" onClick={() => navigate("/")}>
        {"<= Go back home"}
      </button>
    </div>
  );
}
