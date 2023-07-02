const MenuItemTitle = ({ title }: { title: string }) => {
  return (
    <span className="flex-1 ml-3 whitespace-nowrap cursor-pointer">
      {title}
    </span>
  );
};
export default MenuItemTitle;
