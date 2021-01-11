import React, { useState } from "react";
import Table from "./components/Table";
import Select from "./components/Select";
import Map from "./components/Map";

import {
  routes,
  airlines,
  airports,
  getAirlineById,
  getAirportByCode,
} from "./data.js";

import "./App.css";

const App = () => {
  const [airline, setAirline] = useState("all");
  const [airport, setAirport] = useState("all");

  const formatValue = (property, value) => {
    if (property === "airline") {
      return getAirlineById(value).name;
    } else {
      return getAirportByCode(value).name;
    }
  };

  const clearFilters = () => {
    setAirline("all");
    setAirport("all");
  };

  const airlineSelected = (event) => {
    let value = event.target.value;

    if (event.target.value !== "all") {
      value = parseInt(value, 10);
    }
    setAirline(value);
  };

  const airportSelected = (event) => {
    setAirport(event.target.value);
  };

  const filteredRoutes = routes.filter((route) => {
    return (
      (route.airline === airline || airline === "all") &&
      (route.src === airport || route.dest === airport || airport === "all")
    );
  });

  const filteredAirlines = airlines.map((airline) => {
    const active = !!filteredRoutes.find(
      (route) => route.airline === airline.id
    );
    return { ...airline, active };
  });

  const filteredAirports = airports.map((airport) => {
    const active = !!filteredRoutes.find(
      (route) => route.src === airport.code || route.dest === airport.code
    );

    return { ...airport, active };
  });

  const columns = [
    { name: "Airline", property: "airline" },
    { name: "Source Airport", property: "src" },
    { name: "Destination Airport", property: "dest" },
  ];

  const defaultsSelected = airline === "all" && airport === "all";

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <Map routes={filteredRoutes}/>
        <p>
          Show routes on
          <Select
            options={filteredAirlines}
            valueKey="id"
            titleKey="name"
            allTitle="All Airlines"
            value={airline}
            onSelect={airlineSelected}
          />
          flying in or out of
          <Select
            options={filteredAirports}
            valueKey="code"
            titleKey="name"
            allTitle="All Airports"
            value={airport}
            onSelect={airportSelected}
          />
          <button onClick={clearFilters} disabled={defaultsSelected}>
            Show All Routes
          </button>
        </p>

        <Table
          className="routes-table"
          columns={columns}
          rows={filteredRoutes}
          format={formatValue}
        />
      </section>
    </div>
  );
};
export default App;
