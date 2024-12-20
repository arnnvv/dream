import { db } from "./lib/db";
import { testimonials } from "./lib/db/schema";
(async () => {
  await db.insert(testimonials).values({
    name: "Sonam Bajwa",
    heading: "FUCKKKK",
    review: "OHHH yeah",
    image:
      "https://propunjabtv.com/wp-content/uploads/2022/10/Sonam-Bajwa-e1666517367339-691x375.jpg",
  });
})();
