import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Video } from '../video';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {
  @Input() videos: Video[] = [];
  @Output() emitVideo = new EventEmitter();


  constructor() { }

  ngOnInit() {}

  onSelect(video: Video) {
    this.emitVideo.emit(video);
  }

}
