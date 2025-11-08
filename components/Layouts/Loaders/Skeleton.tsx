const Skeleton = ({
  width = "w-full",
  height = "h-4",
  rounded = "rounded-xl",
  className = "",
}) => {
  const defaultColor = "bg-zinc-100 dark:bg-zinc-900/30";

  return (
    <div
      className={` animate-pulse
      ${width} ${height} ${rounded} ${defaultColor} ${className}`}
    />
  );
};

export default Skeleton;
