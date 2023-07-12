/* eslint-disable @typescript-eslint/no-floating-promises */
import { Button, Form, Input, Select, message } from "antd";
import React, { useState } from "react";
import { statesInIndia } from "../utils/constants";
import { AddressFormType, addressForm } from "../types/inteface";
import { useAppDispatch, useAppSelector } from "../redux/store/store";
import { updateAddress } from "../redux/reducers/getAddress";
import { useNavigate } from "react-router-dom";
import { removeItemsFromCart } from "../redux/reducers/cartItems";
import { addItemsToOrderedCart } from "../redux/reducers/orderedItems";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const AddressForm: React.FC<AddressFormType> = ({ meal, isCart }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const address = useAppSelector((state) => state.getAddress.address);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (addressDetails: addressForm) => {
    setLoading(true);
    // updating the address details
    dispatch(updateAddress(addressDetails));
    // removing from cart
    if (isCart) {
      // removing all products in the cart & include it in the ordered page cart
      dispatch(removeItemsFromCart(meal.map((item) => item.idMeal)));
      dispatch(
        addItemsToOrderedCart(
          meal.map((item) => {
            return { ...item, ...addressDetails };
          })
        )
      );
    } else {
      // remove only the individual product
      dispatch(removeItemsFromCart(meal[0].idMeal));
      dispatch(addItemsToOrderedCart({ ...meal[0], ...addressDetails }));
    }

    // success message
    setTimeout(() => {
      messageApi.open({
        type: "success",
        content: `${meal[0]?.strMeal} is successfully ordered..!`,
      });
    }, 1000);

    // Added Loader for simulating realisitic async actions
    setTimeout(() => {
      setLoading(false);
      navigate("/orders");
    }, 1500);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="91">+91</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className="w-full mt-6 grid place-content-center">
      {contextHolder}
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          ...address,
          prefix: address.prefix || "91",
        }}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item
          name="Name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please enter your name!",
            },
          ]}
        >
          <Input placeholder="Please enter your name" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            { required: true, message: "Please enter your phone number!" },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{ width: "100%" }}
            placeholder="Please enter your phone number"
          />
        </Form.Item>

        <Form.Item
          name="Address"
          label="Address"
          rules={[{ required: true, message: "Please enter your address" }]}
        >
          <Input.TextArea
            placeholder="Please enter your address"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="city"
          label="City"
          rules={[{ required: true, message: "Please enter your city!" }]}
        >
          <Input
            placeholder="Please enter your city"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="state"
          label="State"
          rules={[{ required: true, message: "Please select state!" }]}
        >
          <Select placeholder="select your state" showSearch>
            {statesInIndia.map((state) => (
              <Option value={state} key={state}>
                {state}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item className="flex justify-end">
          <Button type="primary" htmlType="submit" loading={loading}>
            Save & Checkout
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddressForm;
