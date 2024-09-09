import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // optional CSS

export function CustomCarousel({ imgs }) {
    // Custom left arrow button
    function renderArrowPrev(clickHandler, hasPrev) {
        console.log('custom carousel')
        hasPrev && (
            <button
                type="button"
                className="custom-prev-button"
                onClick={(e) => {
                    e.stopPropagation() // Prevent the click from propagating
                    clickHandler()
                }}
                style={{ zIndex: 100, width: '200px', height: '200px', backgroundColor: 'green' }}
            >
                x  {/* Left arrow symbol or use any icon */}

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
                style={{ zIndex: 100, width: '200px', height: '200px', backgroundColor: 'green' }}
            >
                x {/* Right arrow symbol or use any icon */}
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
                <div key={img} className='carousel-img'>
                    <img src={img} alt="Slide 1" />
                </div>
            )}
        </Carousel>
    )
}