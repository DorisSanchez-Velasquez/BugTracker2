import MaterialTable from "material-table";
import { Link } from "react-router-dom"

const handleOnRowClick = (e) => {
  console.log("Clicked on row!")
}

const data = [
  { name: "Mohammad", surname: "Faisal", birthYear: 1995 },
  { name: "Nayeem Raihan ", surname: "Shuvo", birthYear: 1994 },
];

const columns = [
  { title: "Name", field: "name" },
  { title: "Surname", field: "surname" },
  { title: "Birth Year", field: "birthYear", type: "numeric" },
];

export const BasicTable = () => {
  return <MaterialTable title="Basic Table" columns={columns} data={data} onRowClick={handleOnRowClick} />;
};