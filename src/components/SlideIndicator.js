const SlideIndicator = (props) =>
    <button className="indicator" onClick={props.clickHandler} >
        <div className={"circle indicator-" + props.slideStatus}> </div>
    </button>
export default SlideIndicator;