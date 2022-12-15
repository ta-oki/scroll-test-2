import "./styles.css";

import { useEffect, useRef } from "react";

const columnWidth = 200;
const columnHeight = 800;
const sidebarWidth = 80;

const viewportWidth = 500;
const viewportHeight = 400;

const CalendarSidebar = ({ sidebarRef }) => {
  return (
    <div>
      <div
        ref={sidebarRef}
        style={{
          height: `${viewportHeight}px`,
          overflow: "hidden"
        }}
      >
        <div
          style={{
            width: `${sidebarWidth}px`,
            height: `${columnHeight}px`,
            background: "#ffcc33"
          }}
        >
          test
        </div>
      </div>

      <table style={{ width: `${sidebarWidth}px`, background: "#6666ff" }}>
        <tbody>
          <tr>
            <th>test</th>
          </tr>
          <tr>
            <th>test</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Calendar = ({ calendarBodyRef, tableBodyRef }) => {
  const titles = ["a", "b", "c", "d", "e"];

  return (
    <div
      style={{
        width: `${viewportWidth}px`,
        overflow: "hidden"
      }}
    >
      <div>
        <div
          ref={calendarBodyRef}
          style={{
            display: "flex",
            height: `${viewportHeight}px`,
            overflow: "hidden"
          }}
        >
          {titles.map((title) => (
            <div key={title}>
              <div
                style={{
                  width: `${columnWidth}px`,
                  height: `${columnHeight}px`,
                  background: "#66ff66",
                  borderStyle: "solid",
                  borderWidth: "0 1px 0 0",
                  borderColor: "gray",
                  boxSizing: "border-box"
                }}
              >
                {title}
              </div>
            </div>
          ))}
        </div>

        <div
          ref={tableBodyRef}
          style={{
            display: "flex",
            width: `${viewportWidth}px`,
            overflow: "hidden"
          }}
        >
          {titles.map((title) => (
            <div key={title}>
              <table
                style={{
                  width: `${columnWidth}px`,
                  background: "#ff6666",
                  borderStyle: "solid",
                  borderWidth: "0 1px 0 0",
                  borderColor: "gray",
                  boxSizing: "border-box"
                }}
              >
                <tbody>
                  <tr>
                    <td>test</td>
                  </tr>
                  <tr>
                    <td>test</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Container = () => {
  const sidebarRef = useRef();
  const calendarBodyRef = useRef();
  const tableBodyRef = useRef();

  useEffect(() => {
    sidebarRef.current.addEventListener("wheel", (e) => {
      console.log("wheel sidebar!!", e.deltaY);
      e.preventDefault();
      e.stopPropagation();
      sidebarRef.current.scrollTop += e.deltaY;
      calendarBodyRef.current.scrollTop += e.deltaY;
    });
    calendarBodyRef.current.addEventListener("wheel", (e) => {
      console.log("wheel calendarBody");
      e.preventDefault();
      e.stopPropagation();
      sidebarRef.current.scrollTop += e.deltaY;
      calendarBodyRef.current.scrollTop += e.deltaY;
      tableBodyRef.current.scrollLeft += e.deltaX;
      calendarBodyRef.current.scrollLeft += e.deltaX;
    });
    tableBodyRef.current.addEventListener("wheel", (e) => {
      console.log("wheel tableBody");
      e.preventDefault();
      e.stopPropagation();
      tableBodyRef.current.scrollLeft += e.deltaX;
      calendarBodyRef.current.scrollLeft += e.deltaX;
    });
  }, []);

  return (
    <>
      <div style={{ display: "flex" }}>
        <CalendarSidebar sidebarRef={sidebarRef} />
        <Calendar
          calendarBodyRef={calendarBodyRef}
          tableBodyRef={tableBodyRef}
        />
      </div>
    </>
  );
};

export const App = () => {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Container />
    </div>
  );
};
