import { useState, useRef } from 'react';
import styles from './EmployersBody.module.css';
import axios from 'axios'
import { ModalPage } from '../Modal/Modal';
import AddCompany from '../company/AddCompany';

export function EmployersBody() {

    const [data, setData] = useState({});
    const [fileName, setFileName] = useState("");
    const logoRef = useRef();
    const [modalStatus, setModalStatus] = useState({
        isOpen: false,
        messege: ""
    });

    const handleHideModal = () => {
        setTimeout(() => {
            setModalStatus({...modalStatus, isOpen: false, messege: ""});
        },3000)
    }

    const extractValue = (str) => {
        let idx = 0;
        for (let i = str.length - 1; i >= 0; i--) {
            if (str[i] === "\\") {
                idx = i;
                break;
            }
        }

        return str.slice(idx + 1);
    }

    function handleChange(e) {
        var { name, value } = e.target;

        if (name === "name") {
            value = value[0].toUpperCase() + value.substring(1);
        }

        if (name === "logo") {
            setFileName(extractValue(value));
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);

            reader.onload = (e) => {
                setData({ ...data, [name]: e.target.result })
                return;
            }
        }

        setData({ ...data, [name]: value });
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const getRating = () => {
            let rating = 0;
            while (rating < 3) {
                rating = (Math.random() * 5).toFixed(1);
            }

            return rating;
        }

        data.rating = getRating();

        if (data.logo === undefined) {
            data.logo = "https://img.icons8.com/ios-glyphs/90/000000/organization.png";
        }


        axios.post("http://localhost:8080/api/v1/company/add-company", data).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })

        setModalStatus({...modalStatus, isOpen: true, messege: "Company registered successfully!"});
        handleHideModal();
    }

    return (
        <div>
            <ModalPage isOpen={modalStatus.isOpen} messege={modalStatus.messege} />
            <div className={styles.body_top}>

            </div>
                <AddCompany/>
            
        </div>
    )
}