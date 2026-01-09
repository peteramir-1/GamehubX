type InfoProps = React.HTMLAttributes<HTMLDivElement> & {
  label: string;
  value: string | number;
};

const Info = ({ label, value }: InfoProps) => {
  return (
    <div>
      <p className="text-zinc-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
};

const NotFound = () => {
  return <p className="text-center text-red-500">Game not found</p>;
};

export { NotFound, Info };
