import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
// impt
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, Setarticles] = useState([]);
  const [loading, Setloading] = useState(true);
  const [page, Setpage] = useState(1);
  const [totalResults, Settotalresults] = useState(0);

  const capitalizefirstletter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setprogress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    Setloading(true);
    let data = await fetch(url);
    props.setprogress(30);
    let parsedata = await data.json();
    props.setprogress(50);
    console.log(parsedata);
    Setarticles(parsedata.articles);
    Setloading(false);
    Settotalresults(parsedata.totalResults);

    props.setprogress(100);
  };

  useEffect(() => {
    document.title = `${capitalizefirstletter(props.category)} - TazaKhabar`;
    updateNews();
    // eslint-disable-line
  }, []);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apikey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    Setpage(page + 1);
    let data = await fetch(url);
    let parsedata = await data.json();
    Setarticles(articles.concat(parsedata.articles));
    Settotalresults(articles.concat(parsedata.articles));
    Setloading(false);
  };
  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "30px 0px", marginTop: "90px" }}
      >
        TazaKhabar - Top {capitalizefirstletter(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    key={element.url}
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageurl={element.urlToImage}
                    newsurl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  name: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
