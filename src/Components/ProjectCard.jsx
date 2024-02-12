import React,{useState} from 'react'
import {Card, Modal, Row, Col} from 'react-bootstrap'
import { SERVER_URL } from '../Services/serverUrl';

function ProjectCard({project}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {project&&<Card style={{ width: '28rem' }} className='rounded shadow' onClick={handleShow}>
        <Card.Img variant="top" src={`${SERVER_URL}/uploads/${project.projectImage}`} />
        <Card.Body>
          <Card.Title className='text-center'>{project?.title}</Card.Title>
        </Card.Body>
      </Card>
      }

      <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{project?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='p-4'>
          <Row>
            <Col md={6}>
              <img style={{width:'350px',height:'200px'}} src={`${SERVER_URL}/uploads/${project?.projectImage}`} alt="" />
            </Col>
            <Col md={6}>
              <h2 className='fw-bolder text-dark'>{project?.title}</h2>
              <p><span className='fw-bolder'>Project Overview : </span>{project?.overview}</p>
              <p className='fw-bolder'>Technologies Used : <span className='text-danger'>{project?.languages}</span></p>
            </Col>
          </Row>
          <div className='mt-4'>
            <a href={project?.github} className='me-4' target='_blank'><i class="fa-brands fa-github fa-2xl"></i></a>
            <a href={project?.website} target='_blank'><i class="fa-solid fa-link fa-2xl"></i></a>
          </div>
        </Modal.Body>
      </Modal>
    
    </>
  )
}

export default ProjectCard