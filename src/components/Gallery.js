import GalleryItem from "./GalleryItem";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFiles, setLoading, setLoadingSuccess } from "../redux/actions";
import Loading from "./Loading";
import { PageHeader } from "antd";
import { STATUS } from "../redux/stateConstants";
import { Result } from "antd";
const placeholder = [
  {
    author: "test",
    timestamp: Date.now(),
    url:
      "https://firebasestorage.googleapis.com/v0/b/cs7580-final-project.appspot.com/o/files%2Ftest.jpg?alt=media&token=60821f95-ddec-4a8e-8792-a0fe0a38455b",
  },
  {
    author: "test",
    timestamp: Date.now(),
    url:
      "https://firebasestorage.googleapis.com/v0/b/cs7580-final-project.appspot.com/o/files%2Ftest.jpg?alt=media&token=60821f95-ddec-4a8e-8792-a0fe0a38455b",
  },
  {
    author: "test",
    timestamp: Date.now(),
    url:
      "https://firebasestorage.googleapis.com/v0/b/cs7580-final-project.appspot.com/o/files%2Ftest.jpg?alt=media&token=60821f95-ddec-4a8e-8792-a0fe0a38455b",
  },
  {
    author: "test",
    timestamp: Date.now(),
    url:
      "https://firebasestorage.googleapis.com/v0/b/cs7580-final-project.appspot.com/o/files%2Ftest.jpg?alt=media&token=60821f95-ddec-4a8e-8792-a0fe0a38455b",
  },
  {
    author: "test",
    timestamp: Date.now(),
    url:
      "https://firebasestorage.googleapis.com/v0/b/cs7580-final-project.appspot.com/o/files%2Ftest.jpg?alt=media&token=60821f95-ddec-4a8e-8792-a0fe0a38455b",
  },
  {
    author: "test",
    timestamp: Date.now(),
    url:
      "https://firebasestorage.googleapis.com/v0/b/cs7580-final-project.appspot.com/o/files%2Ftest.jpg?alt=media&token=60821f95-ddec-4a8e-8792-a0fe0a38455b",
  },
  {
    author: "test",
    timestamp: Date.now(),
    url:
      "https://firebasestorage.googleapis.com/v0/b/cs7580-final-project.appspot.com/o/files%2Ftest.jpg?alt=media&token=60821f95-ddec-4a8e-8792-a0fe0a38455b",
  },
  {
    author: "test",
    timestamp: Date.now(),
    url:
      "https://firebasestorage.googleapis.com/v0/b/cs7580-final-project.appspot.com/o/files%2Ftest.jpg?alt=media&token=60821f95-ddec-4a8e-8792-a0fe0a38455b",
  },
];

const Gallery = (props) => {
  console.log("GALLEY PROPS", props);
  const dispatch = useDispatch();
  // let files = useSelector(state => state.files)
  // const status = useSelector(state => state.loading.status);
  // console.log(status)

  // useEffect(() => {
  //     console.log(files)
  //     if (files.size === 0) {
  //         dispatch(setLoading())
  //     }
  //     if (status === "loading") {
  //
  //         files = dispatch(getFiles())
  //         console.log("files", files)
  //         dispatch(setLoadingSuccess())
  //
  //     }
  // }, [dispatch, status])

  return (
    <div>
      <div className="row d-flex justify-content-left">
        {props.files.length === 0 ? (
          <Result
            status="500"
            title="No file for this chat"
            dd
          />
        ) : (
          props.files.map((file) => {
            return (
              <GalleryItem
                media={file.fileUrl}
                author={file.sender}
                publication={file.timestamp}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Gallery;
