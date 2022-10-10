import React from "react";
import "bulma/css/bulma.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from 'react'

const Modal = ({ open, onClose, title, frases, setFrases, res, setres, nq, setloading, setdata }) => {

    const fetchdata = async () => {
        const res = await axios.get("http://localhost:5000/data")
        setdata(res.data.intents)
    };

    const addFields = () => {
        let newfield = ""
        handleInputChange([...frases, newfield])
    }

    const handleFormChange = (index, event) => {
        let data = [...frases];
        data[index] = event.target.value;
        handleInputChange(data);
    }

    const removeFields = (index) => {
        let data = [...frases];
        data.splice(index, 1)
        handleInputChange(data);
    }

    const handleInputChange = useCallback(event => {
        setFrases(event)
    }, [setFrases])


    const handleFormChange2 = (event) => {
        let data = [...res];
        data = event.target.value;
        handleInputChange2(data);
    }


    const handleInputChange2 = useCallback(event => {
        setres(event)
    }, [setres])



    const fetchdata2 = async (nq, frases, res) => {
        const res2 = await axios.post(`http://localhost:5000/edit`, { id: nq, name: title, traning: frases, newmsg: [res] });
    };

    const handleSave = () => {
        setloading(true)
        fetchdata2(nq, frases, res).then(() => {
            onClose()
            setTimeout(() => {
                fetchdata().then(() => {
                    setTimeout(() => {
                        fetchdata().then(() => {
                            setloading(false)
                        })
                    }, 11000)
                })
            }, 11000)

        })
    }

    if (!open) return null;
    return (
        <div className={`modal is-active`}>
            <div className="modal-background" />
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title has-text-weight-semibold is-family-monospace">{title}</p>
                    <button
                        className="delete"
                        aria-label="close"
                        onClick={onClose}
                    />
                </header>
                <section className="modal-card-body">

                    <div className="modaler">
                        <div className="fasesmodal">
                            <label className="label">Frases de Entrenamiento </label>
                            {
                                frases.map((frase, index) => (
                                    <div className="traning">
                                        <div className="deleteicon">
                                            <FontAwesomeIcon key={index} icon={faTrash} onClick={e => removeFields(index)} />
                                        </div>
                                        <input key={index} className="input" type="text" value={frase} onChange={event => handleFormChange(index, event)} />
                                    </div>
                                ))
                            }

                            <div className="addFases ">
                                <FontAwesomeIcon icon={faCirclePlus} onClick={addFields} />
                            </div>

                        </div>
                        <div>
                            <label className="label">Definición</label>
                            <textarea className="textarea" placeholder="10 lines of textarea" value={res} rows="10" onChange={event => handleFormChange2(event)}></textarea>
                        </div>

                    </div>


                </section>
                <footer className="modal-card-foot">
                    <button className="button is-success" onClick={handleSave}>Guardar</button>
                    <button className="button" onClick={onClose}>
                        Cancel
                    </button>
                </footer>
            </div>
        </div>
    );
}

export default Modal