
import React, { Component } from 'react';

import { useEffect, useState } from 'react';
import "bulma/css/bulma.css";
import './App.css';
import './floatinc.css'
import axios from 'axios'
import Modal from './components/Modal'
import ModalCreate from './components/ModalCreate'

import { Helmet } from "react-helmet";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPenSquare } from '@fortawesome/free-solid-svg-icons'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Intents } from "./users"
import Spiner from './components/Spiner'





function App() {

  const [query, setQuery] = useState("")

  const [data, setdata] = useState([])
  const [openModal, setOpenModal] = useState(false)

  const [openModal2, setOpenModal2] = useState(false)
  const [nq, setnq] = useState(-1)

  const [traningFrases, setTraning] = useState([])
  const [traningFrases2, setTraning2] = useState(["", ""])
  const [responses, setResponses] = useState([])
  const [responses2, setResponses2] = useState([])

  const [Loading, setloading] = useState(false);

  const step = 12
  const [leftptr, setleftptr] = useState(0);
  const [rtptr, setrtptr] = useState(step);

  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get("http://localhost:5000/data")
      setdata(res.data.pets)
    };
    setloading(true)
    fetchdata().then(() => {
      setTimeout(() => {
        setloading(false)
      }, 1000)
    })
  }, [])

  useEffect(() => {

  }, [data])


  const fetchdata = async () => {
    const res = await axios.get("http://localhost:5000/data")
    setdata(res.data.intents)
  };

  const fetchdata2 = async () => {

    const res2 = await axios.post(`http://localhost:5000/traningFrases`, { id: nq });
    setTraning(res2.data)

  };

  const fetchdata3 = async () => {

    const res3 = await axios.post(`http://localhost:5000/responses`, { id: nq });
    setResponses(res3.data)

  };

  const postdel = async (idel) => {
    const res4 = await axios.post(`http://localhost:5000/delete`, { id: idel });
  }

  useEffect(() => {
    if (nq > -1) {
      fetchdata3().then(() => {
        fetchdata2()
      }

      )
    }
  }, [nq])

  useEffect(() => {
  }, [leftptr])

  useEffect(() => {
    if (nq > -1) {

      setTimeout(() => {
        setOpenModal(true)
        setloading(false)
        console.log("yeahhhh")
        console.log(handleloading())
      }, 500)

    }
  }, [traningFrases])



  useEffect(() => {
    if (nq > -1) {
      console.log("yeahhhh2")
    }
  }, [responses])



  let info = 0

  const handleClik = (e) => {
    setloading(true)
    setnq(e.currentTarget.id)
  }

  const handleClikclose = (e) => {
    setOpenModal(e)
    setnq(-1)
  }

  const handleClikclose2 = (e) => {
    setOpenModal2(e)
  }

  const handlesearch = (e) => {
    setQuery(e)
    setrtptr(step)
    setleftptr(0)
  }



  function handleloading() {
    if (nq != -1) {
      if (data != [])
        return data[nq].name
      else {
        return "Loading...."
      }
    } else {
      return "No Data"
    }
  }

  //Pointers search

  const handlerpointer = (e) => {

    if (data.filter((intent) => intent.name.toLowerCase().includes(query.toLowerCase())).length + step < rtptr) {

    } else {
      setrtptr(rtptr + step)
      setleftptr(leftptr + step)
    }

  }
  const handlerleftptr = (e) => {

    if (leftptr == 0) {
      setrtptr(step)
      setleftptr(0)
    } else {
      setrtptr(rtptr - step)
      setleftptr(leftptr - step)
    }

  }
  ///the inputs

  const handledel = (e) => {
    let idx = e.currentTarget.id
    console.log(e.currentTarget.id)
    console.log(data[idx].id)
    setloading(true)
    postdel(data[idx].id).then(() => {
      setTimeout(() => {
        fetchdata()
      }, 4000)
      setTimeout(() => {
        fetchdata().then(() => {
          setloading(false)
        })
      }, 4000)
    })

  }

  const handleCreate = (e) => {
    setResponses2("")
    setTraning2(["", ""])
    setOpenModal2(true)
  }
  useEffect(() => {
  }, [responses2])
  useEffect(() => {

  }, [traningFrases2])

  return (
    <div className="app">
      <nav className="navbar  bg" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item bg has-text-weight-semibold is-family-monospace is-size-4" >
            PRODAN DASH UI
          </a>
        </div>
      </nav>

      <div className='container2'>
        <Spiner loading={Loading} />

        <div className='container'>
          <input type="text" placeholder='Buscar...' className={"input is-primary is-medium mt-3 mb-3"}
            onChange={e => handlesearch(e.target.value)} ></input>
          <ul className='list'>

            {data.filter((intent) =>
              intent.name.toLowerCase().includes(query.toLowerCase())).slice(leftptr, rtptr).map((inte) => (
                <li key={inte.uid3} id={inte.uid3} className="listItem is-family-monospace card" >
                    <div class="card-image">
                      <figure class="image is-4by3">
                        <img src={inte.img} alt="Placeholder image"/>
                      </figure>
                    </div>
                    <div class="card-content">
                      <div class="media">
                        <div class="media-content">
                          <p class="title is-4">{inte.name}</p>
                          <p class="subtitle is-6">{inte.correo}</p>
                        </div>
                      </div>

                      <div class="content">
                        {inte.uid}
                        <br />
                        <time datetime="2016-1-1">{inte.edad} años</time>
                      </div>
                    </div>
                 


                </li>
              ))
            }


          </ul>

          <Modal open={openModal} onClose={() => handleClikclose(false)} title={handleloading()} frases={traningFrases} setFrases={setTraning} res={responses} setres={setResponses} nq={nq} setloading={setloading} setdata={setdata} />

          <ModalCreate open={openModal2} onClose={() => handleClikclose2(false)} title={"Create Intent 🧠"} frases={traningFrases2} setFrases={setTraning2} res={responses2} setres={setResponses2} nq={nq} setloading={setloading} setdata={setdata} />



          <div className='ptrscont'>
            <div className='lptr'>
              <FontAwesomeIcon icon={faArrowAltCircleLeft} onClick={handlerleftptr} />
            </div>
            <div className='lptr'>
              <FontAwesomeIcon icon={faArrowAltCircleRight} onClick={handlerpointer} />
            </div>
          </div>
        </div>




      </div>

      <div className="floating-container" onClick={handleCreate}>
        <div className="floating-button" onClick={handleCreate}>
          <FontAwesomeIcon icon={faPlus} onClick={handleCreate}  ></FontAwesomeIcon>
        </div>
      </div>

    </div>
  );
}

export default App;
