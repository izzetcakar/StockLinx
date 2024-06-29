import { EntityCardColumn } from "@/interfaces/clientInterfaces";
import React, { useState } from "react";
import "./entitypanel.scss";
interface EntityPanelProps {
  data: any[];
  cardColumns: EntityCardColumn[];
}
interface CardContentProps {
  value: any;
  content: (e: any) => any;
}

const CardContent: React.FC<CardContentProps> = ({ value, content }) => {
  return content(value);
};

const EntityPanel: React.FC<EntityPanelProps> = ({ cardColumns, data }) => {
  const [selectedCardColumn, setSelectedCardColumn] =
    useState<EntityCardColumn | null>(null);
  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [showMore, setShowMore] = useState<boolean[]>(
    [...Array(data.length)].map(() => false)
  );

  const handleSelectCard = (entity: any) => {
    if (selectedData !== entity) setSelectedData(entity);
    setSelectedCardColumn(cardColumns[0]);
  };

  const handleSelectColumn = (entity: any, column: EntityCardColumn) => {
    if (selectedData !== entity) setSelectedData(entity);
    if (selectedCardColumn !== column) setSelectedCardColumn(column);
  };

  const handleShowMore = (entityIndex: number) => {
    setShowMore((prev) => {
      const newShowMore = [...prev];
      newShowMore[entityIndex] = !prev[entityIndex];
      return newShowMore;
    });
  };

  return (
    <div className="entity__panel">
      <div className="card__container">
        {data.map((entity, entityIndex) => (
          <div
            key={`entity_card_${entityIndex}`}
            onClick={() => handleSelectCard(entity)}
            className="card__content"
          >
            <div
              className={`card__title ${
                selectedData === entity ? "selected" : ""
              }`}
            >
              {typeof cardColumns[0].title === "string" ? (
                cardColumns[0].title
              ) : (
                <CardContent value={entity} content={cardColumns[0].title} />
              )}
            </div>
            {(showMore[entityIndex]
              ? cardColumns.slice(1)
              : cardColumns.slice(1, 3)
            ).map((column, columnIndex) => (
              <div
                key={`entity_card_column_${columnIndex}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectColumn(entity, column);
                }}
                className={`card__column ${
                  selectedData === entity && selectedCardColumn === column
                    ? "selected"
                    : ""
                }`}
              >
                {typeof column.title === "string" ? (
                  column.title
                ) : (
                  <CardContent value={entity} content={column.title} />
                )}
              </div>
            ))}
            {cardColumns.length > 3 && (
              <div
                key={`entity_card_column_more`}
                className="card__column show__more"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShowMore(entityIndex);
                }}
              >
                {showMore[entityIndex] ? "Show Less" : "Show More"}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="panel__content">
        {selectedData && selectedCardColumn && (
          <CardContent
            value={selectedData}
            content={selectedCardColumn.renderData}
          />
        )}
      </div>
    </div>
  );
};

export default EntityPanel;
