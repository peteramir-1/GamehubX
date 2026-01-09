type DescriptionSectionProps = React.HTMLAttributes<HTMLElement> & {
  description: string;
};

const DescriptionSection = ({ description }: DescriptionSectionProps) => {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold">About</h2>
      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </section>
  );
};

export default DescriptionSection;
