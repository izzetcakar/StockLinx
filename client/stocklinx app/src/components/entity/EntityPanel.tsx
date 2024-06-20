import { EntityCardData } from "@/interfaces/clientInterfaces";
import React, { useState } from "react";
import "./entitypanel.scss";

interface EntityPanelProps {
  data: any[];
  titleProp: string;
  columns: EntityCardData[];
}

interface RenderCardComponentProps {
  value: any;
  component: (e: any) => any;
}

const RenderCardComponent: React.FC<RenderCardComponentProps> = ({
  value,
  component,
}) => {
  return component(value);
};

const EntityPanel: React.FC<EntityPanelProps> = ({
  titleProp,
  columns,
  data,
}) => {
  const [selectedCardColumn, setSelectedCardColumn] =
    useState<EntityCardData | null>(null);
  const [selectedData, setSelectedData] = useState<any | null>(null);

  const handleSelectCard = (entity: any) => {
    setSelectedData(entity);
    setSelectedCardColumn(columns[0]);
  };

  const handleSelectColumn = (entity: any, column: EntityCardData) => {
    setSelectedData(entity);
    setSelectedCardColumn(column);
  };

  return (
    <div className="entity__panel__container">
      <div className="entity__card__container">
        {data.map((entity, index) => {
          return (
            <div
              key={"entity_card_" + index}
              onClick={() => handleSelectCard(entity)}
              className="entity__card__content"
            >
              <div
                className={
                  selectedData === entity
                    ? "entity__card__title selected"
                    : "entity__card__title"
                }
              >
                {entity[titleProp] || "No Title Found"}
              </div>
              {columns.map((column, index) => {
                return (
                  <div
                    key={"entity_card_column_" + index}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectColumn(entity, column);
                    }}
                    className="entity__card__column"
                  >
                    {column.title}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="entity__panel__content">
        {selectedData && selectedCardColumn ? (
          <RenderCardComponent
            value={selectedData}
            component={selectedCardColumn.renderData}
          />
        ) : null}
      </div>
    </div>
  );
};

export default EntityPanel;
