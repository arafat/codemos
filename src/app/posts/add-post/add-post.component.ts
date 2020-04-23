import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Post } from 'src/app/common-components/models/post.model';
import { PostService } from 'src/app/common-components/services/post.service';
import { Router } from '@angular/router';

/*export interface Tag {
  name: string;
} */

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: string[] = [];
  tagField = '';
  postBody = '';
  isPostAvailable = false;
  isTagAvailable = false;
  postForm: FormGroup;
  isItemPosted = false;
  postContent = '';
  count = 13;

  constructor(private postService: PostService, private route: Router)  { }

  ngOnInit(): void {

    this.postForm = new FormGroup({
      postBody : new FormControl(),
      tagField : new FormControl(),
    });
    this.postForm.controls.postBody.valueChanges.subscribe(value => {
     value === '' ? this.isPostAvailable = false :  this.isPostAvailable = true;
    });
    this.postForm.controls.tagField.valueChanges.subscribe(value => {
      value === '' ? this.isTagAvailable = false :  this.isTagAvailable = true;
    });
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
    if (this.tags.length === 0) {
      this.isTagAvailable = false;
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    let value = event.value;
    if (!value.startsWith('#') && value !== '') {
      value = '#' + value;
    }
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
  }

  onPostSubmit() {
    this.postContent = '';
    if (this.postForm) {
      this.postContent = this.postForm.controls.postBody.value;
    }
    /*
     for (let tag of this.tags) {
      if (this.postContent) {
        this.postContent = this.postContent + ' ' + tag.name;
      } else {
        this.postContent = tag.name;
      }
    } */
    this.savePostData();
  }

  savePostData() {
    // set post body to be saved:
    const post: Post = {
      postId: this.count++,
      userId: this.count++,
      content: this.postContent,
      createdAt: new Date(),
      parentId: null,
      postcol: null,
      hashtags: this.tags,
      reactionCount: 0
    };
    this.postService.getPosts().push(post);
    // this.postService.savePost(post);
    this.route.navigate(['/post']);
  }
}