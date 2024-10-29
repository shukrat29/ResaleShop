import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash, FaAdd } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetProductsQuery,
  useAddProductMutation,
} from "../../slices/productsApiSlice";
import { toast } from "react-toastify";

const ProductListPage = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();

  const [addProduct, { isLoading: addProductLoading }] =
    useAddProductMutation();

  const deleteProductHandler = (id) => {
    console.log("deleted product", id);
  };

  const addProductHandler = async () => {
    if (window.confirm("Are you sure you want to add a new product"))
      try {
        await addProduct();
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={addProductHandler}>
            <FaEdit /> Add Product
          </Button>
        </Col>
      </Row>
      {addProductLoading && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>EDIT</th>
                <th>REMOVE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteProductHandler(product._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ProductListPage;
