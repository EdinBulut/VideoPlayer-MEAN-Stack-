import { Video } from './../video';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss']
})
export class VideoDetailComponent implements OnInit {

  @Input() selectedVideo: Video;
  @Output() updateVideoEvent = new EventEmitter();
  @Output() deleteVideoEvent = new EventEmitter();

  editTitle = false;
  constructor() { }

  ngOnInit() {}

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges() {
    this.editTitle = false;
  }
  onTitleClick() {
    this.editTitle = true;
  }

  updateVideo() {
    this.selectedVideo.url = this.selectedVideo.url.split('/watch?v=').join('/embed/');
    this.updateVideoEvent.emit(this.selectedVideo);
  }
  deleteVideo() {
    this.deleteVideoEvent.emit(this.selectedVideo);
  }

}
