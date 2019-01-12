import { Component, Input } from "@angular/core";
import { OnInit } from "@angular/core";
import { ParamMap, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { BaseResourceList } from "../shared/base.resource.list";
import { CommentService } from "../../services/comment.service";

import * as SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { constants } from '../../constants';
import { CommentApiRequest } from '../../models/comment-api-request.model';
import { AuthenticationService } from '../../services/authentication.service';
import { Comment } from '../../models/comment.model';
import { AlertService } from '../../services/alert.service';
import { User } from '../../models/user.model';

@Component({
  selector: "review-comments",
  styleUrls: ["./review-comments.component.scss"],
  templateUrl: "./review-comments.component.html"
})
export class ReviewCommentsComponent extends BaseResourceList implements OnInit {
  @Input() reviewId: number;

  private commentText: string;
  private stompClient;

  private currentUser:User;

  constructor(private activatedRoute: ActivatedRoute,
    private commentService: CommentService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {
    super();
    this.currentUser = authenticationService.currentUserValue;
  }

  private getByReviewId(reviewId: number): Observable<any> {
    return this.commentService.getCommentsByReviewId(reviewId);
  }

  public ngOnInit(): void {
    // console.log(this.reviewId); // not null
    this.activatedRoute.paramMap.subscribe((p: ParamMap) => {
      let reviewId = this.reviewId;
      if (reviewId) {
        this.getByReviewId(reviewId).subscribe(
          (res: Comment[]) => {
            // todo - move to reviews-api-response
            this.items = res;
            this.loading = false;
            // and init socket connection
            if (!this.initializeWebSocketConnection(reviewId)) {
              this.alertService.showAlert("Failed to initialize socket connection");
            }

          }, (error: any) => {
            this.loading = false;
            this.notFound = true;
            this.alertService.showAlert(error);
          });
      } else {
        this.loading = false;
      }
    });
  }

  private initializeWebSocketConnection(reviewId): boolean {

    if (!(this.currentUser && this.currentUser.token)) {
      return false;
    }

    // TODO: fix wss authentication
    let ws = new SockJS(constants.BACKEND_SOCKET_URL + '?token=' + this.currentUser.token);
    this.stompClient = Stomp.over(ws);
    let that = this;

    this.stompClient.connect(
      {},
      function (frame) {
        that.stompClient.subscribe("/comments/arrived/" + reviewId, (message) => {
          let arrived: Comment = JSON.parse(message.body) as Comment;
          that.items.push(arrived);
        });

        // TODO: fix sub
        that.stompClient.subscribe("/comments/deleted/" + reviewId, (message) => {
          let deleted: Comment = JSON.parse(message.body) as Comment;
          that.items = that.items.filter((item:Comment) => item.id !== deleted.id);
        });


        // TODO: fix errors sub
        that.stompClient.subscribe("/comments/errors", (message) => {
          that.alertService.showAlert(message);
        });
      }
    );
    return true;
  }

  private sendMessage(): void {
    if (!this.currentUser) {
      return;
    }
    if (!this.commentText || this.commentText.trim().length < 2) {
      this.alertService.showAlert("Comment text err " + this.commentText);
      return;
    }

    const newComment = new CommentApiRequest(this.reviewId, this.commentText.trim());
    const res = { text: newComment.text, reviewId: newComment.reviewId };
    this.stompClient.send("/app/comments/add/" + this.reviewId, {}, JSON.stringify(res));

    // clear input
    this.commentText = null;
  }
  
  private removeComment(comment: Comment): void {
    if (!this.currentUser || this.currentUser.username != comment.user.username) {
      return;
    }
    let res = JSON.stringify(comment as Object);
    this.stompClient.send("/app/comments/delete/" + this.reviewId, {}, res);
  }
}
