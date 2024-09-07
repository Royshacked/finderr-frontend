import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router"
import { gigService } from "../services/gig/gig.service.remote.js"
export function ReviewEdit() {
	const [gig, setGig] = useState(null)
	const [review, setReview] = useState(null)
	//const [reviewToEdit, setreviewToEdit] = useState(null)
	const navigate = useNavigate()

	//const [userPlan, setUserPlan] = useState('entry')
	const { gigId, reviewId } = useParams()
	console.log(gigId, reviewId)

	// const {reviewId}=useParams


	useEffect(() => {
		if (gigId) loadGig()

		console.log(review);





	}, [gigId])
	// function onSubmit(ev) {
	//     ev.preventDefault()

	//     dispatch({ type: SET_FILTER_BY, filterBy: { ...filterByToEdit } })
	//     navigate('/gig')
	// }
	// var review = {
	//     id: 'madeId',
	//     title: 'Did an amazing work',
	//     txt: makeLorem(50),
	//     rate: getRandomIntInclusive(0, 5),
	//     price: getRandomIntInclusive(100, 1000),
	//     duration: getRandomIntInclusive(1, 4),
	//     date: 'lo mizman',
	//     by: {
	//         _id: 'u102',
	//         fullname: 'user2',
	//         country: 'usa',
	//         img: 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/351244456/original/f6d584d8afa0559fe0c04f4c3c537659f4369e98.png'

	//     },
	function onSubmit() {

		review.by = {
			_id: 'u102',
			fullname: 'user2',
			country: 'usa',
			img: 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/351244456/original/f6d584d8afa0559fe0c04f4c3c537659f4369e98.png'

		}
		console.log(review.by)
		if (!reviewId) gig.reviews.push(review)
		gig.reviews[gig.reviews.findIndex(review => review.id === reviewId)] = review
		//console.log(gig.reviews[0]);
		//console.log(gig.reviews);



		//console.log(gig.reviews[0], gig.reviews);
		gigService.save(gig)


		navigate(`/gig/${gig._id}`)
		// ${gig._id}
	}

	function onChange({ target }) {
		const { name, value } = target
		console.log(review);


		setReview(prevReview => ({ ...prevReview, [name]: value }))
		console.log(review);

	}
	// var review = {
	//     id: makeId(),
	//     title: '',
	//     txt: '',
	//     rate: '',
	//     price: '',
	//     duration: getRandomIntInclusive(1, 4),
	//     date: '',
	//     by: {
	//         _id: 'u102',
	//         fullname: 'user2',
	//         country: 'usa',
	//         img: 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/351244456/original/f6d584d8afa0559fe0c04f4c3c537659f4369e98.png'

	//     },
	function loadGig() {
		gigService.getById(gigId)
			.then(gig => {
				setGig(gig)
				return gig
			}).then(gig => {
				var revieww = gig.reviews.find(review => review.id === reviewId)
				var trye = gigService.getEmptyReview()
				//console.log(trye, revieww);

				if (revieww === undefined) {
					setReview(trye)
					console.log('hear', review);
				}
				else setReview(revieww)
				//setReview(trye)
				console.log(review, revieww, trye);
			})

			.catch(err => {
				console.log('Had issues in gig details', err)
				navigate('/gig')
			})
	}
	if (!gig) return <div>Loading...</div>

	return <section className="gig-filter ">
		<form className="review-edit-form" onSubmit={onSubmit}>
			<input type="txt" name="title" onChange={onChange} value={review ? review.title : ''} placeholder="" />
			<input type="txt" name="txt" onChange={onChange} value={review ? review.txt : ''} placeholder="" />
			<input type="txt" name="duration" onChange={onChange} value={review ? review.duration : ''} placeholder="" />
			<input type="txt" name="rate" onChange={onChange} value={review ? review.rate : ''} placeholder="" />

			<button>bo</button>
		</form>
	</section>





}