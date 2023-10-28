import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import { useSubmit } from "react-router-dom";

function PostView({ post }) {
  const submit = useSubmit();
  function deleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  }
  return (
    <Card className="m-3">
      <Card.Img variant="top" src={post.imageURL ? post.imageURL : "https://placehold.co/600x400"} />
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.content}</Card.Text>
        <Card.Subtitle>
          {post.author} on {post.date.slice(0, post.date.indexOf("T"))}
        </Card.Subtitle>
        <LinkContainer to={`/posts/${post._id}/edit`}>
          <Button variant="primary" className="m-2">
            Edit
          </Button>
        </LinkContainer>
        <Button variant="warning" className="m-2" onClick={deleteHandler}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

export default PostView;
