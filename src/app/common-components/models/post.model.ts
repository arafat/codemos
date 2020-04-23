export class Post {
    postId: number;
    userId: number;
    content: string;
    createdAt: Date;
    parentId: number;
    postcol: string;
    hashtags: string[];
    reactionCount: number;
}
