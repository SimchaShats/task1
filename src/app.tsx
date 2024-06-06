import React, { useState } from "react";
import "./app.css";
import { useGetCocktailsQuery } from "./services/cocktails.service";
import { Spin, Input, Space } from "antd";
import CocktailsCard from "./cocktail-card";

function App() {
  const [search, setSearch] = useState("");

  const {
    data: cocktails,
    isLoading,
    isFetching,
  } = useGetCocktailsQuery(search);

  return (
    <div className="app">
      <Space direction="vertical">
        <Input.Search placeholder="Search Cocktail" onSearch={setSearch} />
        <div className="gallery">
          <Spin tip="Loading" size="large" spinning={isFetching || isLoading}>
            <CocktailsCard cocktails={cocktails} />
          </Spin>
        </div>
      </Space>
    </div>
  );
}

export default App;
