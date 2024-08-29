import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // optional CSS

export function CustomCarousel({ imgs }) {
    // Custom left arrow button
    function renderArrowPrev(clickHandler, hasPrev) {
        hasPrev && (
            <button
                type="button"
                className="custom-prev-button"
                onClick={(e) => {
                    e.stopPropagation() // Prevent the click from propagating
                    clickHandler()
                }}
            >
                &#9664; {/* Left arrow symbol or use any icon */}
            </button>
        )
    }
    // Custom right arrow button
    function renderArrowNext(clickHandler, hasNext) {
        hasNext && (
            <button
                type="button"
                className="custom-next-button"
                onClick={(e) => {
                    e.stopPropagation() // Prevent the click from propagating
                    clickHandler()
                }}
            >
                &#9654; {/* Right arrow symbol or use any icon */}
            </button>
        )
    }

    return (
        <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
        // renderArrowPrev={renderArrowPrev}
        // renderArrowNext={renderArrowNext}
        // Add other Carousel props as needed
        >
            {imgs.map(img =>
                <div className='carousel-img'>
                    <img src={img} alt="Slide 1" />
                </div>
            )}
        </Carousel>
    )
}