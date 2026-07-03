export default function Loading() {
  return (
    <div className="flex justify-center items-center mt-100 gap-4 ">
      <p className="text-3xl text-black">Loading</p>
      <svg className="size-10 animate-spin bg-black" />
    </div>
  );
}
