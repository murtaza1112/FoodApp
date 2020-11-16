import React, { Component } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import * as actions from "../actions";
import {Col,Row,Spinner} from "react-bootstrap";
import ListCard from "./ListCard";

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};

const limit = 1;

class PaginationSection extends Component {
  state = {
    hasMore: true,
  };
  componentDidMount() {
    //get max length
    console.log("get max length");
    this.props.getMaxLength(this.props.type);
  }

  fetchMoreData = async () => {
    const type = this.props.type;
    const current = Object.keys(this.props.list[type]).length;
    const maxLength = this.props.size[type];
    const obj = { type, current, limit };
    console.log("The next data is being fetched:",obj, maxLength);

    if (current >= maxLength) {
      this.setState({ hasMore: false });
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    await this.props.getNextContent(obj);
  };

  render() {
    const type = this.props.type;
    // console.log(this.props.list);
    const current = Object.keys(this.props.list[type]).length;

    return (
      <div>
        <hr />
        <InfiniteScroll
          dataLength={current || 0}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={
            <p style={{ textAlign: "center" }}>
              <Spinner animation="border" variant="secondary" />
            </p>
          }
          endMessage={
            <p style={{ textAlign: "center" }}>
              <h4 className="finale">You Have Reached The End:)</h4>
            </p>
          }
        >
          <Row>
            {Object.values(this.props.list[type]).map((elem) => {
              return (
                <Col xs={12} sm={12} md={6} lg={3}>
                  <ListCard details={elem} />
                </Col>
              );
            })}
          </Row>
        </InfiniteScroll>
      </div>
    );
  }
}

const mapStateToProps = ({ list, auth, size }) => {
//   console.log(list, auth, size);
  return { list, auth, size };
};
export default connect(mapStateToProps, actions)(PaginationSection);
