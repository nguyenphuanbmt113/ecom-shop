import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Comment from 'src/entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepo: Repository<Comment>,
  ) {}

  async getCommentByProduct(productId: number) {
    const comments = await this.commentsRepo.find({
      where: {
        productId: productId,
      },
    });
    return comments;
  }

  async createComment(body: any, userId: number) {
    const { id, comment, star } = body;
    const arrayStar = [];
    for (let i = 0; i < star; i++) {
      arrayStar.push('fas fa-star text-warning');
    }

    let star1 = '';
    let star2 = '';
    let star3 = '';
    let star4 = '';
    let star5 = '';

    for (let i = 0; i < arrayStar.length; i++) {
      if (i === 0) {
        star1 = arrayStar[i];
      }
      if (i === 1) {
        star2 = arrayStar[i];
      }
      if (i === 2) {
        star3 = arrayStar[i];
      }
      if (i === 3) {
        star4 = arrayStar[i];
      }
      if (i === 4) {
        star5 = arrayStar[i];
      }
    }
    const data = {
      productId: id,
      userId: userId,
      content: comment,
      star1: star1,
      star2: star2,
      star3: star3,
      star4: star4,
      star5: star5,
    };
    const c_comment = await this.commentsRepo.create(data);
    await this.commentsRepo.save(c_comment);
    return c_comment;
  }
}
