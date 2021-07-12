import { Model } from "@nozbe/watermelondb";
import {field, date, readonly} from '@nozbe/watermelondb/decorators';

export class RecycleProgress extends Model {
  static table = "items_recycled"

  @field('all_items') allItems: any 
  @field('bottles') bottles: any
  @field('plastic_items') plasticItems: any
  @field('metallic_items') metallicItems: any
  @field('paper_items') paperItems: any
  @readonly @date('created_at') createdAt: any;
}