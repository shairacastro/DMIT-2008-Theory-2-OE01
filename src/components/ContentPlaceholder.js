import Card from "./Card";

export default function ContentPlaceholder({
  title = "Content Placeholder",
  message = "Placeholder for the upcoming component design.",
  cta,
}) {
  return (
    <Card colSpan="md:col-span-1" rowSpan="md:row-span-2 flex gap-1" title={title}>
      <div className="flex h-full flex-col justify-center gap-3">
        <p className="text-sm font-light text-neutral-300">{message}</p>
        {cta ? <p className="text-xs text-primary-500">{cta}</p> : null}
      </div>
    </Card>
  );
}
