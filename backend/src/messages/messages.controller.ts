import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('conversations')
  createConversation(@Body() createConversationDto: CreateConversationDto, @Request() req) {
    return this.messagesService.createConversation(createConversationDto, req.user.userId);
  }

  @Get('conversations')
  findMyConversations(
    @Request() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.messagesService.findUserConversations(req.user.userId, page, limit);
  }

  @Get('conversations/:id')
  findConversation(@Param('id') id: string, @Request() req) {
    return this.messagesService.findConversation(id, req.user.userId);
  }

  @Get('conversations/:id/messages')
  getConversationMessages(
    @Param('id') conversationId: string,
    @Request() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 50,
  ) {
    return this.messagesService.getConversationMessages(conversationId, req.user.userId, page, limit);
  }

  @Post('send')
  sendMessage(@Body() createMessageDto: CreateMessageDto, @Request() req) {
    return this.messagesService.sendMessage(createMessageDto, req.user.userId);
  }

  @Patch('messages/:id')
  editMessage(
    @Param('id') messageId: string,
    @Body('content') newContent: string,
    @Request() req,
  ) {
    return this.messagesService.editMessage(messageId, newContent, req.user.userId);
  }

  @Delete('messages/:id')
  deleteMessage(@Param('id') messageId: string, @Request() req) {
    return this.messagesService.deleteMessage(messageId, req.user.userId);
  }

  @Patch('conversations/:id/read')
  markAsRead(@Param('id') conversationId: string, @Request() req) {
    return this.messagesService.markMessagesAsRead(conversationId, req.user.userId);
  }

  @Patch('conversations/:id/archive')
  archiveConversation(@Param('id') conversationId: string, @Request() req) {
    return this.messagesService.archiveConversation(conversationId, req.user.userId);
  }

  @Patch('conversations/:id/unarchive')
  unarchiveConversation(@Param('id') conversationId: string, @Request() req) {
    return this.messagesService.unarchiveConversation(conversationId, req.user.userId);
  }

  @Patch('conversations/:id/mute')
  muteConversation(@Param('id') conversationId: string, @Request() req) {
    return this.messagesService.muteConversation(conversationId, req.user.userId);
  }

  @Patch('conversations/:id/unmute')
  unmuteConversation(@Param('id') conversationId: string, @Request() req) {
    return this.messagesService.unmuteConversation(conversationId, req.user.userId);
  }

  @Post('messages/:id/reactions')
  addReaction(
    @Param('id') messageId: string,
    @Body('emoji') emoji: string,
    @Request() req,
  ) {
    return this.messagesService.addReaction(messageId, emoji, req.user.userId);
  }

  @Delete('messages/:id/reactions/:emoji')
  removeReaction(
    @Param('id') messageId: string,
    @Param('emoji') emoji: string,
    @Request() req,
  ) {
    return this.messagesService.removeReaction(messageId, emoji, req.user.userId);
  }
}
