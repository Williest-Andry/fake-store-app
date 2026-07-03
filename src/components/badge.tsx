type BadgeProps = {
  w?: string;
  value: string;
};

export default function Badge({ w = "0", value }: BadgeProps) {
  return (
    <div
      className={`flex justify-center items-center border rounded-full w-${w}`}
    >
      <p>{value}</p>
    </div>
  );
}
