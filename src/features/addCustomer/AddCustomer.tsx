import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Button, Container, Form, FormField, FormGroup, Input, Message, Modal, ModalHeader } from "semantic-ui-react";
import { formValidation } from "../../app/common/util/helpers";
import apiService from "../../app/api/apihelpers";
const AddCustomer = ({ isOpen, editValue = {}, closeModal, fetcNewList }: any) => {
    const [formData, setFormData] = useState<any>({
        firstName: '',
        lastName: '',
        age: '',
        email: '',
        phoneNumber: '',
        birthday: '',
        favoriteColor: '',
        photoUrl: ''
    });

    const [errors, setErrors] = useState<any>({});

    useEffect(() => {
        if (Object.keys(editValue).length > 0) {
            const data = editValue
            delete data.id
            setFormData({...data})
        }
    }, [editValue])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, { name, value }: any) => {
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: null });
    };

    const handleSubmit = () => {
        const formErrors = formValidation(formData);

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            console.log(formData);
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }
            try {
                const res: any = Object.keys(editValue).length > 0 ? apiService.updateCustomer(formDataToSend) : apiService.addCustomer(formDataToSend)
                fetcNewList()
                setFormData({ firstName: '', lastName: '', age: '', email: '', phoneNumber: '', birthday: '', favoriteColor: '', photoUrl: '' });
                setErrors({});
                closeModal(true)
            } catch (error) {
                console.log('add customer error', error);
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({ ...formData, photoUrl: file.name });
        }
    };

    return (
        <Modal
            onClose={() => closeModal(false)}
            onOpen={() => { }}
            open={isOpen}
            trigger={<Button>Show Modal</Button>}
        >
            <Container fluid style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between', padding: '10px' }} >
                <ModalHeader>Add new customer</ModalHeader>
                <Button
                    onClick={() => closeModal(false)}
                    color="red"
                    content="X"
                />
            </Container>
            <Form widths="equal" style={{ padding: '10px' }} type="submit">
                <FormGroup>
                    <Form.Field
                        control={Form.Input}
                        label="Name"
                        placeholder="Enter your name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />

                    <Form.Field
                        control={Form.Input}
                        label="Last name"
                        placeholder="Enter your name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        error={errors.lastName ? { content: errors.lastName } : null}
                    />
                </FormGroup>
                <FormGroup>
                    <Form.Field
                        control={Form.Input}
                        label="Age"
                        placeholder="Enter your age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                    />

                    <Form.Field
                        control={Form.Input}
                        label="Email"
                        placeholder="Enter your email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Form.Field
                        control={Form.Input}
                        label="Phone number"
                        placeholder="Enter your number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        error={errors.phoneNumber ? { content: errors.phoneNumber } : null}
                    />

                    <Form.Field
                        control={Form.Input}
                        label="Birth Date"
                        placeholder="Enter your birth date"
                        name="birthday"
                        value={formData.birthday}
                        type="date"
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Form.Field
                        control={Form.Input}
                        label="favoriteColor"
                        placeholder="Enter your Favorite color"
                        name="favoriteColor"
                        value={formData.favoriteColor}
                        onChange={handleChange}
                    />
                    <Form.Field
                        control={Form.Input}
                        type="file"
                        label="Photo"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </FormGroup>
                <Button type="submit" primary onClick={handleSubmit}>Submit</Button>
                {Object.keys(errors).length > 0 && (
                    <Message
                        error
                        header="Complete Required fields"
                        list={Object.values(errors)}
                    />
                )}
            </Form>
        </Modal>
    )
}
export default AddCustomer