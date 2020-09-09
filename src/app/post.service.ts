import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap, map, concatMap, tap } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { Post } from './interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private _URL: string = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }


  $postsWithAuthor = combineLatest([
    this.http.get<Array<Post>>(`${this._URL}/posts`),
    this.http.get<Array<any>>(`${this._URL}/users`)
  ]).pipe(
    map(([posts, users]) => {
      // map (rxjs) through posts, return the post (...p) & add the userName to the returned post
      // do this by mapping (array) through the users and find the matching id and add the name to userName
      return posts.map(
        p => ({...p, userName: users.find(u => u.id === p.userId).name} as Post)
      )
    })
  )

}
