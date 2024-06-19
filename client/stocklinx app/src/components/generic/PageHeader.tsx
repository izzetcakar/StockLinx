import GenericContext from "@/context/GenericContext";
import React, { useContext } from "react";

interface PageHeaderProps {
  title: string;
  enableCompanyDrawer?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  enableCompanyDrawer = false,
}) => {
  const { drawerBadge } = useContext(GenericContext);
  return (
    <div className="page__content__header">
      <div className="page__content__header__title">{title}</div>
      {enableCompanyDrawer ? drawerBadge() : null}
    </div>
  );
};

export default PageHeader;
