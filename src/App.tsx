import React, { useState } from "react";
import "./App.css";

interface Param {
  id: number;
  name: string;
  // type: ‘string’;
}
interface ParamValue {
  paramId: number;
  value: string;
}
interface Model {
  paramValues: ParamValue[];
  //  colors?: Color[];
}
interface Props {
  params: Param[];
  model: Model;
}

const params: Param[] = [
  {
    id: 1,
    name: "Назначение",
  },
  {
    id: 2,
    name: "Длина",
  },
  {
    id: 3,
    name: "Ширина",
  },
  {
    id: 4,
    name: "Вес",
  },
];

const model: Model = {
  paramValues: [
    {
      paramId: 1,
      value: "повседневное",
    },
    {
      paramId: 2,
      value: "макси",
    },
    {
      paramId: 3,
      value: "средняя",
    },
    {
      paramId: 4,
      value: "весомый",
    },
    {
      paramId: 4,
      value: "значимый",
    },
    {
      paramId: 4,
      value: "легкий",
    },
  ],
};

function App() {
  const [models, setModels] = useState<Model>(model);
  const [available, setAvailable] = useState(false);

  return (
    <div className="App d-flex flex-column align-items-center">
      <div className="d-flex flex-column align-items-center">
        {model.paramValues.map((i: ParamValue, index: number) => (
          <ItemParams
            item={i}
            index={index}
            key={index}
            setModels={setModels}
          />
        ))}
      </div>
      <button
        type="button"
        className="btn btn-outline-info"
        onClick={() => setAvailable((stat) => (stat = !stat))}
      >
        Get Model
      </button>
      {available && (
        <div className="d-flex flex-column align-items-center w-100 p-5 bg-light mt-5">
          {models.paramValues.map((i: ParamValue, index: number) => (
            <CheckListItem item={i} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}

interface ItemParamsProps {
  item: ParamValue;
  index: number;
  setModels: (val: Model) => void;
}

function ItemParams({ item, index, setModels }: ItemParamsProps) {
  const [value, setValue] = useState(item.value);
  const currentParam = params.find((i) => i.id === item.paramId);

  return (
    <div className="d-flex flex-row mb-3">
      <div style={{ width: "100px" }}>{currentParam?.name}</div>
      <input
        type="text"
        defaultValue={value}
        onChange={(ev) => {
          setValue(ev.target.value);
          model.paramValues[index].value = value;
          setModels({ paramValues: model.paramValues });
        }}
      />
    </div>
  );
}

interface CheckListItemProps {
  item: ParamValue;
}

function CheckListItem({ item }: CheckListItemProps) {
  const currentParam = params.find((i) => i.id === item.paramId);

  return (
    <div className="d-flex flex-row mb-3">
      <div style={{ width: "120px" }}>{currentParam?.name}:</div>
      <div>{item.value}</div>
    </div>
  );
}

export default App;
