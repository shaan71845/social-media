import express from "express";
import validateRequest from "../middlewares/validateRequest.middleware";
import { createPostSchema } from "../schema/post.schema";
import { createPost, getPosts } from "../controller/post.controller";
import validateToken from "../middlewares/validateToken.middleware";

const router = express.Router();

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *      in: header
 */

/**
 * @swagger
 * tags:
 *  name: Posts
 *  description: The Posts managing API
 */

/**
 * @swagger
 * /posts/:
 *  post:
 *    security:
 *    - bearerAuth: []
 *    summary: Create a new Post
 *    tags: [Posts]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              imageURL:
 *                type: string
 *                description: base64 Encoded image
 *              caption:
 *                type: string
 *                description: Caption for the Post
 *    responses:
 *      200:
 *        description: OK
 *      400:
 *        description: Bad Request
 *
 *
 */
router.post("/", validateToken, validateRequest(createPostSchema), createPost);

/**
 * @swagger
 * /posts/:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Get all the posts along with their author and likes.
 *    tags: [Posts]
 *    responses:
 *      200:
 *        description: OK
 *      400:
 *        description: Bad Request
 *      401:
 *        desciption: Unauthorised
 *
 *
 */
router.get("/", validateToken, getPosts);

export default router;
