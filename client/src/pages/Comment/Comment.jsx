import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
// Components
import CommentHeader from "./../../components/CommentHeader/CommentHeader";
import CommentFilterBox from "../../components/CommentFilterBox/CommentFilterBox";
import Footer from "../../components/Footer/Footer";
import CommentList from "../../components/CommentList/CommentList";
import { Row, Col } from "react-bootstrap";
import Pagination from "../../common/Pagination";
import { ReactComponent as Star } from "./images/star.svg";
import { ReactComponent as StarSolid } from "./images/star-solid.svg";
import { paginate } from "../../utils/paginate";

import "./Comment.css";
class Comment extends Component {
  state = {
    place: "",
    pageSize: 10, // 每頁幾筆
    currentPage: 1,
    comments: [],
    ratingAvg: ""
  };

  componentDidMount() {
    document.title = "66°N - 客戶評論";

    let body = document.querySelector("body");
    body.style.overflowY = "auto";

    fetch("http://localhost:3001/comments")
      .then(
        response => {
          return response.json();
        },
        error => {
          console.log(error);
        }
      )
      .then(data => {
        // 評論數量
        let ratingLength = data.length;
        let totalRating = 0;
        data.forEach(d => (totalRating += +d.rating));
        let ratingAvg = (totalRating / ratingLength).toFixed(1);

        // 將 likedAmount轉為物件
        let likedAmountJson = data.map(d => JSON.parse(d.likedAmount));

        for (let i = 0; i < data.length; i++) {
          data[i].likedAmount = likedAmountJson[i];
        }
        this.setState({
          comments: data,
          ratingAvg
        });
      });
  }

  selectComments = place => {
    let obj = JSON.parse(JSON.stringify(this.state));
    this.setState({ place: place });
    obj.place = place;

    fetch(`http://localhost:3001/comments/select`, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(
        response => {
          return response.json();
        },
        error => {
          console.log(error);
        }
      )
      .then(data => {
        console.log(data);
        let likedAmountJson = data.map(d => JSON.parse(d.likedAmount));
        for (let i = 0; i < data.length; i++) {
          data[i].likedAmount = likedAmountJson[i];
        }
        this.setState({ comments: data });
      });
  };

  handlePageChange = page => {
    window.scrollTo(0, 950);
    this.setState({ currentPage: page });
  };

  handleLike = async comment => {
    if (this.props.currentUser) {
      // server
      await axios.put("http://localhost:3001/comments/liked/" + comment.c_id, {
        u_id: this.props.currentUser.user.u_id
      });

      const {
        data: likedNum
      } = await axios.get(
        "http://localhost:3001/comments/likedAmount/" + comment.c_id,
        { u_id: this.props.currentUser.user.u_id }
      );
      const comments = [...this.state.comments];
      const index = comments.indexOf(comment);
      comments[index].likedAmount = JSON.parse(likedNum);
      await this.setState({ comments });
    } else {
      toast.error("請先登入或註冊為會員");
    }
  };

  render() {
    const { length: count } = this.state.comments;
    const { currentUser } = this.props;
    const {
      pageSize,
      currentPage,
      comments: allComments,
      ratingAvg
    } = this.state;
    const comments = paginate(allComments, currentPage, pageSize);

    return (
      <>
        <CommentHeader
          comments={count}
          ratingAvg={ratingAvg}
          currentUser={currentUser}
        />
        <div className="container mt-5">
          <Row>
            <Col>
              <div className="text-center comment-header">
                <h3 className="my-2">公開且透明</h3>
                <p style={{ color: "#96DAF0" }} className="my-4">
                  因為您的意見對我們很重要，所以我們請您留下您寶貴的意見
                </p>
                <p className="m-auto">
                  我們的首要工作是設計旅行行程，為了保證旅遊的品質和客戶評價的透明度，我們選擇直接發布所有66°N旅行者的意見。
                </p>
                <p className="m-auto">
                  如果您不滿意或覺得哪裡需要改進，歡迎留言讓我們知道。
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="col-lg-4 col-md-12 col-12 comment-regulation-container">
              <div style={{ position: "sticky", top: "1.5rem" }}>
                <div className="comment-regulation ">
                  <h5>如何評論?</h5>
                  <ol className="comment-term">
                    <li>參加66°N的旅行</li>
                    <li>
                      購買行程後，您將可在客戶專區評論您對於本次旅行的感想。
                    </li>
                    <li>
                      您的意見（無論是正面還是負面）都直接發佈在我們的網站上。
                    </li>
                  </ol>
                  <a href="#1">了解更多信息</a>
                </div>
                <div className="rank-info mt-4">
                  <div className="d-flex align-items-center mb-1">
                    <StarSolid className="star star-solid" />
                    <StarSolid className="star" />
                    <StarSolid className="star" />
                    <StarSolid className="star" />
                    <StarSolid className="star" />
                    <div className="ml-auto rank-des">很滿意</div>
                  </div>
                  <div className="d-flex align-items-center mb-1">
                    <StarSolid className="star" />
                    <StarSolid className="star" />
                    <StarSolid className="star" />
                    <StarSolid className="star" />
                    <Star className="star" />
                    <div className="ml-auto rank-des">滿意</div>
                  </div>
                  <div className="d-flex align-items-center mb-1">
                    <StarSolid className="star" />
                    <StarSolid className="star" />
                    <StarSolid className="star" />
                    <Star className="star" />
                    <Star className="star" />
                    <div className="ml-auto rank-des">普通</div>
                  </div>
                  <div className="d-flex align-items-center mb-1">
                    <StarSolid className="star" />
                    <StarSolid className="star" />
                    <Star className="star" />
                    <Star className="star" />
                    <Star className="star" />
                    <div className="ml-auto rank-des">不滿意</div>
                  </div>
                  <div className="d-flex align-items-center">
                    <StarSolid className="star" />
                    <Star className="star" />
                    <Star className="star" />
                    <Star className="star" />
                    <Star className="star" />
                    <div className="ml-auto rank-des">非常不滿意</div>
                  </div>
                </div>
              </div>
            </Col>

            <Col className="col-lg-8 member-comment-container">
              <div className="member-comment">
                <CommentFilterBox selectComments={this.selectComments} />
              </div>
              <div className="mt-4">
                <CommentList
                  comments={comments}
                  onClick={this.handleLike}
                  currentUser={currentUser}
                />
                <div className="d-flex justify-content-center">
                  <Pagination
                    itemsCount={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <ToastContainer autoClose={1500} />
        <Footer />
      </>
    );
  }
}

export default Comment;
