import { users, notes, type User, type InsertUser, type Note, type InsertNote } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getNotes(): Promise<Note[]>;
  createNote(note: InsertNote): Promise<Note>;
  getNoteById(id: number): Promise<Note | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private notes: Map<number, Note>;
  private currentUserId: number;
  private currentNoteId: number;

  constructor() {
    this.users = new Map();
    this.notes = new Map();
    this.currentUserId = 1;
    this.currentNoteId = 1;
    
    // Initialize with some sample notes
    this.initializeNotes();
  }

  private initializeNotes() {
    const sampleNotes: InsertNote[] = [
      {
        title: "Hercules",
        content: "People do crazy things when they're in love.",
        category: "Love",
        author: "Megara"
      },
      {
        title: "Again ?!",
        content: "Life is Just About going for What You feel. Over and over and over and over again.",
        category: "Life",
        author: "hehe dummy"
      },
      {
        title: "Give Up",
        content: "I don't ever give up.",
        category: "A Podcast",
        author: "Elon Musk"
      },
      {
        title: "Destiny",
        content: "There will be days when you'll find no one who got your back, keep going for your destiny. And That's what destiny means.",
        category: "Dream",
        author: "Dummy again"
      },
      {
        title: "I have no mouth",
        content: "And i was trapped. i alone had no body. no senses. no feelings. i was in hell, looking at heaven",
        category: "Hell",
        author: "Α.Μ."
      },
      {
        title: "na",
        content: "i love brownies",
        category: "i",
        author: "ari"
      }
    ];

    sampleNotes.forEach(note => {
      this.createNote(note);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getNotes(): Promise<Note[]> {
    return Array.from(this.notes.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async createNote(insertNote: InsertNote): Promise<Note> {
    const id = this.currentNoteId++;
    const note: Note = { 
      ...insertNote, 
      id, 
      createdAt: new Date()
    };
    this.notes.set(id, note);
    return note;
  }

  async getNoteById(id: number): Promise<Note | undefined> {
    return this.notes.get(id);
  }
}

export const storage = new MemStorage();
