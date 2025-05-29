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
        title: "React Best Practices",
        content: "Always use functional components with hooks. Remember to memoize expensive calculations with useMemo and useCallback when needed. Keep components small and focused on a single responsibility.",
        category: "Development",
        author: "Dummy huh ?"
      },
      {
        title: "CSS Grid Layout",
        content: "CSS Grid is perfect for two-dimensional layouts. Use grid-template-areas for complex layouts and remember that Grid and Flexbox work great together - Grid for the overall layout, Flexbox for components.",
        category: "Design",
        author: "hehe Dummy"
      },
      {
        title: "API Design Patterns",
        content: "REST APIs should be resource-oriented. Use proper HTTP methods (GET, POST, PUT, DELETE) and status codes. Always implement proper error handling and consider rate limiting for production APIs.",
        category: "Backend",
        author: "Dummyyeh"
      },
      {
        title: "Database Optimization",
        content: "Index your frequently queried columns but don't over-index. Use EXPLAIN to understand query execution plans. Consider denormalization for read-heavy applications and always use connection pooling.",
        category: "Database",
        author: "Dummy again"
      },
      {
        title: "UI/UX Principles",
        content: "Design for accessibility first. Use consistent spacing, proper contrast ratios, and clear visual hierarchy. The best interface is the one the user doesn't have to think about. Test with real users early and often.",
        category: "Design",
        author: "who th am i"
      },
      {
        title: "Performance Monitoring",
        content: "Monitor Core Web Vitals: LCP, FID, and CLS. Use tools like Lighthouse, WebPageTest, and real user monitoring. Optimize images, minimize JavaScript bundles, and implement proper caching strategies.",
        category: "DevOps",
        author: "nah, dummy again"
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
