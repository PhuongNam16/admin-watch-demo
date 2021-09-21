import React from 'react';
import {useDispatch} from 'react-redux';
import {AUTHENTICATION} from '../../redux/reducers/authenReducer';
import NavbarHeader from '../header/NavbarHeader';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import './login.css';
import { useHistory } from "react-router-dom";
import { authentication } from '../../services';
import { setToken } from '../../utils/utils';
const Login = () => {
  let history = useHistory();
  

  const dispatch = useDispatch ();
  const formik = useFormik ({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object ({
      username: Yup.string ()
        .max (15, 'Must be 15 characters or less')
        .required ('Required'),
      password: Yup.string ()
        .max (20, 'Must be 20 characters or less')
        .required ('Required'),
    }),
    onSubmit: values => {
      // dispatch (AUTHENTICATION (values));
      authentication(values).then((response) => {
        if(response.status === 200){
          // console.log("thành công",response.data);
          alert(response.data.message)
          history.push("/AdminProduct");
          setToken(response.data.accessToken)
        }else{
          alert(response.data.message)
        }
      }).catch((err) => {
        console.log("thất bại", err)
      })
    },
  });
  return (
    <div>
      {/* <NavbarHeader /> */}
      <div id="login">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto py-4 px-0">
              <div className="card p-0">
                <div className="card-title text-center">
                  <h5 className="mt-5">LOGIN</h5>
                  {' '}
                  <small className="para">
                    Login to your cool account below.
                  </small>
                </div>
                <div className="signup">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="Username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                      />
                      {formik.touched.username && formik.errors.username
                        ? <p style={{color: 'red'}}>{formik.errors.username}</p>
                        : null}
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                       {formik.touched.password && formik.errors.password
                        ? <p style={{color: 'red'}}>{formik.errors.password}</p>
                        : null}
                    </div>
                    {' '}
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                  </form>
                  <div className="row">
                    <div className="col-6 col-sm-6">
                      {' '}<a href="#">
                        <p className="text-left pt-2 ml-1">Forgot password?</p>
                      </a>{' '}
                    </div>
                    <div className="col-6 col-sm-6">
                      {' '}<a href="#">
                        <p className="text-right pt-2 mr-1">Sign Up Now</p>
                      </a>{' '}
                    </div>
                  </div>
                  {' '}
                  <span className="text-center">Or</span>
                  <hr width="100%" align="center" />
                  <span className="text-center pt-3">Login Using</span>
                  <div className="row">
                    <div className="d-flex mx-auto pt-1 pb-3 justify-content-center">
                      {' '}
                      <a href="#">
                        <i className="btn-social fab fa-facebook" />
                      </a>
                      {' '}
                      <a href="#">
                        <i className="btn-social fab fa-twitter" />
                      </a>
                      {' '}
                      <a href="#">
                        <i className="btn-social fab fa-linkedin" />
                      </a>
                      {' '}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
