import clsx from "clsx";
const Label = ({
  title,
  subtitle = "Wholesale pricing by quote",
  position = "bottom",
}: {
  title: string;
  subtitle?: string;
  position?: "bottom" | "center";
}) => {
  return (
    <div
      className={clsx(
        "absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label",
        {
          "lg:px-20 lg:pb-[35%]": position === "center",
        },
      )}
    >
      <div className="flex max-w-full items-center gap-3 rounded-full border bg-white/80 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/80 dark:text-white">
        <h3 className="mr-4 line-clamp-2 grow pl-2 leading-none tracking-tight">
          {title}
        </h3>
        <span className="flex-none rounded-full bg-blue-600 p-2 text-white">
          {subtitle}
        </span>
      </div>
    </div>
  );
};

export default Label;
