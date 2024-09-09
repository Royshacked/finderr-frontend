import Star from '../src/assets/svg/details/star.svg?react'
import { Link } from 'react-router-dom';
import { gigService } from '../../services/gig/gig.service.local';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
export function ReviewDetailes(gig) {
    const navigate = useNavigate()




    function onDeleteReview(reviewId) {
        console.log(reviewId);

        var reviews = gig.gig.reviews.filter(review => review.id !== reviewId)
        gig.gig.reviews = reviews
        console.log(gig.gig.reviews)

        gigService.save(gig.gig)



        //navigate(`/gig/${gig._id}`)

    }






    console.log('review,', gig.gig.reviews);
    var reviews = gig.gig.reviews


    return (<>
        <div className='Reviews-details-container'>
            <span> <Link to={`/gig/createreview/${gig.gig._id}`}>create review</Link> </span>

            <div class="tbody-3 co-text-darker text-bold m-b-16">Reviews</div>
            <header>
                <div className="flex amount-and-stars">
                    <span>{gig.gig.reviews && gig.gig.reviews.length} reviews for this Gig</span>
                    <span>
                        <div className="stars flex">
                            <div> <Star /></div>
                            <div> <Star /></div>
                            <div> <Star /></div>
                            <div> <Star /></div>
                            <div> <Star /></div>
                        </div>
                        <div className="amount-of-stars"></div>
                    </span>
                </div>
            </header>
            <span>
                <div className='stars-progres'>
                    <div> <table className='stars-progres-bar'>
                        <tr>
                            <td>5 start</td>
                            <td className='progres-bar'></td>
                            <td>5000</td>


                        </tr>
                        <tr>     <td>4 start</td>
                            <td className='progres-bar'></td>
                            <td>5000</td></tr>
                        <tr>     <td>4 start</td>
                            <td className='progres-bar'></td>
                            <td>5000</td></tr>
                        <tr>     <td>4 start</td>
                            <td className='progres-bar'></td>
                            <td>5000</td></tr>
                        <tr>     <td>4 start</td>
                            <td className='progres-bar'></td>
                            <td>5000</td></tr>
                    </table></div>
                    <div><h6 class="text-display-7">Rating Breakdown</h6> <div>
                    </div>
                        <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>


                    </div>

                </div>
            </span>
            {/* var review = {
        id: 'madeId',
        title: 'Did an amazing work',
        txt: makeLorem(50),
        rate: getRandomIntInclusive(0, 5),
        price: getRandomIntInclusive(100, 1000),
        duration: getRandomIntInclusive(1, 4),
        date: 'lo mizman',
        by: {
            _id: 'u102',
            fullname: 'user2',
            country: 'usa',
            img: 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/351244456/original/f6d584d8afa0559fe0c04f4c3c537659f4369e98.png'
        },
    } */}



        </div>
        <ul className='reviews-list-container'>
            {reviews && reviews.map(review => {
                return (
                    <>
                        <li>
                            <div className='review-list-container flex'>
                                <div className='mini-use flex'>
                                    <div className='mini-use-container flex'>
                                        <div className='figure-container flex'></div>

                                        <figure className="mini-user-review-img flex" title="thauge"><figcaption className="figure">
                                            {review.by.fullname.substring(0, 1)}</figcaption></figure>
                                        <div className='mini-use-details flex'>
                                            {/* le="font-size:48px;background-color:#C14A83;border-radius:9999px" */}
                                            <div className='mini-use-details-name'>{review.by.fullname}</div>
                                            <div className='mini-use-details-country flex'>{review.by.country}</div>

                                        </div>
                                    </div>
                                </div>
                                <div className='main-review flex'>
                                    <p>{review.txt}</p>
                                </div>

                                <span> <Link to={`/review/${gig.gig._id}/${review.id}`}>Edit</Link> </span>
                                <span onClick={ev => onDeleteReview(review.id)}>delete</span>

                            </div>
                            <div className='review-helpfool'></div>
                        </li></>)
            }

            )}



        </ul>


    </>
    )
}