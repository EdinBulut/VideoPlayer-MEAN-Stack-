import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.scss']
})
export class VideoCenterComponent implements OnInit {
  videos: Video[] = [];
  selectedVideo: Video;
  hidenewVideo = true;

  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.videoService.getVideos()
      .subscribe(
        data => {
          this.videos = data.sort((v1, v2) => (v1.title > v2.title ? 1 : -1));
          this.videos.forEach(v => v.url = v.url.split('/watch?v=').join('/embed/'));
        },
        err => console.log(err)
      );
  }

  onSelectVideo(vid: Video) {
    this.selectedVideo = vid;
    this.hidenewVideo = true;
  }

  newVideo() {
    this.hidenewVideo = false;
  }

  onSubmitAddVideo(value: Video) {
    console.log(value);
    this.videoService.addVideo(value)
      .subscribe(
        newVideo => {
          console.log(newVideo);
          newVideo.url = newVideo.url.split('/watch?v=').join('/embed/');
          this.videos.push(newVideo);
          this.selectedVideo = newVideo;
        },
        err => console.log(err)
      );
    this.hidenewVideo = true;
  }

  onUpdateVideoEvent(video) {
    this.videoService.updateVideo(video)
    .subscribe(updatedVideo => {
      updatedVideo.url = updatedVideo.url.split('/watch?v=').join('/embed/');
      video = updatedVideo;
    });
    this.selectedVideo = null;
  }

  onDeleteVideoEvent(vid: Video) {
    this.videoService.deleteVideo(vid).subscribe(
      deletedVideo => {
        this.videos = this.videos.filter(v => v._id !== deletedVideo._id);
      }
    );
    this.selectedVideo = null;
  }

}
