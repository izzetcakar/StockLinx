import PageHeader from "@/components/generic/PageHeader";
import Gridtable from "@/components/gridTable/GridTable";
import { testColumns, testData } from "./MOCK_DATA";
import { useEffect, useRef, useState } from "react";

const TestTable = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [dimensions, setDimensions] = useState({
    rowHeight: 28,
    visibleRowCount: 10,
  });
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const updateDimensions = () => {
      if (elementRef.current) {
        const container = elementRef.current;
        const containerHeight = container.clientHeight;
        const rowElement = container.querySelector(".test__row");

        if (rowElement) {
          const rowHeight = rowElement.clientHeight;
          const visibleRowCount = Math.ceil(containerHeight / rowHeight);
          setDimensions({
            rowHeight,
            visibleRowCount,
          });
        }
      }
    };

    updateDimensions();

    const handleResize = () => {
      updateDimensions();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const newScrollTop = elementRef.current.scrollTop;
        setScrollTop(newScrollTop);
      }
    };

    if (elementRef.current) {
      elementRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (elementRef.current) {
        elementRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const newStartIndex = Math.floor(scrollTop / dimensions.rowHeight);
    setStartIndex(newStartIndex);
  }, [scrollTop, dimensions.rowHeight]);

  const { rowHeight } = dimensions;
  const visibleRowCount = Math.ceil(window.innerHeight / rowHeight);

  const totalHeight = testData.length * rowHeight;
  const visibleData = testData.slice(startIndex, startIndex + visibleRowCount);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "auto",
        border: "1px solid #e0e0e0",
      }}
      ref={elementRef}
    >
      <div style={{ height: `${totalHeight}px` }}></div>
      <div style={{ position: "absolute", top: "0", left: "0", right: "0" }}>
        {visibleData.map((item, index) => (
          <div
            key={startIndex + index}
            className="test__row"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              height: `${rowHeight}px`,
              transform: `translateY(${(startIndex + index) * rowHeight}px)`,
            }}
          >
            <div>{item.id}</div>
            <div>{item.first_name}</div>
            <div>{item.last_name}</div>
            <div>{item.email}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Test = () => {
  return (
    <>
      <PageHeader title="Test" />
      {/* <Gridtable
        data={testData}
        itemKey="id"
        columns={testColumns}
        enableToolbar
        enableEditActions
        enableSelectActions
      /> */}
      <TestTable />
    </>
  );
};

export default Test;
