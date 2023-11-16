import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { LinkContainer } from "react-router-bootstrap";
import { useState } from "react";
import { useNavigate, useRouteLoaderData } from "react-router-dom";

function PostList({ posts, admin }) {
  const [error, setError] = useState();
  const token = useRouteLoaderData("root");
  const navigate = useNavigate();

  async function deleteHandler(postId) {
    const proceed = window.confirm("Are you sure?");

    if (!proceed) return;
    if (token === "EXPIRED") return setError("Your token has expired. Please login again.");

    const response = await fetch("http://localhost:4000/delete/" + postId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (response.status === 401) return setError("You are not authorized to do this.");
    if (response.status === 404)
      return setError("The user you are trying to authenticate with doesn't exist.");
    if (!response.ok) return setError("Could not delete the post.");

    navigate(0);
  }
  return (
    <>
      <h1>{admin ? "Admin" : "All Posts"}</h1>
      {error && <p style={{ textAlign: "center" }}>{error}</p>}
      <Row xs={1} md={1} lg={2} className="g-4">
        {posts?.map((post) => {
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

                  {admin && token && (
                    <>
                      <LinkContainer to={`/admin/${post._id}/edit`}>
                        <Button variant="primary" className="m-2">
                          Edit
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="warning"
                        className="m-2"
                        onClick={() => deleteHandler(post._id)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                  {!admin && (
                    <LinkContainer to={`/posts/${post._id}`}>
                      <Button variant="secondary" className="m-2">
                        To Post
                      </Button>
                    </LinkContainer>
                  )}
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
