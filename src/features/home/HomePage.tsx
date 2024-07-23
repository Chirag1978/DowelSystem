import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Button, Grid, Table, TableRow, TableHeaderCell, TableBody, TableCell, Image, Icon, Divider } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/registration/RegisterForm";
// import '../../app/common/i18n/i18n.ts'
import { useTranslation } from "react-i18next";
import "./styles.css";
import AddCustomer from "../addCustomer/AddCustomer";
import apiService from "../../app/api/apihelpers";

export default observer(function HomePage() {
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [didFetchCustomer, setDidFetchCustomer] = useState(true)
  const [editvalue, setEditValue] = useState()
  const [customerList, setCustomerList] = useState([])

  const { t } = useTranslation(['common', 'translation', "registrtion", "users"]);

  useEffect(() => {
    if (didFetchCustomer) {
      fetchCustomerList()
    }
  }, [didFetchCustomer])

  const fetchCustomerList = async () => {
    try {
      const response: any = await apiService.fetchCustomerList()
      if (response) {
        setCustomerList(customerList)
      }
    } catch (error: unknown) {
      console.log('list fetch error', error);
    }
  }

  const deleteCustomer = (id: any) => {
    try {
      const response = apiService.deleteCustomer(id)
      console.log(response);
      fetchCustomerList()

    } catch (error) {
      console.log('delete customer', error);

    }
  }

  return (
    <Container content style={{ marginTop: '7em' }}>
      <Button content="Add customer" floated="right" style={{ marginBottom: '20px' }} onClick={() => setShowAddUserModal(true)} />
      <Table padded celled>
        <TableRow textAlign="center" >
          <TableHeaderCell>First name</TableHeaderCell>
          <TableHeaderCell>Last name</TableHeaderCell>
          <TableHeaderCell>Age</TableHeaderCell>
          <TableHeaderCell>email</TableHeaderCell>
          <TableHeaderCell>Phone number</TableHeaderCell>
          <TableHeaderCell>Birthday</TableHeaderCell>
          <TableHeaderCell>Favorite color</TableHeaderCell>
          <TableHeaderCell>Photo</TableHeaderCell>
          <TableHeaderCell>Edit</TableHeaderCell>
          <TableHeaderCell>Delete</TableHeaderCell>
        </TableRow>
        <TableBody>
          {customerList && customerList.length > 0 && customerList.map((item: any) => (
            <TableRow key={item.id} textAlign="center">
              <TableCell>{item.firstName}</TableCell>
              <TableCell>{item.lastName}</TableCell>
              <TableCell>{item.age}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>{item.birthday}</TableCell>
              <TableCell>{item.favoriteColor}</TableCell>
              <TableCell><Image src={item.photoUrl} /></TableCell>
              <TableCell>
                <Button onClick={() => {
                  setEditValue(item)
                  setShowAddUserModal(true)
                }}>
                  <Icon name="edit" />
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => deleteCustomer(item.id)}
                  color="red"
                  content="X"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {showAddUserModal && <AddCustomer isOpen={showAddUserModal} editValue={editvalue} closeModal={setShowAddUserModal} fetcNewList={fetchCustomerList} />}
    </Container>
  );
});
