import Link from "next/link";

const TabButton = ({
  isActive,
  pathname,
  title,
  defaultIcon,
  activeIcon,
}: {
  isActive?: boolean;
  pathname: string;
  title: string;
  defaultIcon: React.ReactNode;
  activeIcon?: React.ReactNode;
}) => {
  return (
    <Link href={pathname} className="flex flex-col items-center gap-px">
      {isActive ? activeIcon : defaultIcon}
      <span>{title}</span>
    </Link>
  );
};

export default TabButton;
