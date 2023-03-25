
import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
  json,
  redirect,
} from 'react-router-dom';



function Login() {
  const data = useActionData();
  const navigation = useNavigation();

  const [searchParams] = useSearchParams();
  let isLogin;
 if(searchParams.get('mode')){
   isLogin = searchParams.get('mode') === 'login';
 }else{
   isLogin =true;
 }
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="container">
      <div className='row'>
      <div className="login-form">
        <Form
          className="form-container" method="post">
          <h1 className="form-title">{isLogin?"Log in" : "Create a new user"}</h1>
          {data && data.errors && (
            <ul>
              {Object.values(data.errors).map((err) =>(
                <li key={err} className="text-danger"> {err}</li>)
              )}
            </ul>
          )}
            {data && data.message && <p className='text-danger'> {data.message}</p>}


          <div className="form-group">
          <label htmlFor='email'> Email </label>
            <input
              aria-label="Email"
              type="email"
              name="email"
              id='email'
              className="form-control"
              placeholder="Enter email"
            />
            {data && data.emailError && (
              <span className='text-danger'>
                {data.emailError}
              </span>
            )}
            
          </div>
          <div className="form-group">
         <label htmlFor='password'> Password </label>
          <input
            aria-label="Password"
            type="password"
            className="form-control"
            name="password"
            placeholder="Enter password"
            id='password'
          />
          {data && data.passwordError && (
              <span className='text-danger'>
                {data.passwordError}
              </span>
            )}
</div>


          <button
            type="submit" disabled={isSubmitting}
            style={{margin:"20px 0"}}
            className="btn btn-dark btn-block"

          >
            {isSubmitting?"Submitting.." :"Submit"}
          </button>
          <div>

            <Link className="text-dark" to={`?mode=${isLogin ? 'signup':'login'} `}>
              {isLogin ? 'Create an Account' : 'Login Here'}
            </Link>
          </div>
        </Form>
      </div>
   </div>
    </div>
  );
}

export default Login;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  if (mode !== 'login' && mode !== 'signup') {
    throw json({ message: 'Unsupported mode.' }, { status: 422 });
  }

  const data = await request.formData();
  let errors ={};

  // Email and password validation
  const email = data.get('email');
  const password = data.get('password');

  if (!email && !password) {
    errors.emailError = errors.passwordError='Email and password are required';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.emailError =
      "That doesn't look like an email address";
  }

 if (password.length < 6) {
    errors.passwordError='Password must be at least 8 characters long';
  }
 // return data if we have errors
  if (Object.keys(errors).length) {
    return errors;
  }

  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };
 //const url = 'https://node-cart-backend.onrender.com/';http://localhost:8080/
  const response = await fetch('https://node-cart-backend.onrender.com/' + mode, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not authenticate user.' }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem('token', token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('expiration', expiration.toISOString());

  return redirect('/');
}

export function logoutAction() {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
  return redirect('/Login?mode=login');
}
