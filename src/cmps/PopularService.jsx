import { Carousel } from "react-responsive-carousel";


export function PopularServices() {

    return <section className="popular-services">
        <h2>Popular services</h2>
        <div>
            {/* <Carousel
                showThumbs={false}
                showStatus={false}
                infiniteLoop={true}
            // renderArrowPrev={renderArrowPrev}
            // renderArrowNext={renderArrowNext}
            // Add other Carousel props as needed
            > */}
            <article>
                <h3>Website <br />Development</h3>
                <div>
                    <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156477/website-development.png" alt="" />
                </div>
            </article>

            <article>
                <h3>Logo-design</h3>
                <div>
                    <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156494/logo-design.png" alt="" />
                </div>
            </article>

            <article>
                <h3>SEO</h3>
                <div>
                    <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156488/seo.png" alt="" />
                </div>
            </article>

            <article>
                <h3>Architecture & <br />Interior Design</h3>
                <div>
                    <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156473/architecture-design.png" alt="" />
                </div>
            </article>

            <article>
                <h3>Social Media <br />Marketing</h3>
                <div>
                    <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156476/social-media-marketing.png" alt="" />
                </div>
            </article>

            <article>
                <h3>Voice Over</h3>
                <div>
                    <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156479/voice-over.png" alt="" />
                </div>
            </article>

            {/* <article>
                <h3>Software <br />Development</h3>
                <div>
                    <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156476/software-development.png" alt="" />
                </div>
            </article> */}


            {/* </Carousel> */}

        </div>
    </section>
}