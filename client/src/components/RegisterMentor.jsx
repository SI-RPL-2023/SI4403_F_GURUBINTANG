import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "./UI/Form";
import eye from '../asset/icon/eye.svg';
import eyeSlash from '../asset/icon/eye-slash.svg';
import { toast } from "react-toastify";
import LoaderCTA from "./LoaderCTA";
import { registerMentor } from "../controller/registerMentor";

const RegisterMentor = () => {
    let navigate = useNavigate()
    const [isLoad, setLoad] = useState(false)
    const [regisValue, setRegisValue] = useState({username: '', email: '', password: ''})
    const [isHidePass, setHidePass] = useState(true)
    const [isHideValidatePass, setHideValidatePass] = useState(true)
    const {username, email, password} = regisValue

    const handleChange = e => {
        setRegisValue(preValue => {
            return {
                ...preValue,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleHidePass = () => {
        setHidePass(!isHidePass)
    }

    const handleHideValidatePass = () => {
        setHideValidatePass(!isHideValidatePass)
    }

    const handleRegis = async (e) => {
        e.preventDefault()
        setLoad(true)

        const message = await registerMentor(regisValue) 
        setTimeout(() => {
                toast.success(message)
                navigate('/login/mentor')
                setLoad(false)
            }, 1500)
    }

    return (
        <Form>
            <div className="form-header">
                <h1 className="form-title">Daftar untuk Membuat Kelas Pembelajaran!</h1>
                <p className="form-redirect">Sudah punya akun? <a href="/login/mentor">Login</a></p>
            </div>
            <div className="form-box">
                <form action="" className="register__form form" onSubmit={handleRegis}>
                    <div className="input-group">
                        <label htmlFor="">Username</label>
                        <input type="text" name="username" id="username" value={username} onChange={handleChange} placeholder="Tulis username kamu disini ..." required autoComplete='off' autoFocus='on' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" value={email} onChange={handleChange} placeholder="Tulis email kamu disini ..." required autoComplete='off' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Password</label>
                        <input type={`${isHidePass ? 'password' : 'text'}`} name="password" id="password" value={password} onChange={handleChange} placeholder="Tulis password kamu disini ..." required autoComplete='off' />
                        <div className="eye-box" onClick={handleHidePass}>
                            {isHidePass ? <img src={eyeSlash} alt="" /> : <img src={eye} alt="" />}
                        </div>
                    </div>
                    {/* <div className="input-group">
                        <label htmlFor="">Tulis Ulang Password</label>
                        <input type={`${isHideValidatePass ? 'password' : 'text'}`} name="validasiPassword" id="validasiPassword" value={validasiPassword} onChange={handleChange} placeholder="Tulis ulang password kamu disini ..." autoComplete='off' />
                        <div className="eye-box"onClick={handleHideValidatePass}>
                            {isHideValidatePass ? <img src={eyeSlash} alt="" /> : <img src={eye} alt="" />}
                        </div>
                    </div> */}
                    <button type="submit" className="register__cta form-cta">
                        {isLoad ? <LoaderCTA /> : 'Sign Up'}
                    </button>
                    <div className="register__alternatif form-alternatif">
                        <div></div>
                        <p>atau</p>
                        <div></div>
                    </div>
                    <a href="/register" className="register__google form-google-cta">
                        <span>Sign Up as Mentee</span>
                    </a>
                </form>
            </div>
        </Form>
    )
}

export default RegisterMentor