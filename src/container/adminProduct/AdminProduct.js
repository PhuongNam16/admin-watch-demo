import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import NavbarHeader from '../../components/header/NavbarHeader';
import {DELETE_PRODUCT, LOAD_MORE, SEARCHPRODUCT } from '../../redux/reducers/productReducer';
import { addProduct, deleteProduct, editProduct, getProductById } from '../../services';
import './adminproduct.css';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import numeral from 'numeral';
import { CSVLink } from "react-csv";

const AdminProduct = () => {
  const dispatch = useDispatch ();
  const listProducts = useSelector(state => state?.productReducer?.listProducts);
  const loading = useSelector(state => state?.productReducer?.isloading);
  useEffect(() => {
    dispatch(LOAD_MORE({page: page ,limit : limit}))
  }, []);
  const [productEdit, setProductEdit] = useState({});
  const [searchProduct, setSearchProduct] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const changeTitle =(e)=>{
    setSearchProduct(e.target.value);
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseEdit = ()=>setShowEdit(false);
  const handleShowEdit = ()=>setShowEdit(true);

  const formik = useFormik({
     initialValues: {
      name: productEdit? productEdit.name : "",
      image: '',
      price: '',
      amount: '',
      
     },
     validationSchema: Yup.object ({
      name: Yup.string ()
        .max (50, 'Must be 20 characters or less')
        .required ('Required'),
        image: Yup.string ()
        .max (255, 'Must be 20 characters or less')
        .required ('Required')
        .matches(
          /^[0-9]+$/,
          'Cannot contain special characters or spaces'
        ),
        price: Yup.string ()
        .max (15, 'Must be 20 characters or less')
        .required ('Required')
        .matches(/^[0-9]+$/, 'nhập số'),
        amount: Yup.string ()
        .max (10, 'Must be 20 characters or less')
        .required ('Required'),
    }),
     onSubmit: values => {
        addProduct(values).then((response) => {
          console.log("thành công" , response.data);
          // dispatch(ADD_PRODUCT(response.data.data))
        }).catch((err) => {
          console.log("thất bại",err)
        })
      },
      // onSubmitEdit: values => {
        // editProduct(values).then((response) => {
        //   console.log("thành công" , response.data);
        //   // dispatch(EDIT_PRODUCT(response.data.data))
        // }).catch((err) => {
        //   console.log("thất bại",err)
        // })
      // }
   });
   const loadMore = () => {
    dispatch(LOAD_MORE({page: page + 1 ,limit : limit}))
    }

    const onClickEditProduct = (_id) => {
      editProduct(_id).then((response) => {
      alert("update thành công")
        // console.log("thành công" , response.data);
      }).catch((err) => {
        console.log("thất bại",err)
      })
    }

  const onClickById = (_id) => {
    getProductById(_id).then((response) => {
      console.log(typeof response.data);
      setProductEdit(response.data);
      console.log("thành công gọi name" ,productEdit);
    }).catch((err) => {
      console.log("thất bại",err)
    })
  }
  return (
    <div>
      <NavbarHeader />
      <div className="container">
        <div className="row">
          <div className="box-right col-md-12 p-4 mx-auto py-4 px-0 text-center mt-4">
            <div className="header-content ">
              <h3>View Product</h3>
              <div className="search-product ">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search product"
                    onChange={changeTitle}
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button" onClick={()=> dispatch(SEARCHPRODUCT({name: searchProduct}))}>
                      <i className="fa fa-search" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Button Modal */}
            <Button variant="primary" className="mt-4"onClick={handleShow}>
             Thêm sản phẩm
            </Button>
            <CSVLink
              data={listProducts}
              filename={"list-product.csv"}
              asyncOnClick={true}
              className="btn btn-success mt-4"
            >
              Download CSV
            </CSVLink>
              <Modal show={show} onHide={handleClose}>
                <form onSubmit={formik.handleSubmit}>
                  <Modal.Header closeButton>
                    <Modal.Title>Thêm sản phẩm</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div>
                      <div className="box">
                        <div className="form-group">
                          <input
                            type="text"
                            name= "name"
                            className="form-control"
                            placeholder="Enter name product"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                          />
                          {formik.touched.name && formik.errors.name
                                ? <p style={{color: 'red'}}>{formik.errors.name}</p>
                                : null}
                        </div>
                        <div className="input-group mb-3">
                          <input 
                            type="text" 
                            name ="image"
                            className="form-control" 
                            placeholder="Enter image product"
                            onChange={formik.handleChange}
                            value={formik.values.image}
                          />
                          {formik.touched.image && formik.errors.image
                                ? <p style={{color: 'red'}}>{formik.errors.image}</p>
                                : null}
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            name = "price"
                            className="form-control"
                            placeholder="Enter price"
                            onChange={formik.handleChange}
                            value={formik.values.price}
                          />
                          {formik.touched.price && formik.errors.price
                                ? <p style={{color: 'red'}}>{formik.errors.price}</p>
                                : null}
                        </div>
                        <div className="form-group">
                          <input
                            type="number"
                            name = "amount"
                            className="form-control"
                            placeholder="Enter amount"
                            onChange={formik.handleChange}
                            value={formik.values.amount}
                          />
                          {formik.touched.amount && formik.errors.amount
                                ? <p style={{color: 'red'}}>{formik.errors.amount}</p>
                                : null}
                        </div>
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Đóng
                    </Button>
                    <Button variant="primary" type = "submit" onClick={handleClose}>
                      Thêm sản phẩm
                    </Button>
                  </Modal.Footer>
                </form>
              </Modal>

              <Modal show={showEdit} onHide={handleCloseEdit}>
                <form onSubmit={formik.handleSubmit}>
                    <Modal.Header closeButton>
                      <Modal.Title>Sửa sản phẩm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div>
                        <div className="box">
                          <div className="form-group">
                            <input
                              type="text"
                              name= "name"
                              className="form-control"
                              placeholder="Enter name product"
                              onChange={formik.handleChange}
                              value={formik.values.name}
                            />
                            {formik.touched.name && formik.errors.name
                               ? <p style={{color: 'red'}}>{formik.errors.name}</p>
                               : null}
                            </div>
                            <div className="input-group mb-3">
                              <input 
                                type="text" 
                                name ="image"
                                className="form-control" 
                                placeholder="Enter image product"
                                onChange={formik.handleChange}
                                value={formik.values.image}
                              />
                              {formik.touched.image && formik.errors.image
                                  ? <p style={{color: 'red'}}>{formik.errors.image}</p>
                                  : null}
                            </div>
                            <div className="form-group">
                              <input
                                type="text"
                                name = "price"
                                className="form-control"
                                placeholder="Enter price"
                                onChange={formik.handleChange}
                                value={formik.values.price}
                              />
                              {formik.touched.price && formik.errors.price
                                ? <p style={{color: 'red'}}>{formik.errors.price}</p>
                                : null}
                            </div>
                            <div className="form-group">
                              <input
                                type="text"
                                name = "amount"
                                className="form-control"
                                placeholder="Enter amount"
                                onChange={formik.handleChange}
                                value={formik.values.amount}
                              />
                              {formik.touched.amount && formik.errors.amount
                                ? <p style={{color: 'red'}}>{formik.errors.amount}</p>
                                : null}
                            </div>
                          </div>
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseEdit}>
                            Đóng
                        </Button>
                        <Button variant="primary" type = "submit" onClick={onClickEditProduct, handleCloseEdit}>Lưu</Button>
                      </Modal.Footer>
                  </form>
              </Modal>
            <div className="group-view-product mt-4">
              <div class="table-responsive table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl table-responsive-xxl">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">STT</th>
                      <th scope="col" style = {{width: "100px"}}>Tên SP</th>
                      <th scope="col">Ảnh SP</th>
                      <th scope="col">SL</th>
                      <th scope="col">Giá</th>
                      <th scope="col">Chức Năng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listProducts?.map((product, index) => (
                      <tr key={product._id}>
                        <th scope="row">{index+1}</th>
                          <td>{product.name}</td>
                          <td>
                            <img 
                              src={product.image}
                              style={{width: '70px', height: '70px'}}
                            />
                          </td>
                          <td>{product.amount}</td>
                          <td>{numeral(product.price).format("0,0") }</td>
                          <td>
                          <Button variant="danger" className="m-2" onClick={() => {
                             deleteProduct(product._id).then((response) => {
                              console.log("thành công" , response.data);
                              alert("Xóa thành công")
                              dispatch(DELETE_PRODUCT(product._id))
                            }).catch((err) => {
                              console.log("thất bại",err)
                            console.log("xóa", product._id)
                            })
                            
                          }}>
                          Xóa
                          </Button>
                          
                          <Button variant="primary" onClick={()=> {
                            onClickById(product._id);
                            handleShowEdit()
                          }}>
                              Sửa
                          </Button>
                          
                          </td>
                      </tr>))
                    }
                  </tbody>
                </table>
              </div>
            </div>
            <Button variant="primary" className="btn btn-primary m-4 btn-loadmore" onClick={
              ()=> loadMore()}> {loading === true ? <div className="loader"></div> : <span>Xem Thêm</span>}
              </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminProduct;