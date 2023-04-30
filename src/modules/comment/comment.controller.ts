import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { JWTAuthGuard } from '../auth/guard/jwt.guard';
import { RoleGuardAdmin } from '../auth/guard/checkrole.guard';
import { User } from '../auth/decorator/user.decorator';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @UseGuards(JWTAuthGuard, RoleGuardAdmin)
  @Post('create')
  createUser(@Body() body: any, @User() user: any) {
    const userId = user.userId;
    return this.commentService.createComment(body, userId);
  }

  @Get(':id')
  findAllById(@Param('id') id: number) {
    return this.commentService.getCommentByProduct(id);
  }
}
