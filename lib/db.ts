import Dexie, { type EntityTable } from "dexie";
import type { LocalPhoto, Profile, QueueAction } from "./types";
class MuseumDB extends Dexie { profile!:EntityTable<Profile,"id">; syncQueue!:EntityTable<QueueAction,"id">; photos!:EntityTable<LocalPhoto,"id">; downloads!:EntityTable<{id:string; kind:string; downloadedAt:string},"id">; constructor(){super("museo-interactivo");this.version(1).stores({profile:"id,updatedAt",syncQueue:"id,synced,createdAt",photos:"id,status,createdAt",downloads:"id,kind"})} }
export const db = new MuseumDB();
