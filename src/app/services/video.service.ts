import { Video } from './../video';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private videoUrl = 'http://localhost:3000/api/videos';
  httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };


  constructor(private http: HttpClient) { }

  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(this.videoUrl);
  }

  addVideo(video: Video): Observable<Video> {
    return this.http.post<Video>(this.videoUrl, video, this.httpOptions);
  }

  updateVideo(video: Video): Observable<any> {
    const url = `${this.videoUrl}/${video._id}`;
    return this.http.put(url, video, this.httpOptions);
  }

  deleteVideo(video: Video): Observable<Video> {
    const url = `${this.videoUrl}/${video._id}`;
    return this.http.delete<Video>(url, this.httpOptions);
  }


}
