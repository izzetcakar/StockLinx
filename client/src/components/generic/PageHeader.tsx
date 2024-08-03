import React from "react";
interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <div className="page__content__header">
      <div className="page__content__header__title">{title}</div>
    </div>
  );
};

export default PageHeader;
