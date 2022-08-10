import React, { useEffect, useState } from 'react';
import './page.css';
import Card from '../card/Card';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Pagination from '../pagination/Pagination';

const Page = () => {
	const [products, setProducts] = useState([]);
	const [selectedcat, setSelectedCat] = useState('');
	const [category, setCatogory] = useState([]);
	const [pageProducts, setPageProducts] = useState([]);
  const [modalimg , setModalimg]=useState('')
  const [modaldes,setmodaldes]=useState('')
  const [currentPage,setCurrentPage]=useState(1)
  const [postPerPage,setPostPerPage]=useState(10)


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (url, description) =>{
    setModalimg(url)
    setmodaldes(description)
    setShow(true);
  } 

	useEffect(() => {
		axios({
			method: 'GET',
			url: 'https://api.escuelajs.co/api/v1/products',
		})
			.then((data) => {
				setProducts(data.data.slice(1, 50));
				const topProducts = data.data.slice(1, 50);
				setPageProducts(topProducts);
			})
			.catch((err) => console.dir(err));
	}, []);

	const cat = products.map((data) => {
		return data.category.name;
	});
	
	const catogUnique = [...new Set(cat.slice(1, 50))];

	const filterHandler = (e) => {
		
		console.log(e.target.value);
		const filteredArr = products.filter((val) => {
			return val.category.name === e.target.value;
		})
    console.log(filteredArr)
    setPageProducts(filteredArr)
    setSelectedCat(e.target.value)
	};



  const indexOfLastPost = currentPage*postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage
  const currentPost = pageProducts.slice(indexOfFirstPost,indexOfLastPost)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)


	return (
    <>
   <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <img className='product-img' src={modalimg} alt=""/>
        <div>
          {modaldes}
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
          <div>
          <select
            
            className="cust-input"
            placeholder="Catagories"
            value={selectedcat}
            onChange={filterHandler}
            autoComplete="off"
            required
          >
            {catogUnique.map((val, idx) => {
              return <option key={idx} >{val}</option>;
            })}
          </select>
    <div className='post-box'>
    {currentPost.map((data, idx) => {
            return (
              <Card
                key={idx}
                onClick={handleShow}
                url={data.category.image}
                description={data.description}
              ></Card>
            );
          })}
    </div>
          
        </div>
      <Pagination postPerPage={postPerPage} totalPosts={products.length+1} paginate={paginate}></Pagination>
    
    
   
		
    </>
	);
  
};

export default Page;
