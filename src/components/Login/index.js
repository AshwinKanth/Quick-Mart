import { Component } from "react";
import { Redirect } from "react-router-dom"; 
import Cookies from "js-cookie";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

import "./index.css"

class Login extends Component {
    state = { username: '', password: '', passwordVisible: false,  showSubmitError: false, errorMsg: '', }

    onClickShowPassword = () => {
        this.setState(prevState => ({ passwordVisible: !prevState.passwordVisible }))
    }

    onChangeUsername = (event) => {
        this.setState({ username: event.target.value })
    }

    onChangePassword = (event) => {
        this.setState({ password: event.target.value })
    }

    onSubmitSuccess = jwtToken => {
        Cookies.set('jwt_token', jwtToken, {expires: 30})
        const {history} = this.props
        history.replace('/')
      }

      onSubmitFailure = errorMsg => {
        this.setState({showSubmitError: true, errorMsg})
      }

    onSubmitLoginForm = async (event) => {
        event.preventDefault()

        const { username, password } = this.state
        const userDetails = { username, password }

        const url = 'https://apis.ccbp.in/login'
        const options = {
            method: 'POST',
            body: JSON.stringify(userDetails)
        }

        const response = await fetch(url, options)
        const data = await response.json()

        if (response.ok === true) {
            this.onSubmitSuccess(data.jwt_token)
          } else {
            this.onSubmitFailure(data.error_msg)
          }
    }

    render() {
        const { username, password, passwordVisible,showSubmitError,errorMsg } = this.state

        const jwtToken = Cookies.get('jwt_token')
    
        if (jwtToken !== undefined) {
          return <Redirect to="/" />
        }

        return (
            <div className="login-container">
                <img
                    src="https://res.cloudinary.com/dq1ktqbtb/image/upload/v1730715486/Quick_Mart_Logo_k3ztfu.png"
                    alt="appLogo"
                    className="loginLogo"
                />
                <div className="loginCard-container">
                    <h2 className="loginHeading">Login</h2>
                    <form onSubmit={this.onSubmitLoginForm}>
                        <div className="form-group">
                            <label className="label" htmlFor="username">Username</label>
                            <input
                                className="input"
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={this.onChangeUsername}
                                placeholder="Enter your username"
                            />
                        </div>
                        <div className="form-group password-group">
                            <label className="label" htmlFor="password">Password</label>
                            <div className="password-input">
                                <input
                                    className="input"
                                    type={passwordVisible ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={this.onChangePassword}
                                    placeholder="Enter your password"
                                />
                                <span
                                    className="toggle-password"
                                    onClick={this.onClickShowPassword}
                                >
                                    {passwordVisible ? (
                                        <IoIosEyeOff />
                                    ) : (
                                        <IoIosEye />
                                    )}
                                </span>
                            </div>
                        </div>
                        <button type="submit" className="btn">
                            Login
                        </button>
                        {showSubmitError && <p className="err-msg">*{errorMsg}</p>}
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;