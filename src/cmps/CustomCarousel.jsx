import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // optional CSS

export function CustomCarousel({ imgs }) {
    // Custom left arrow button
    function renderArrowPrev(clickHandler, hasPrev) {
        return hasPrev && (
            <button
                type="button"
                className="custom-prev-button"
                onClick={(e) => {
                    e.stopPropagation() // Prevent the click from propagating
                    clickHandler()
                }}
            >
                &#9664;
            </button>
        )
    }
    // Custom right arrow button
    function renderArrowNext(clickHandler, hasNext) {
        return hasNext && (
            <button
                type="button"
                className="custom-next-button"
                onClick={(e) => {
                    e.stopPropagation() // Prevent the click from propagating
                    clickHandler()
                }}
            >
                &#9654;
            </button>
        )
    }

    return (
        <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}

            renderArrowPrev={renderArrowPrev}
            renderArrowNext={renderArrowNext}
        // Add other Carousel props as needed
        >
            {imgs.map(img =>
                <div key={img} className='carousel-img' style={{ maxWidth: '700px' }}>
                    <img src={img} alt="Slide 1" />
                </div>
            )}
        </Carousel>
    )
}