import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails, createProductReview } from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const Navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted!');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(id));
  }, [dispatch, id, successProductReview]);

  const addToCartHandler = () => {
    Navigate(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    );
  };

  // return (
  //   <>
  //     <button className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110'>
  //       <Link to='/'>Go back</Link>
  //     </button>

  //     {loading ? (
  //       <Loader />
  //     ) : error ? (
  //       <Message variant='danger'>{error}</Message>
  //     ) : (
  //       <>
  //         <div className='max-w-7xl mx-auto'>
  //           <div className='lg:flex justify-center items-start container'>
  //             <div className='lg:w-1/2 p-5'>
  //               <img
  //                 src={product.image}
  //                 alt={product.Name}
  //                 className='w-full max-h-80 object-contain'
  //               />
  //             </div>
  //             <div className='lg:w-1/2 p-5'>
  //               <div className='mb-4'>
  //                 <h2 className='text-xl font-semibold'>{product.Name}</h2>
  //                 <Rating
  //                   value={product.rating}
  //                   text={`${product.numberofreviews} reviews`}
  //                   className='text-sm text-gray-500'
  //                 />
  //               </div>
  //               <div className='mb-4'>
  //                 <h3 className='text-lg font-semibold'>${product.price}</h3>
  //                 <p className='text-gray-500'>{product.description}</p>
  //               </div>
  //               <div className='mb-4'>
  //                 <h4 className='text-lg font-semibold'>Status:</h4>

  //                 {parseInt(product.countInstock, 10) > 0 ? (
  //                   <span className='text-green-600'>In Stock</span>
  //                 ) : (
  //                   <span className='text-red-600'>Out of Stock</span>
  //                 )}
  //               </div>
  //               {product.countInstock > 0 && (
  //                 <div className='mb-4'>
  //                   <h4 className='text-xl font-bold'>Qty:</h4>
  //                   <select
  //                     className='py-2 px-3 rounded-md border border-gray-300'
  //                     value={qty}
  //                     onChange={(e) => setQty(e.target.value)}>
  //                     {[...Array(parseInt(product.countInstock, 10)).keys()].map((x) => (
  //                       <option key={x + 1} value={x + 1}>
  //                         {x + 1}
  //                       </option>
  //                     ))}
  //                   </select>
  //                 </div>
  //               )}
  //               <div className='mt-4'>
  //                 <button
  //                   onClick={addToCartHandler}
  //                   className={`px-6 py-3 rounded-full ${
  //                     product.countInstock > 0
  //                       ? 'bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110'
  //                       : 'bg-gray-400 cursor-not-allowed'
  //                   }`}
  //                   type='button'
  //                   disabled={product.countInstock === 0}>
  //                   Add to Cart
  //                 </button>
  //               </div>
  //             </div>
  //           </div>
  //           <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
  //             <div>
  //               <h2 className='text-2xl font-bold'>Reviews</h2>
  //               {product.reviews.length === 0 && <Message>No reviews</Message>}
  //               <ul className='list-none'>
  //                 {product.reviews.map((review) => (
  //                   <li key={review._id} className='my-4'>
  //                     <div className='flex items-center justify-between mb-2'>
  //                       <h3 className='text-lg font-medium'>{review.Name}</h3>
  //                       <Rating value={review.rating} />
  //                     </div>
  //                     <p className='text-gray-500 text-sm'>{review.createdAt.substring(0, 10)}</p>
  //                     <p>{review.comment}</p>
  //                   </li>
  //                 ))}
  //                 <li className='my-4'>
  //                   <h2 className='text-2xl font-bold'>Write a Customer Review</h2>
  //                   {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
  //                   {userInfo ? (
  //                     <form onSubmit={submitHandler}>
  //                       <div className='my-4'>
  //                         <label className='block font-medium mb-1' htmlFor='rating'>
  //                           Rating
  //                         </label>
  //                         <select
  //                           className='w-full border border-gray-300 py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
  //                           id='rating'
  //                           value={rating}
  //                           onChange={(e) => setRating(e.target.value)}>
  //                           <option value=''>Select...</option>
  //                           <option value='1'>1 - Poor</option>
  //                           <option value='2'>2 - Fair</option>
  //                           <option value='3'>3 - Good</option>
  //                           <option value='4'>4 - Very Good</option>
  //                           <option value='5'>5 - Excellent</option>
  //                         </select>
  //                       </div>
  //                       <div className='my-4'>
  //                         <label className='block font-medium mb-1' htmlFor='comment'>
  //                           Comment
  //                         </label>
  //                         <textarea
  //                           className='w-full border border-gray-300 py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
  //                           rows='3'
  //                           id='comment'
  //                           value={comment}
  //                           onChange={(e) => setComment(e.target.value)}
  //                         />
  //                       </div>
  //                       <button
  //                         type='submit'
  //                         className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
  //                         Submit
  //                       </button>
  //                     </form>
  //                   ) : (
  //                     <Message>
  //                       Please <Link to='/login'>sign in</Link> to write a review
  //                     </Message>
  //                   )}
  //                 </li>
  //               </ul>
  //             </div>
  //           </div>
  //         </div>
  //       </>
  //     )}
  //   </>
  // );

  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <div className='flex flex-wrap -mx-3 mb-6'>
            <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
              <img src={product.image} alt={product.name} className='w-full h-auto' />
            </div>
            <div className='w-full md:w-1/4 px-3'>
              <div className='mb-4'>
                <h3 className='text-xl font-semibold'>{product.name}</h3>
              </div>
              <div className='mb-4'>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
              </div>
              <div className='mb-4'>Price: ${product.price}</div>
              <div className='mb-4'>Description: {product.description}</div>
            </div>
            <div className='w-full md:w-1/4 px-3'>
              <div className='border p-4 rounded-lg'>
                <div className='mb-4'>
                  <div className='flex justify-between'>
                    <div>Price:</div>
                    <div>
                      <strong>${product.price}</strong>
                    </div>
                  </div>
                </div>

                <div className='mb-4'>
                  <div className='flex justify-between'>
                    <div>Status:</div>
                    <div>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</div>
                  </div>
                </div>

                {product.countInStock > 0 && (
                  <div className='mb-4'>
                    <div className='flex justify-between'>
                      <div>Qty</div>
                      <div>
                        <select
                          className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}>
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                <div className='mb-4'>
                  <button
                    onClick={addToCartHandler}
                    className={`w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                      product.countInStock === 0 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    type='button'
                    disabled={product.countInStock === 0}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full md:w-1/2 px-3'>
            <h2 className='text-2xl font-bold'>Reviews</h2>
            {product.reviews.length === 0 && <Message>No reviews</Message>}
            <div className='space-y-4'>
              {product.reviews.map((review) => (
                <div key={review._id} className='border p-4 rounded-lg'>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </div>
              ))}
              <div className='border p-4 rounded-lg'>
                <h2 className='text-xl font-bold'>Write a Customer Review</h2>
                {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <div className='mb-4'>
                      <label
                        className='block text-gray-700 text-sm font-bold mb-2'
                        htmlFor='rating'>
                        Rating
                      </label>
                      <select
                        className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
                        id='rating'
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}>
                        <option value=''>Select...</option>
                        <option value='1'>1 - Poor</option>
                        <option value='2'>2 - Fair</option>
                        <option value='3'>3 - Good</option>
                        <option value='4'>4 - Very Good</option>
                        <option value='5'>5 - Excellent</option>
                      </select>
                    </div>
                    <div className='mb-4'>
                      <label
                        className='block text-gray-700 text-sm font-bold mb-2'
                        htmlFor='comment'>
                        Comment
                      </label>
                      <textarea
                        className='w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
                        id='comment'
                        rows='3'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </div>
                    <button
                      type='submit'
                      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                      Submit
                    </button>
                  </form>
                ) : (
                  <Message>
                    Please <Link to='/login'>sign in</Link> to write a review
                  </Message>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductScreen;
