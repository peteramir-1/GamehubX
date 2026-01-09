type HeadProps = {
  title: string;
  description?: string;
};

export default function Head({ title, description }: HeadProps) {
  return (
    <>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
    </>
  );
}
