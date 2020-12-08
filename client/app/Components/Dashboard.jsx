import React, { useEffect, useState, useLayoutEffect } from "react";
import { View } from "react-native";
import { DataTable } from "react-native-paper";
import axios from "axios";

function Dashboard({ navigation }) {
  useEffect(() => {
    navigation.openDrawer();
  }, []);

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);

  const TableHeaders = () => (
    <DataTable.Header>
      <DataTable.Title>Name</DataTable.Title>
      <DataTable.Title>Age</DataTable.Title>
      <DataTable.Title>Gender</DataTable.Title>
      <DataTable.Title>Email</DataTable.Title>
      <DataTable.Title>Latitude</DataTable.Title>
      <DataTable.Title>Longitude</DataTable.Title>
    </DataTable.Header>
  );

  const TableRow = ({ user }) => (
    <DataTable.Row>
      <DataTable.Cell>{user.name}</DataTable.Cell>
      <DataTable.Cell>{user.age}</DataTable.Cell>
      <DataTable.Cell>{user.gender}</DataTable.Cell>
      <DataTable.Cell>{user.email}</DataTable.Cell>
      <DataTable.Cell>{user.latlng ? user.latlng.y : "N.A"}</DataTable.Cell>
      <DataTable.Cell>{user.latlng ? user.latlng.x : "N.A"}</DataTable.Cell>
    </DataTable.Row>
  );

  const TablePagination = () => (
    <DataTable.Pagination
      numberOfPages={total / 20}
      page={page}
      onPageChange={(page) => setPage(page)}
      label={`${(page - 1) * 20 + 1}-${
        total < page * 20 ? total : page * 20
      } of ${total}`}
    />
  );

  useLayoutEffect(() => {
    axios
      .get("http://localhost:8000/users", { params: { page } })
      .then((res) => {
        // console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, [page]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/users/count")
      .then((res) => {
        setTotal(res.data[0].count);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <View>
      <DataTable>
        <TableHeaders />
        {users.length > 0 &&
          users.map((user) => <TableRow user={user} key={user.id} />)}
        <TablePagination />
      </DataTable>
    </View>
  );
}

export default Dashboard;
