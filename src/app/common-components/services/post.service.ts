import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

   POSTS: Post[] = [
    { postId: 11, userId: 11, content: 'This is post 1 to check how post gets displayed', createdAt: new Date(Date.parse('2015-07-08T11:22:33+0000')),
         parentId: null, postcol: '', hashtags: ['#blogger', '#frontend'], reactionCount: 10},
    { postId: 12, userId: 12, content: 'This is post 2 abc abc abc abc abc abc abc abc abc abc', createdAt: new Date(Date.parse('2019-09-08T11:22:33+0000')),
         parentId: null, postcol: '', hashtags: ['#post2', '#this'], reactionCount: 10},
  ];
  constructor() { }

  getPosts(): Post[] {
    // later fetch data from backend. Hardcoding currently
    return this.POSTS;
  }
}
