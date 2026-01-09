type TrailerSectionProps = React.HTMLAttributes<HTMLElement> & {
  trailer: string;
};

const TrailerSection = ({ trailer }: TrailerSectionProps) => {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold">Trailer</h2>
      <video src={trailer} controls className="w-full shadow-lg rounded-xl" />
    </section>
  );
};

export default TrailerSection;
