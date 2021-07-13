import { Model } from "@nozbe/watermelondb";
import {field, date, readonly} from '@nozbe/watermelondb/decorators';

export class RecycleProgress extends Model {
  static table = "items_recycled"

  @field('all_items') all_items: any 
  @field('bottles') bottles: any
  @field('plastic_items') plastic_items: any
  @field('metallic_items') metallic_items: any
  @field('paper_items') paper_items: any
  @readonly @date('created_at') created_at: any;
}

export class Friend extends Model {
  static table = "friends"

  @field('friend_id') friendId: any
}