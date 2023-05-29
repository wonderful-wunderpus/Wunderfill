export default function errorMiddleware(err, res) {
  console.log(err);
  res.status(500).send({ error: err });
}
