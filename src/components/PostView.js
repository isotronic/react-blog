import Card from "react-bootstrap/Card";

function PostView({ post }) {
  return (
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
      </Card.Body>
    </Card>
  );
}

export default PostView;
