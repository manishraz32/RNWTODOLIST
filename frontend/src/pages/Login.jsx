import { useState } from 'react'
import useLogin from '../hooks/useLogin';

const Login = () => {
  const { login } = useLogin();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const handleChange = (e) => {
    console.log("e-target", e.target);
    const { name, value } = e.target;
    console.log("name value", name , " ", value);
    // Update the state with new value
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData", formData);
    await login(formData);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 w-full flex justify-center items-center px-4">
      <div className="flex flex-col items-center justify-center mx-auto lg:py-0">

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login To Account
            </h1>
            <form className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit} 
            >
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required=""
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >Login</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account? <a href="/signup" className="font-medium text-blue-600 hover:underline dark:text-primary-500">Sign up here</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login