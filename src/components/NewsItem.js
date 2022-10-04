import React from "react";

const NewsItem = (props) => {
  let { title, description, imageurl, newsurl, author, date, source } = props;
  return (
    <div className="my-3">
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            left: "0",
          }}
        >
          <span
            className="badge rounded-pill bg-dark" /*style={{left:"90%",zIndex:"1"}}*/
          >
            {source}
          </span>
        </div>
        <img
          src={
            !imageurl
              ? "https://images.fineartamerica.com/images-medium-large-5/taza-khabar-jitendra-kumar.jpg"
              : imageurl
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p> {description}</p>
          <p className="card-text">
            <small className="text-primary">
              By {!author ? "Unknown" : author} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            rel="noreferrer"
            href={newsurl}
            className="btn btn-sn btn-dark bg-dark"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
