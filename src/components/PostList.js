import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { LinkContainer } from "react-router-bootstrap";

function PostList({ posts }) {
  return (
    <>
      <h1>All Posts</h1>
      <Row xs={1} md={1} lg={2} className="g-4">
        {posts.map((post) => {
          return (
            <Col key={post._id}>
              <Card className="m-3">
                <Card.Img
                  variant="top"
                  src={post.imageURL ? post.imageURL : "https://placehold.co/600x400"}
                />
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.content}</Card.Text>
                  <Card.Subtitle>
                    {post.author.name} on {post.date.slice(0, post.date.indexOf("T"))}
                  </Card.Subtitle>
                  <LinkContainer to={`/posts/${post._id}`}>
                    <Button variant="secondary" className="m-2">
                      To Post
                    </Button>
                  </LinkContainer>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default PostList;
