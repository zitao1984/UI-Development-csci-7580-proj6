import React from "react";

const GalleryItem = props => {
    const date = new Date(props.publication).toDateString()

    return (
        <div className="col-12 col-sm-4 col-md-2 col-lg-2 col-xl-2 m-2">
            <div className={"row"}>
            <img src={props.media}
                 alt={"Image uploaded on " + date}

            />
            <p>Image uploaded on {date}</p>
            </div>
        </div>
    )
}

export default GalleryItem