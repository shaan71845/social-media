import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signIn, signInWithGoogle } from "../../actions/auth";
import { useHistory } from "react-router-dom";
import { RootState } from "../../reducers/index";
import GoogleLogin from "react-google-login";
import { ERROR, SIGN_IN } from "../../constants";
import { ToastContainer, toast, Flip } from "react-toastify";
import { clearError } from "../../actions/error";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useFormik } from "formik";
import * as yup from "yup";
import FormInput from "../../components/FormInput";

const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const error = useSelector((state: RootState) => state.error);

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("You must provide valid email")
        .required("Email is required!"),
      password: yup.string().trim().required("Password is required!"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);

      // Redirect to the Feed
      const successRedirect = () => history.push("/");

      const { email, password } = values;

      dispatch(signIn({ email, password }, successRedirect));
    },
  });

  useEffect(() => {
    // Redirect to home if the user is already logged in
    const profile = JSON.parse(localStorage.getItem("profile") || "{}");

    if (profile.token || profile.tokenId) {
      history.push("/");
    }
  }, []);

  useEffect(() => {
    // Show error if error exists for this component in the redux store.
    const showError = () => {
      toast.error(error.message, {
        transition: Flip,
      });
    };

    if (error.ON === SIGN_IN && error.message) {
      showError();
      formik.setSubmitting(false);
      dispatch(clearError());
    }
  }, [error]);

  // Google login success handler, to dispatch signInWithGoogle Action
  const onGoogleSuccess = async (res: any) => {
    const {
      profileObj: { email, imageUrl },
    } = res;

    const successRedirect = () => history.push("/");

    dispatch(signInWithGoogle(email, imageUrl, successRedirect));
  };

  const onGoogleFailure = () => {
    // Dispatch an error action on Sign in component
    dispatch({
      type: ERROR,
      payload: { ON: SIGN_IN, message: "Something went wrong!" },
    });
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-blue-50">
      <div className="p-6 rounded-lg flex sm:flex-row flex-col sm:w-full md:w-3/4">
        <div className="hero mb-6 block sm:mr-6 sm:w-full">
          <h1 className="text-fb text-4xl text-center sm:text-left sm:text-7xl font-extrabold">
            facebook
          </h1>
          <p className="text-lg text-center sm:text-left sm:text-xl my-3">
            Facebook helps you connect and share with people.
          </p>
        </div>
        <div className="login w-full sm:w-3/4 bg-white p-4 sm:p-10 rounded-lg shadow-md">
          <form onSubmit={formik.handleSubmit}>
            <FormInput
              as="normal"
              type="email"
              placeholder="Your Email"
              id="email"
              name="email"
              formik={formik}
              className="focus:ring-2 focus:ring-bg-blue-400 bg-gray-100 mb-5 w-full rounded-lg px-4 py-3 outline-none"
            />
            <FormInput
              as="password"
              type="psasword"
              placeholder="Your Password"
              id="password"
              name="password"
              formik={formik}
              className="focus:ring-2 focus:ring-bg-blue-400 bg-gray-100 mb-5 w-full rounded-lg px-4 py-3 outline-none"
            />
            <button
              type="submit"
              className="flex items-center justify-center outline-none focus:ring-4 focus:ring-blue-400 bg-fb w-full rounded-lg text-white py-2 px-4 hover:bg-blue-600"
            >
              {formik.isSubmitting && (
                <Loader type="Oval" height={20} width={20} color="#fff" />
              )}
              &nbsp; Login
            </button>
            <div className="text-center mt-3">
              <Link to="/auth/signup" className="text-fb">
                New to Facebook? Create an Account
              </Link>
            </div>
            <div className="h-1 w-full my-8 bg-gray-200"></div>
            <div className="text-center">
              <GoogleLogin
                theme="dark"
                buttonText="Sign in with Google"
                clientId={`${process.env.REACT_APP_CLIENT_ID}`}
                onSuccess={onGoogleSuccess}
                onFailure={onGoogleFailure}
              />
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
