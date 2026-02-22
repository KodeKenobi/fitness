import Fastify from "fastify";
import cors from "@fastify/cors";
import gymRoutes from "./modules/gyms/gym.routes";

const app = Fastify();

app.register(cors, {
  origin: "*",
});

app.register(gymRoutes, { prefix: "/gyms" });

app.listen({ port: 3000, host: "0.0.0.0" }).then(() => {
  console.log("Server is well fed and just chilling at http://0.0.0.0:3000");
});