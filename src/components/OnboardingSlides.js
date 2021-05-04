import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import Slide from "./Slide";
import {completeOnboarding, userCompletedOnboarding} from "../redux/actions";
import SlideIndicator from "./SlideIndicator";

const TOTAL_SLIDES = 4;

const OnboardingSlides = () => {
    const [activeSlide, setActiveSlide] = useState(1);

    const dispatch = useDispatch();

    const setSlideState = id => {
        if (id === activeSlide)
            return "active";
        return "inactive";
    }

    const nextSlide = () => {
        let id = activeSlide;
        id < TOTAL_SLIDES ? setActiveSlide(id + 1) : dispatch(userCompletedOnboarding());
    }

    const generateSlideIndicators = () => {
        let indicators = [];
        for (let i = 1; i <= TOTAL_SLIDES; i++) {
            indicators.push(
                <SlideIndicator slideStatus={setSlideState(i)} key={i}
                                slideID={i}
                                clickHandler={() => setActiveSlide(i)}/>
            )
        }
        return indicators;
    }

    return (
        <div className="slides-bg center bg-white my-5 text-center">
            <Slide slideStatus={setSlideState(1)} slideId={1}>
                <h1 className="">Join  a chat</h1>
                <p>Join a chat by entering a code, or select an existing chat from the panel on the left</p>
                <div className="fit my-4">
                    <img src={process.env.PUBLIC_URL + "/onboarding1.PNG"}
                         className="img-fluid"
                         alt="Joining Chat"/>
                </div>
            </Slide>
            <Slide slideStatus={setSlideState(2)} slideId={2}>
                <h1 className="">Chat with friends and family</h1>
                <p>Just type your message, and hit the send button on the bottom right
                </p>
                <div className="fit my-4">
                    <img src={process.env.PUBLIC_URL + "/onboarding2.PNG"}
                         className="img-fluid"
                         alt="Chat View"/>
                </div>
            </Slide>
            <Slide slideStatus={setSlideState(3)} slideId={3}>
                <h1 className="">Upload Images</h1>
                <p>Select the upload image button (at the bottom on the chat window, on the left) to upload an image.
                </p>
                <p>Then, click on the check mark next to the file name to confirm the upload</p>
                <div className="fit my-4">
                    <img src={process.env.PUBLIC_URL + "/onboarding3.PNG"}
                         className="img-fluid"
                         alt="Upload Images."/>
                </div>
            </Slide>
            <Slide slideStatus={setSlideState(4)} slideId={4}>
                <h1 className="">Check Out The Gallery</h1>
                <p>Select the blue button on the top right to view a chat's image gallery
                </p>
                <div className="fit my-4">
                    <img src={process.env.PUBLIC_URL + "/onboarding4.PNG"}
                         className="img-fluid"
                         alt="Gallery View"/>
                </div>
            </Slide>
            {/*<Slide slideStatus={setSlideState(3)} slideId={3}>*/}
            {/*    <h1>Something something something</h1>*/}
            {/*    <p>Lorem ipsum...</p>*/}
            {/*</Slide>*/}
            <div className="slides-controls">

                <Link to={"/"} className="align-left control-btn"
                      onClick={() => dispatch(userCompletedOnboarding())}>Skip</Link>
                <div className="align-center">
                    {generateSlideIndicators()}
                </div>
                {activeSlide < TOTAL_SLIDES ?
                    <button className="align-right control-btn" onClick={nextSlide}>Next
                    </button> :
                    <Link to={"/"} className="align-right control-btn" onClick={()=> dispatch(userCompletedOnboarding())} >Done
                    </Link>
                }
            </div>

        </div>
    )

}

export default OnboardingSlides