import { Component, Input } from "@angular/core";
import { OnInit } from "@angular/core";
import { Params, ParamMap, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { BaseResourceList } from "../shared/base.resource.list";
import { Review } from "../../models/review.model";
import { CommentService } from "../../services/comment.service";

import * as SockJS from "sockjs-client";
import { Stomp} from "@stomp/stompjs";
import { constants } from '../../constants';
import { CommentApiRequest } from '../../models/comment-api-request.model';
import { AuthenticationService } from '../../services/authentication.service';
import { Comment } from '../../models/comment.model';

@Component({
  selector: "review-comments",
  styleUrls: ["./review-comments.component.scss"],
  templateUrl: "./review-comments.component.html"
})
export class ReviewCommentsComponent extends BaseResourceList
  implements OnInit {
  @Input() reviewId: number;

  private commentText: string;

  loading: boolean = true;
  notFound: boolean = false;

  private stompClient;

  constructor(
    private activatedRoute: ActivatedRoute,
    private commentService: CommentService,
    private authenticationService: AuthenticationService
  ) {
    super(commentService);
  }

  private getByReviewId(reviewId: number): Observable<any> {
    return this.commentService.getCommentsByReviewId(reviewId);
  }

  public ngOnInit(): void {
    console.log(this.reviewId); // not null
    this.activatedRoute.paramMap.subscribe((p: ParamMap) => {
      let reviewId = this.reviewId;
      if (reviewId) {
        this.getByReviewId(reviewId).subscribe(
          (res: Comment[]) => {
            // todo - move to reviews-api-response
            this.items = res;
            this.loading = false;
            // and init socket connection
            // TODO: check if authenticated
            this.initializeWebSocketConnection(reviewId);
          },
          (error: any) => {
            // TODO handle error alerts
            console.error(error);
            this.loading = false;
            this.notFound = true;
          }
        );
      } else {
        this.loading = false;
      }
    });
  }

  initializeWebSocketConnection(reviewId):void {

    let currentUser = this.authenticationService.currentUserValue;
    if (!(currentUser && currentUser.token)) {
        return;
    }

    let ws = new SockJS(constants.BACKEND_SOCKET_URL + '?token=' + currentUser.token);
    this.stompClient = Stomp.over(ws);
    let that = this;

    //console.log(currentUser.token);
    // TODO: fix wss authentication
    this.stompClient.connect(
      {},
      function(frame) {
        // TODO: this.reviewId is null
        // so I changed it to reviewId in parameters
        that.stompClient.subscribe("/comments/arrived/" + reviewId, (message) => {
          let arrived:Comment = JSON.parse(message.body) as Comment;
          that.items.push(arrived);
        });

        // TODO: fix sub
        that.stompClient.subscribe("/comments/deleted/" + reviewId, (message) => {
          let arrived:Comment = JSON.parse(message.body) as Comment;
          console.log("remove ", arrived.id);
          // that.items.push(arrived);
        });
      }
    );
  }

  sendMessage():void {
    if (!this.commentText || this.commentText.trim().length < 2) {
      // TODO: angular error alert
      console.error("Comment text err", this.commentText);
      return;
    }
    
    const newComment = new CommentApiRequest(this.reviewId, this.commentText.trim());
    const res = {text: newComment.text, reviewId: newComment.reviewId};
    this.stompClient.send("/app/comments/add/" + this.reviewId, {}, JSON.stringify(res));

    // clear input
    this.commentText = null;
  }

  // TODO:
  removeComment(id: number):void {
    this.stompClient.send("/app/comments/remove/" + this.reviewId, {}, id);
  }
}
