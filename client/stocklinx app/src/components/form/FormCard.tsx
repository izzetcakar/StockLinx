import React, { ReactNode } from "react";
import "./formcard.scss";
import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

interface FormCardProps {
  title?: string;
  children: ReactNode;
  onClick?: () => void;
}

const FormCard: React.FC<FormCardProps> = ({ title, children, onClick }) => {
  return (
    <div className="formcard__container">
      {title ? <div className="formcard__title">{title}</div> : null}
      {children}
      {onClick ? (
        <div className="formcard__button">
          <Button
            onClick={onClick}
            variant="subtle"
            rightSection={
              <IconPlus
                size={14}
                style={{
                  marginBottom: "2px",
                }}
              />
            }
          >
            Add
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default FormCard;
