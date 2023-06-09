import React from 'react';
import success from '../asset/images/payment_success.png';
import icon_success from '../asset/icon/icon_success.svg';
import { useParams } from 'react-router-dom';

const SuccessPayment = ({cookies}) => {
    const {id_user, id_kelas} = useParams()

    return (
        <div className="success-payment">
            <div className="success__container">
                <div className="success__banner">
                    <img src={success} alt="" className='success__kelas' />
                    <img src={icon_success} alt="" className='success__icon' />
                </div>
                <h1 className="success__title">Pembelian Kelas ini Berhasil!</h1>
                <h2 className="success__subtitle">Kamu telah berhasil melakukan pembelian. Selamat belajar dan tetap semangat. Mulai belajar sekarang!</h2>
                <div className="success__cta-box">
                    <a href={`/materi/${id_user}/${id_kelas}`} className="success__cta-primary">Mulai Belajar</a>
                    <a href={`/user/transaksi/${id_user}`} className="success__cta-secondary">Lihat Detail Transaksi</a>
                </div>
            </div>
        </div>
    )
}

export default SuccessPayment